// @/modules/rapports/components/rapportGradeDialog.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RapportResponseDto } from "@/lib/types/courses/rapport/rapport.types";
import { useGradeRapport } from "@/lib/types/courses/rapport/rapport.hooks";

const gradeSchema = z.object({
  grade:    z.number({ error: "La note est requise" }).min(0).max(20),
  feedback: z.string().max(1000).optional(),
});

type GradeFormValues = z.infer<typeof gradeSchema>;

interface RapportGradeDialogProps {
  open:           boolean;
  onOpenChange:   (open: boolean) => void;
  rapport?:       RapportResponseDto;
  onSuccess?:     () => void;
}

export function RapportGradeDialog({
  open,
  onOpenChange,
  rapport,
  onSuccess,
}: RapportGradeDialogProps) {
  const { mutateAsync: grade, isPending } = useGradeRapport(() => {
    onSuccess?.();
    onOpenChange(false);
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<GradeFormValues>({
    resolver: zodResolver(gradeSchema),
    mode: "onChange",
    defaultValues: { grade: undefined, feedback: "" },
  });

  React.useEffect(() => {
    if (open) reset({ grade: undefined, feedback: "" });
  }, [open, reset]);

  const onConfirm = handleSubmit(async (values) => {
    if (!rapport) return;
    await grade({ id: rapport.id, data: values });
  });

  return (
    <CrudDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Noter le rapport"
      description={rapport ? `Rapport de ${rapport.studentFullName} — "${rapport.nomLivre}"` : ""}
      size="sm"
      showFooter
      confirmLabel={isPending ? "Enregistrement…" : "Valider la note"}
      cancelLabel="Annuler"
      onConfirm={onConfirm}
      preventOutsideClose={isPending}
    >
      <div className="space-y-5">
        <Field>
          <FieldLabel htmlFor="grade-note">
            Note <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="grade-note"
            type="number"
            min={0}
            max={20}
            step={0.5}
            placeholder="Ex : 14.5"
            {...register("grade", { valueAsNumber: true })}
          />
          <FieldDescription>Entre 0 et 20</FieldDescription>
          {errors.grade && (
            <p className="text-sm text-destructive" role="alert">{errors.grade.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="grade-feedback">Commentaire</FieldLabel>
          <Textarea
            id="grade-feedback"
            placeholder="Feedback optionnel pour l'étudiant…"
            rows={4}
            {...register("feedback")}
          />
          {errors.feedback && (
            <p className="text-sm text-destructive" role="alert">{errors.feedback.message}</p>
          )}
        </Field>
      </div>
    </CrudDialog>
  );
}