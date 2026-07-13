// @/modules/courses/components/CourseFormDialog.tsx

"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { CourseDetail, CourseListItem, CourseRequest  } from "@/lib/types/courses/course/course.types";
import { createCourse, updateCourse } from "@/lib/types/courses/course/course.service";
import { CourseForm } from "@/components/layout/forms/metier/courseForm";

interface CourseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course?: CourseDetail;
  promotions: { id: string; name: string }[];
  plannings: { id: string; name: string; promotionId?: string }[];
  onSuccess?: (course: CourseListItem | CourseDetail) => void;
}

export function CourseFormDialog({
  open,
  onOpenChange,
  course,
  promotions,
  plannings,
  onSuccess,
}: CourseFormDialogProps) {
  const isEdit = !!course;

  const [formData, setFormData]         = React.useState<CourseRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: CourseRequest, isValid: boolean) => {
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
        ? await updateCourse(course.id, formData)
        : await createCourse(formData);

      toast.success(isEdit ? "Cours mis à jour." : "Cours créé.");
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
      title={isEdit ? "Modifier le cours" : "Nouveau cours"}
      description={isEdit
        ? "Modifiez les informations du cours."
        : "Renseignez les informations du nouveau cours."
      }
      size="lg"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <CourseForm
        defaultValues={course}
        promotions={promotions}
        plannings={plannings}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}