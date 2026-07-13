// @/modules/themes/components/ThemeFormDialog.tsx

"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { ThemeResponseDto, ThemeRequest } from "@/lib/types/admin/theme/theme.types";
import { createTheme, updateTheme } from "@/lib/types/admin/theme/theme.service";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { ThemeForm } from "@/components/layout/forms/metier/themeForm";

interface ThemeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme?: ThemeResponseDto;
  onSuccess?: (theme: ThemeResponseDto) => void;
}

export function ThemeFormDialog({
  open,
  onOpenChange,
  theme,
  onSuccess,
}: ThemeFormDialogProps) {
  const isEdit = !!theme;

  const [formData, setFormData]         = React.useState<ThemeRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: ThemeRequest, isValid: boolean) => {
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
        ? await updateTheme(theme.id, formData)
        : await createTheme(formData);

      toast.success(isEdit ? "Thème mis à jour." : "Thème créé.");
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
      title={isEdit ? "Modifier le thème" : "Nouveau thème"}
      description={isEdit
        ? "Modifiez les informations du thème."
        : "Renseignez les informations du nouveau thème."
      }
      size="md"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Enregistrer thème"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <ThemeForm
        defaultValues={theme}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}