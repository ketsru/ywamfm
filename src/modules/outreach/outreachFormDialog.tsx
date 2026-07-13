// @/modules/outreaches/components/RegisterOutreachFormDialog.tsx

"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { RegisterOutreach, RegisterOutreachRequest } from "@/lib/types/admin/outreach/outreach.types";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { createOutreach, updateOutreach } from "@/lib/types/admin/outreach/outreach.service";
import { RegisterOutreachForm } from "@/components/layout/forms/metier/registerOutreachForm";

interface RegisterOutreachFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outreach?: RegisterOutreach;
  departments: { id: string; name: string }[];
  onSuccess?: (outreach: RegisterOutreach) => void;
}

export function RegisterOutreachFormDialog({
  open,
  onOpenChange,
  outreach,
  departments,
  onSuccess,
}: RegisterOutreachFormDialogProps) {
  const isEdit = !!outreach;

  const [formData, setFormData]         = React.useState<RegisterOutreachRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: RegisterOutreachRequest, isValid: boolean) => {
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

      const result = isEdit
        ? await updateOutreach(outreach.id, formData)
        : await createOutreach(formData);

      toast.success(isEdit ? "Outreach mis à jour." : "Outreach créé.");
      onSuccess?.(result);
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
      title={isEdit ? "Modifier l'outreach" : "Nouvel outreach"}
      description={isEdit
        ? "Modifiez les informations de l'outreach."
        : "Renseignez les informations du nouvel outreach."
      }
      size="md"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <RegisterOutreachForm
        defaultValues={outreach}
        departments={departments}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}