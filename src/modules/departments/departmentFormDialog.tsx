// @/modules/departments/components/DepartmentFormDialog.tsx

"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Department, DepartmentRequest } from "@/lib/types/admin/department/department.types";
import { createDepartment, updateDepartment } from "@/lib/types/admin/department/department.service";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { DepartmentForm } from "@/components/layout/forms/metier/departmentForm";
import { ValidationError } from "@/lib/api/core/http-errors";

interface DepartmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: Department;
  onSuccess?: (department: Department) => void;
}

export function DepartmentFormDialog({
  open,
  onOpenChange,
  department,
  onSuccess,
}: DepartmentFormDialogProps) {
  const isEdit = !!department;

  const [formData, setFormData]         = React.useState<DepartmentRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: DepartmentRequest, isValid: boolean) => {
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
        ? await updateDepartment(department.id, formData)
        : await createDepartment(formData);

      toast.success(isEdit ? "Département mis à jour." : "Département créé.");
      onSuccess?.(result as Department);
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
      title={isEdit ? "Modifier le département" : "Nouveau département"}
      description={isEdit
        ? "Modifiez les informations du département."
        : "Renseignez les informations du nouveau département."
      }
      size="md"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Enregistrer département"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <DepartmentForm
        defaultValues={department}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}