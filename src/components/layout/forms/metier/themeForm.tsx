// @/modules/themes/components/ThemeForm.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { themeRequestSchema } from "@/modules/themes/theme.schema";
import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";

type ThemeFormValues = z.output<typeof themeRequestSchema>;

type ThemeFormProps = {
  defaultValues?: ThemeResponseDto;
  onChange: (data: ThemeFormValues, isValid: boolean) => void;
  error?: string;
};

export function ThemeForm({ defaultValues, onChange, error }: ThemeFormProps) {

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<ThemeFormValues>({
    resolver: zodResolver(themeRequestSchema),
    mode: "onChange",
    defaultValues: {
      name:        defaultValues?.name        ?? "",
      description: defaultValues?.description ?? "",
    },
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as ThemeFormValues, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  return (
    <div className="space-y-5">

      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

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

    </div>
  );
}