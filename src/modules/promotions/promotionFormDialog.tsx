// @/modules/promotions/components/PromotionFormDialog.tsx

"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Promotion, PromotionRequest } from "@/lib/types/admin/promotion/promotion.types";
import { createPromotion, updatePromotion } from "@/lib/types/admin/promotion/promotion.service";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { PromotionForm } from "@/components/layout/forms/metier/promotionForm";

interface PromotionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion?: Promotion;
  schools: { id: string; name: string }[];
  onSuccess?: (promotion: Promotion) => void;
}

export function PromotionFormDialog({
  open,
  onOpenChange,
  promotion,
  schools,
  onSuccess,
}: PromotionFormDialogProps) {
  const isEdit = !!promotion;

  const [formData, setFormData]         = React.useState<PromotionRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: PromotionRequest, isValid: boolean) => {
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
        ? await updatePromotion(promotion.id, formData)
        : await createPromotion(formData);

      toast.success(isEdit ? "Promotion mise à jour." : "Promotion créée.");
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
      title={isEdit ? "Modifier la promotion" : "Nouvelle promotion"}
      description={isEdit
        ? "Modifiez les informations de la promotion."
        : "Renseignez les informations de la nouvelle promotion."
      }
      size="md"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <PromotionForm
        defaultValues={promotion}
        schools={schools}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}