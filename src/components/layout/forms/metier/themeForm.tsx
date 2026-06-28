// @/modules/themes/components/ThemeForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { themeRequestSchema } from "@/modules/admin/themes/theme.schema";
import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";

type ThemeFormValues = z.output<typeof themeRequestSchema>;

type ThemeFormProps = {
  formId: string;
  defaultValues?: ThemeResponseDto;
  onSubmit: (data: ThemeFormValues) => void;
};

export function ThemeForm({ formId, defaultValues, onSubmit }: ThemeFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThemeFormValues>({
    resolver: zodResolver(themeRequestSchema),
    defaultValues: {
      name:        defaultValues?.name        ?? "",
      description: defaultValues?.description ?? "",
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="theme-name">
          Nom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="theme-name"
          placeholder="Ex : Évangélisation"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>
        )}
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel htmlFor="theme-description">Description</FieldLabel>
        <Textarea
          id="theme-description"
          placeholder="Décrivez brièvement ce thème…"
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive" role="alert">{errors.description.message}</p>
        )}
      </Field>

    </form>
  );
}