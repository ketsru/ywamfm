// @/modules/users/userFormDialog.tsx
"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { ValidationError } from "@/lib/api/core/http-errors";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { UserForm } from "@/components/layout/forms/access/userForm";
import { User, UserRequestDto } from "@/lib/types/users/user/user.types";
import { RoleService } from "@/lib/types/access/role/role.service";
import { RoleKey } from "@/lib/types/access/role/role.types";
import { UserService } from "@/lib/types/users/user/user.service";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSuccess?: () => void;
}

export function UserFormDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserFormDialogProps) {
  const isEdit = !!user;

  const [formData, setFormData]         = React.useState<UserRequestDto | null>(null);
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

  const { data: rolesPage } = useQuery({
    queryKey: ["access", "roles", "all"],
    queryFn: () => RoleService.getAll({ page: 0, size: 100 }),
    enabled: open,
  });

  const roles = rolesPage?.content ?? [];

  const handleFormChange = React.useCallback((data: UserRequestDto, isValid: boolean) => {
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
        // 1) Détails (sans le rôle)
        await UserService.updateManagedAccount(user.id, {
          firstName: formData.firstName,
          lastName:  formData.lastName,
          email:     formData.email,
        });

        // 2) Rôle — même valeur (roleKey) des deux côtés, plus de conversion nécessaire
        if (formData.roleKey !== user.roleKey) {
          await UserService.updateRole(user.id, formData.roleKey as RoleKey);
        }
      } else {
        await UserService.createManagedAccount(formData);
      }

      toast.success(isEdit ? "Utilisateur mis à jour." : "Compte créé. Un email a été envoyé.");
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
      title={isEdit ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
      description={isEdit
        ? "Modifiez les informations de l'utilisateur."
        : "Créez un nouveau compte utilisateur."
      }
      size="lg"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer l'utilisateur"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <UserForm
        defaultValues={user}
        roles={roles}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}