// @/components/layout/forms/metier/testimonyForm.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { testimonyRequestSchema } from "@/lib/types/communications/testimonies/testimony.schema";
import { Testimony, TestimonyRequest } from "@/lib/types/communications/testimonies/testimony.types";

type TestimonyFormValues = z.output<typeof testimonyRequestSchema>;

type TestimonyFormProps = {
  defaultValues?: Testimony;
  onChange: (data: TestimonyRequest, isValid: boolean) => void;
  error?: string;
  /** Optionnel — n'affiche le select que si l'appelant veut lier le témoignage à un cours */
  courses?: { id: string; titre: string }[];
};

export function TestimonyForm({ defaultValues, onChange, error, courses }: TestimonyFormProps) {

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<TestimonyFormValues>({
    resolver: zodResolver(testimonyRequestSchema),
    mode: "onChange", // nécessaire pour que isValid reflète l'état en temps réel, sans passer par handleSubmit
    defaultValues: {
      domaine:  defaultValues?.domaine  ?? "",
      content:  defaultValues?.content  ?? "",
      courseId: defaultValues?.courseId ?? null,
    },
  });

  // Remonte chaque changement de champ au parent (pas de bouton submit interne :
  // c'est CrudDialog qui déclenche la création/mise à jour via handleConfirm).
  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as TestimonyRequest, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  const courseId = watch("courseId");

  return (
    <div className="space-y-5">

      {/* Erreur globale remontée par le dialog (ex: échec API) */}
      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Domaine */}
      <Field>
        <FieldLabel htmlFor="testimony-domaine">
          Domaine <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="testimony-domaine"
          placeholder="Ex : Guérison, Évangélisation, Vie de couple…"
          {...register("domaine")}
        />
        {errors.domaine && (
          <p className="text-sm text-destructive" role="alert">{errors.domaine.message}</p>
        )}
      </Field>

      {/* Contenu */}
      <Field>
        <FieldLabel htmlFor="testimony-content">
          Témoignage <span className="text-destructive">*</span>
        </FieldLabel>
        <Textarea
          id="testimony-content"
          placeholder="Partagez votre témoignage…"
          rows={6}
          {...register("content")}
        />
        <FieldDescription>10 caractères minimum.</FieldDescription>
        {errors.content && (
          <p className="text-sm text-destructive" role="alert">{errors.content.message}</p>
        )}
      </Field>

      {/* Cours lié — optionnel */}
      {courses && (
        <Field>
          <FieldLabel htmlFor="testimony-course">Cours lié</FieldLabel>
          <Select
            value={courseId ?? ""}
            onValueChange={(val) =>
              setValue("courseId", val || null, { shouldValidate: true })
            }
          >
            <SelectTrigger id="testimony-course">
              <SelectValue placeholder="Aucun cours (optionnel)" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.titre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.courseId && (
            <p className="text-sm text-destructive" role="alert">{errors.courseId.message}</p>
          )}
        </Field>
      )}

    </div>
  );
}