// @/modules/testimonies/components/TestimonyFormDialog.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { TestimonyForm } from "@/components/layout/forms/metier/testimonyForm";
import { ValidationError } from "@/lib/api/core/http-errors";
import { submitTestimony } from "@/lib/types/communications/testimonies/testimony.service";
import { Testimony, TestimonyRequest } from "@/lib/types/communications/testimonies/testimony.types";

interface TestimonyFormDialogProps {
  onSuccess?: (testimony: Testimony) => void;
  /** Optionnel — n'affiche le select de cours que si fourni */
  courses?: { id: string; titre: string }[];
  /** Libellé du bouton déclencheur */
  triggerLabel?: string;
}

export function TestimonyFormDialog({
  onSuccess,
  courses,
  triggerLabel = "Partager mon témoignage",
}: TestimonyFormDialogProps) {
  const [open, setOpen]                 = React.useState(false);
  const [formData, setFormData]         = React.useState<TestimonyRequest | null>(null);
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

  const handleFormChange = React.useCallback((data: TestimonyRequest, isValid: boolean) => {
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

      const result = await submitTestimony(formData);

      toast.success("Témoignage soumis avec succès.");
      onSuccess?.(result);
      setOpen(false);
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
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        {triggerLabel}
      </Button>

      <CrudDialog
        open={open}
        onOpenChange={setOpen}
        title="Partager un témoignage"
        description="Racontez comment Dieu a agi dans votre vie."
        size="lg"
        showFooter
        confirmLabel={isSubmitting ? "Envoi…" : "Soumettre"}
        cancelLabel="Annuler"
        onConfirm={handleConfirm}
        preventOutsideClose={isSubmitting}
      >
        <TestimonyForm
          onChange={handleFormChange}
          error={error}
          courses={courses}
        />
      </CrudDialog>
    </>
  );
}