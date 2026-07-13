"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { ValidationError } from "@/lib/api/core/http-errors";
import { RegisterSchool } from "@/lib/types/admin/school/school.types";
import {
  PublishSchool,
  PublishSchoolRequest,
} from "@/lib/types/admin/publish-school/publish-school.types";
import { getPromotionsBySchool } from "@/lib/types/admin/promotion/promotion.service";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { PublishSchoolForm } from "@/components/layout/forms/metier/publishSchoolForm";
import { createPublishSchool } from "@/lib/types/admin/publish-school/publish-school.service";

interface PublishSchoolFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  school?: RegisterSchool;
  onSuccess?: (publication: PublishSchool) => void;
}

type FormOutput = Omit<PublishSchoolRequest, "schoolId">;

export function PublishSchoolFormDialog({
  open,
  onOpenChange,
  school,
  onSuccess,
}: PublishSchoolFormDialogProps) {
  const [formData, setFormData]         = React.useState<FormOutput | null>(null);
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

  const { data: promotions = [], isLoading: promotionsLoading } = useQuery({
    queryKey: ["admin", "promotions", "school", school?.id],
    queryFn: () => getPromotionsBySchool(school!.id, { activeOnly: true }),
    enabled: open && !!school,
  });

  const handleFormChange = React.useCallback((data: FormOutput, isValid: boolean) => {
    setFormData(data);
    setFormIsValid(isValid);
  }, []);

  const handleConfirm = async () => {
    if (!school) return;
    if (!formData || !formIsValid) {
      setError("Veuillez corriger les champs invalides avant de continuer.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(undefined);

      const payload: PublishSchoolRequest = { ...formData, schoolId: school.id };
      const result = await createPublishSchool(payload);

      toast.success(`Publication créée pour "${school.name}".`);
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
      title={school ? `Publier "${school.name}"` : "Publier l'école"}
      description="Créez une publication pour cette école à partir d'une promotion existante."
      size="lg"
      showFooter
      confirmLabel={isSubmitting ? "Publication…" : "Publier"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <PublishSchoolForm
        promotions={promotions.map((p) => ({
          id: p.id,
          name: p.name,
          speciality: p.speciality,
        }))}
        promotionsLoading={promotionsLoading}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}