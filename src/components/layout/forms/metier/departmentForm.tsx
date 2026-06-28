// @/modules/departments/components/DepartmentForm.tsx

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  departmentRequestSchema,
  DepartmentRequestSchema,
  imageFileSchema,
} from "@/modules/admin/departments/department.schema";
import { Department } from "@/lib/types/admin/department/department.types";

type DepartmentFormProps = {
  formId: string;                                      // pour lier un <button type="submit" form={formId}> externe
  defaultValues?: Department;
  onSubmit: (data: DepartmentRequestSchema) => void;
};

export function DepartmentForm({ formId, defaultValues, onSubmit }: DepartmentFormProps) {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DepartmentRequestSchema>({
    resolver: zodResolver(departmentRequestSchema),
    defaultValues: {
      name:        defaultValues?.name        ?? "",
      description: defaultValues?.description ?? "",
      image:       defaultValues?.image       ?? null,
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
      // On reporte l'erreur via setValue + erreur manuelle
      setValue("image", null, { shouldValidate: true });
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setValue("image", reader.result as string, { shouldValidate: true });
    reader.readAsDataURL(file);
  };

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
        {imageValue && (
          <img
            src={imageValue}
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