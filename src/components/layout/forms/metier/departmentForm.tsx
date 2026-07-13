// @/components/layout/forms/metier/departmentForm.tsx

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { departmentRequestSchema } from "@/modules/departments/department.schema";
import { Department, DepartmentRequest } from "@/lib/types/admin/department/department.types";
import { ImageUploader } from "@/modules/shared/imageUploader";

type DepartmentFormValues = z.output<typeof departmentRequestSchema>;

type DepartmentFormProps = {
  defaultValues?: Department;
  onChange: (data: DepartmentRequest, isValid: boolean) => void;
  error?: string;
};

export function DepartmentForm({ defaultValues, onChange, error }: DepartmentFormProps) {

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentRequestSchema),
    mode: "onChange", // nécessaire pour que isValid reflète l'état en temps réel, sans passer par handleSubmit
    defaultValues: {
      name:        defaultValues?.name        ?? "",
      description: defaultValues?.description ?? "",
      image:       defaultValues?.image        ?? null,
      isActive:    defaultValues?.isActive    ?? true,
    },
  });

  // Remonte chaque changement de champ au parent (pas de bouton submit interne :
  // c'est CrudDialog qui déclenche la création/mise à jour via handleConfirm).
  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as DepartmentRequest, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  const isActive   = watch("isActive");
  const imageValue = watch("image");

  const currentFile = imageValue instanceof File ? imageValue : undefined;
  const existingUrl = typeof imageValue === "string" ? imageValue : undefined;

  return (
    <div className="space-y-5">

      {/* Erreur globale remontée par le dialog (ex: échec API) */}
      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="dept-name">
          Nom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="dept-name"
          placeholder="Ex : Théologie"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>
        )}
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel htmlFor="dept-description">Description</FieldLabel>
        <Textarea
          id="dept-description"
          placeholder="Décrivez brièvement ce département…"
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive" role="alert">{errors.description.message}</p>
        )}
      </Field>

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="dept-image">Image</FieldLabel>
        <ImageUploader
          value={currentFile}
          existingUrls={existingUrl}
          onChange={(file) => setValue("image", (file as File) ?? null, { shouldValidate: true })}
          multiple={false}
        />
        <FieldDescription>Format JPG, PNG ou WEBP · Max 5 Mo</FieldDescription>
        {errors.image && (
          <p className="text-sm text-destructive" role="alert">{errors.image.message as string}</p>
        )}
      </Field>

      {/* Actif */}
      <Field>
        <div className="flex items-center justify-between rounded-lg border px-4 py-3">
          <div className="space-y-0.5">
            <FieldLabel htmlFor="dept-active">Actif</FieldLabel>
            <FieldDescription>Le département sera visible sur la plateforme.</FieldDescription>
          </div>
          <Switch
            id="dept-active"
            checked={isActive}
            onCheckedChange={(val) => setValue("isActive", val, { shouldValidate: true })}
          />
        </div>
      </Field>

    </div>
  );
}