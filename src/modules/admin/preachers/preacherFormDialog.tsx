// @/modules/preachers/components/PreacherFormDialog.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Preacher } from "@/types/admin/preacher/preacher.types";
import { createPreacher, updatePreacher } from "@/types/admin/preacher/preacher.service";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ValidationError } from "@/lib/api/core/http-errors";
import { z } from "zod";
import { preacherRequestSchema } from "@/modules/admin/preachers/preacher.schema";
import { PreacherForm } from "@/components/layout/forms/metier/preacherForm";

type PreacherFormValues = z.output<typeof preacherRequestSchema>;

const FORM_ID = "preacher-form";

interface PreacherFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preacher?: Preacher; // undefined = create, défini = edit
  onSuccess?: (preacher: Preacher) => void;
}

export function PreacherFormDialog({
  open,
  onOpenChange,
  preacher,
  onSuccess,
}: PreacherFormDialogProps) {
  const isEdit = !!preacher;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError]               = React.useState<string | undefined>();

  React.useEffect(() => {
    if (open) setError(undefined);
  }, [open]);

  const handleSubmit = async (data: PreacherFormValues) => {
    try {
      setIsSubmitting(true);
      setError(undefined);

      const result = isEdit
        ? await updatePreacher(preacher.id, data)
        : await createPreacher(data);

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
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer"}
      cancelLabel="Annuler"
      onConfirm={() => {
        document.getElementById(FORM_ID)?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }}
      preventOutsideClose={isSubmitting}
    >
      {error && (
        <p className="text-sm text-destructive mb-3">{error}</p>
      )}
      <PreacherForm
        formId={FORM_ID}
        defaultValues={preacher}
        onSubmit={handleSubmit}
      />
    </CrudDialog>
  );
}