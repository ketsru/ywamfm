// @/modules/preachers/components/PreacherFormDialog.tsx

"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Preacher, PreacherRequest } from "@/lib/types/admin/preacher/preacher.types";
import { createPreacher, updatePreacher } from "@/lib/types/admin/preacher/preacher.service";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { PreacherForm } from "@/components/layout/forms/metier/preacherForm";

interface PreacherFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preacher?: Preacher;
  onSuccess?: (preacher: Preacher) => void;
}

export function PreacherFormDialog({
  open,
  onOpenChange,
  preacher,
  onSuccess,
}: PreacherFormDialogProps) {
  const isEdit = !!preacher;

  const [formData, setFormData]         = React.useState<PreacherRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: PreacherRequest, isValid: boolean) => {
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
        ? await updatePreacher(preacher.id, formData)
        : await createPreacher(formData);

      toast.success(isEdit ? "Prédicateur mis à jour." : "Prédicateur créé.");
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
      title={isEdit ? "Modifier le prédicateur" : "Nouveau prédicateur"}
      description={isEdit
        ? "Modifiez les informations du prédicateur."
        : "Renseignez les informations du nouveau prédicateur."
      }
      size="md"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Enregistrer orateur"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <PreacherForm
        defaultValues={preacher}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}