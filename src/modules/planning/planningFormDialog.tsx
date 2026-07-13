// @/modules/plannings/components/planningFormDialog.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { PlanningForm } from "@/components/layout/forms/metier/planningForm";
import { updatePlanning, createPlanning } from "@/lib/types/courses/plannings/planning.service";
import { Planning, PlanningRequest } from "@/lib/types/courses/plannings/planning.types";

interface PlanningFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planning?: Planning;
  promotions: { id: string; name: string }[];
  themes: { id: string; name: string }[];
  preachers: { id: string; fullName: string }[];
  books: { id: string; title: string }[];
  onSuccess?: (planning: Planning) => void;
}

export function PlanningFormDialog({
  open,
  onOpenChange,
  planning,
  promotions,
  themes,
  preachers,
  books,
  onSuccess,
}: PlanningFormDialogProps) {
  const isEdit = !!planning;

  const [formData, setFormData]         = React.useState<PlanningRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: PlanningRequest, isValid: boolean) => {
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
        ? await updatePlanning(planning.id, formData)
        : await createPlanning(formData);

      toast.success(isEdit ? "Planning mis à jour." : "Planning créé.");
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
      title={isEdit ? "Modifier le planning" : "Nouveau planning"}
      description={isEdit
        ? "Modifiez les informations du planning."
        : "Renseignez les informations du nouveau planning."
      }
      size="lg"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <PlanningForm
        defaultValues={planning}
        promotions={promotions}
        themes={themes}
        preachers={preachers}
        books={books}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}
