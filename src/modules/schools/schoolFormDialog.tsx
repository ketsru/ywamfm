// @/modules/schools/components/RegisterSchoolFormDialog.tsx

"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { RegisterSchool, RegisterSchoolRequest } from "@/lib/types/admin/school/school.types";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { RegisterSchoolForm } from "@/components/layout/forms/metier/registerSchoolForm";
import { updateSchool, createSchool } from "@/lib/types/admin/school/school.service";

interface RegisterSchoolFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  school?: RegisterSchool;
  departments: { id: string; name: string }[];
  onSuccess?: (school: RegisterSchool) => void;
}

export function RegisterSchoolFormDialog({
  open,
  onOpenChange,
  school,
  departments,
  onSuccess,
}: RegisterSchoolFormDialogProps) {
  const isEdit = !!school;

  const [formData, setFormData]         = React.useState<RegisterSchoolRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: RegisterSchoolRequest, isValid: boolean) => {
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
        ? await updateSchool(school.id, formData)
        : await createSchool(formData);

      toast.success(isEdit ? "École mise à jour." : "École créée.");
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
      title={isEdit ? "Modifier l'école" : "Nouvelle école"}
      description={isEdit
        ? "Modifiez les informations de l'école."
        : "Renseignez les informations de la nouvelle école."
      }
      size="lg"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <RegisterSchoolForm
        defaultValues={school}
        departments={departments}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}