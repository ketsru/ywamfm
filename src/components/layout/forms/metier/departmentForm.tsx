// @/modules/departments/components/DepartmentForm.tsx

"use client";

import * as React from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Department, DepartmentRequest } from "@/types/admin/department/department.types";

type DepartmentFormProps = {
  defaultValues?: Department;
  onChange: (data: DepartmentRequest) => void;
  error?: string;
};

export function DepartmentForm({ defaultValues, onChange, error }: DepartmentFormProps) {
  const [name, setName]               = React.useState(defaultValues?.name        ?? "");
  const [description, setDescription] = React.useState(defaultValues?.description ?? "");
  const [image, setImage]             = React.useState(defaultValues?.image        ?? "");
  const [isActive, setIsActive]       = React.useState(defaultValues?.isActive    ?? true);

  // Remonte les données au parent à chaque changement
  React.useEffect(() => {
    onChange({
      name,
      description: description || null,
      image:       image       || null,
      isActive,
    });
  }, [name, description, image, isActive]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="dept-name">Nom <span className="text-destructive">*</span></FieldLabel>
        <Input
          id="dept-name"
          placeholder="Ex : Théologie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel htmlFor="dept-description">Description</FieldLabel>
        <Textarea
          id="dept-description"
          placeholder="Décrivez brièvement ce département…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </Field>

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="dept-image">Image</FieldLabel>
        {image && (
          <img
            src={image}
            alt="Aperçu"
            className="mb-2 h-24 w-24 rounded-lg object-cover border"
          />
        )}
        <Input
          id="dept-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        <FieldDescription>Format JPG, PNG ou WEBP. Affiché comme miniature du département.</FieldDescription>
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
            onCheckedChange={setIsActive}
          />
        </div>
      </Field>

      {/* Erreur globale */}
      {error && (
        <p className="text-sm text-destructive" role="alert">{error}</p>
      )}
    </div>
  );
}