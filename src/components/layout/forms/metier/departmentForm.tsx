// @/modules/departments/components/DepartmentForm.tsx

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { departmentRequestSchema } from "@/modules/admin/departments/department.schema";
import { Department } from "@/lib/types/admin/department/department.types";
import { imageFileSchema } from "@/lib/config/common.schema";

type DepartmentFormValues = z.output<typeof departmentRequestSchema>;

type DepartmentFormProps = {
  formId: string;                                      // pour lier un <button type="submit" form={formId}> externe
  defaultValues?: Department;
  onSubmit: (data: DepartmentFormValues) => void;
};

export function DepartmentForm({ formId, defaultValues, onSubmit }: DepartmentFormProps) {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentRequestSchema),
    defaultValues: {
      name:        defaultValues?.name        ?? "",
      description: defaultValues?.description ?? "",
      image:       defaultValues?.image        ?? null,
      isActive:    defaultValues?.isActive    ?? true,
    },
  });

  const isActive   = watch("isActive");
  const imageValue = watch("image");

  // ── Gestion de l'upload image ────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = imageFileSchema.safeParse(file);
    if (!result.success) {
      setValue("image", null, { shouldValidate: true });
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Retire le préfixe data-URI — n'envoie que le base64 brut au backend
      const base64 = (reader.result as string).split(",")[1];
      setValue("image", base64, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  // Détermine si imageValue est déjà un data-URI complet (aperçu direct), du base64 brut ou un File
  const previewSrc = imageValue
    ? typeof imageValue === "string"
      ? imageValue.startsWith("data:")
        ? imageValue
        : `data:image/jpeg;base64,${imageValue}`
      : imageValue instanceof File
        ? URL.createObjectURL(imageValue)
        : null
    : null;

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

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
        {previewSrc && (
          <img
            src={previewSrc}
            alt="Aperçu"
            className="mb-2 h-24 w-24 rounded-lg object-cover border"
          />
        )}
        <Input
          id="dept-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        <FieldDescription>Format JPG, PNG ou WEBP · Max 5 Mo</FieldDescription>
        {errors.image && (
          <p className="text-sm text-destructive" role="alert">{errors.image.message}</p>
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

    </form>
  );
}