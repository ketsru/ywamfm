"use client";

import * as React from "react";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { useSubmitRapport, useUpdateMyRapport } from "@/lib/types/courses/rapport/rapport.hooks";
import { RapportResponseDto, RapportRequest } from "@/lib/types/courses/rapport/rapport.types";
import { RapportForm } from "@/components/layout/forms/metier/rapportForm";

interface RapportFormDialogProps {
  open:          boolean;
  onOpenChange:  (open: boolean) => void;
  rapport?:      RapportResponseDto;
  schools:       { id: string; name: string }[];
  students?:     { id: string; fullName: string }[];
  onSuccess?:    () => void;
}

export function RapportFormDialog({
  open,
  onOpenChange,
  rapport,
  schools,
  students,
  onSuccess,
}: RapportFormDialogProps) {
  const isEdit = !!rapport;

  const [formData, setFormData]       = React.useState<RapportRequest | null>(null);
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [error, setError]             = React.useState<string | undefined>();

  const { mutateAsync: submit, isPending: isSubmitting } = useSubmitRapport(() => {
    onSuccess?.();
    onOpenChange(false);
  });

  const { mutateAsync: update, isPending: isUpdating } = useUpdateMyRapport(() => {
    onSuccess?.();
    onOpenChange(false);
  });

  const pending = isSubmitting || isUpdating;

  React.useEffect(() => {
    if (open) {
      setFormData(null);
      setFormIsValid(false);
      setError(undefined);
    }
  }, [open]);

  const handleFormChange = React.useCallback((data: RapportRequest, isValid: boolean) => {
    setFormData(data);
    setFormIsValid(isValid);
  }, []);

  const handleConfirm = async () => {
    if (!formData || !formIsValid) {
      setError("Veuillez corriger les champs invalides avant de continuer.");
      return;
    }

    try {
      setError(undefined);
      if (isEdit) {
        await update({ id: rapport.id, data: formData });
      } else {
        await submit(formData);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.errors[0]?.error ?? "Erreur de validation.");
      }
    }
  };

  return (
    <CrudDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Modifier le rapport" : "Nouveau rapport"}
      description={isEdit ? "Modifiez les informations du rapport." : "Renseignez les informations du nouveau rapport."}
      size="lg"
      showFooter
      confirmLabel={pending ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={pending}
    >
      <RapportForm
        defaultValues={rapport ? {
          nomLivre:       rapport.nomLivre,
          auteur:         rapport.auteur,
          contenuRapport: "",         // non exposé dans RapportResponseDto — chargé via detail si besoin
          schoolId:       rapport.schoolId,
          studentId:      rapport.studentId ?? null,
        } : undefined}
        schools={schools}
        students={students}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}