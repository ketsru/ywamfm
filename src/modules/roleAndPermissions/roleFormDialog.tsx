// createCategoryDialog.tsx (roleFormDialog.tsx)
"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { ValidationError } from "@/lib/api/core/http-errors";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { RoleForm } from "@/components/layout/forms/access/roleForm";
import { Role, RoleRequestDto } from "@/lib/types/access/role/role.types";
import { RoleService } from "@/lib/types/access/role/role.service";

interface RoleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: Role;
  onSuccess?: () => void;
}

export function RoleFormDialog({
  open,
  onOpenChange,
  role,
  onSuccess,
}: RoleFormDialogProps) {
  const isEdit = !!role;

  const [formData, setFormData]         = React.useState<RoleRequestDto | null>(null);
  const [formIsValid, setFormIsValid]   = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError]               = React.useState<string | undefined>();

  React.useEffect(() => {
    if (open) {
      setFormData(null);
      setFormIsValid(false);
      setError(undefined);
    }
  }, [open]);

  const handleFormChange = React.useCallback((data: RoleRequestDto, isValid: boolean) => {
    setFormData(data);
    setFormIsValid(isValid);
  }, []);

  const handleConfirm = async () => {
    if (!formData || !formIsValid) {
      setError("Veuillez corriger les champs invalides avant de continuer.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(undefined);

      if (isEdit) {
        // 1) Détails (nom + description) — seul endpoint qui accepte ces champs
        await RoleService.update(role.id, {
          name: formData.name,
          description: formData.description,
        });

        // 2) Permissions — remplacées en un seul appel si elles ont changé
        const currentPermissions = role.permissions ?? [];
        const nextPermissions    = formData.permissions ?? [];
        const permissionsChanged =
          currentPermissions.length !== nextPermissions.length ||
          !currentPermissions.every((p) => nextPermissions.includes(p));

        if (permissionsChanged) {
          await RoleService.replacePermissions(role.id, { permissions: nextPermissions });
        }

        // 3) Statut actif — endpoints dédiés, pas un simple champ à envoyer
        if (!!formData.active !== role.active) {
          formData.active
            ? await RoleService.activate(role.id)
            : await RoleService.deactivate(role.id);
        }
      } else {
        await RoleService.create(formData);
      }

      toast.success(isEdit ? "Rôle mis à jour." : "Rôle créé.");
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.errors[0]?.error ?? "Erreur de validation.");
      } else {
        handleApiError(err, { fallbackMessage: "Une erreur est survenue." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CrudDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Modifier le rôle" : "Ajouter un rôle"}
      description={isEdit
        ? "Modifiez les informations et permissions du rôle."
        : "Créez un nouveau rôle dans le système."
      }
      size="lg"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer le rôle"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <RoleForm
        defaultValues={role}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}