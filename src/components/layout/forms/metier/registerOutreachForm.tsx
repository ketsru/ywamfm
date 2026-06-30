// @/modules/outreaches/components/RegisterOutreachForm.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  registerOutreachRequestSchema,
  imageFileSchema,
} from "@/modules/outreach/outreach.schema";
import {
  RegisterOutreach,
  OutreachCategory,
  OutreachStatus,
  OUTREACH_CATEGORY_LABELS,
  OUTREACH_STATUS_LABELS,
} from "@/lib/types/admin/outreach/outreach.types";

type RegisterOutreachFormValues = z.output<typeof registerOutreachRequestSchema>;

type RegisterOutreachFormProps = {
  formId: string;
  defaultValues?: RegisterOutreach;
  departments: { id: string; name: string }[];
  onSubmit: (data: RegisterOutreachFormValues) => void;
};

export function RegisterOutreachForm({
  formId,
  defaultValues,
  departments,
  onSubmit,
}: RegisterOutreachFormProps) {

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterOutreachFormValues>({
    resolver: zodResolver(registerOutreachRequestSchema),
    defaultValues: {
      departmentId: defaultValues?.departmentId ?? "",
      category:     defaultValues?.category     ?? OutreachCategory.ECOLE,
      image:        defaultValues?.image        ?? "",
      status:       defaultValues?.status       ?? OutreachStatus.EN_ATTENTE,
    },
  });

  const imageValue = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = imageFileSchema.safeParse(file);
    if (!result.success) {
      setValue("image", "", { shouldValidate: true });
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Retire le préfixe data-URI — n'envoie que le base64 brut
      const base64 = (reader.result as string).split(",")[1];
      setValue("image", base64, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* Département */}
      <Field>
        <FieldLabel htmlFor="outreach-department">
          Département <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.departmentId ?? ""}
          onValueChange={(val) => setValue("departmentId", val, { shouldValidate: true })}
        >
          <SelectTrigger id="outreach-department">
            <SelectValue placeholder="Sélectionner un département" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.departmentId && (
          <p className="text-sm text-destructive" role="alert">{errors.departmentId.message}</p>
        )}
      </Field>

      {/* Catégorie */}
      <Field>
        <FieldLabel htmlFor="outreach-category">
          Catégorie <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.category ?? OutreachCategory.ECOLE}
          onValueChange={(val) => setValue("category", val as OutreachCategory, { shouldValidate: true })}
        >
          <SelectTrigger id="outreach-category">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(OutreachCategory).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {OUTREACH_CATEGORY_LABELS[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive" role="alert">{errors.category.message}</p>
        )}
      </Field>

      {/* Statut */}
      <Field>
        <FieldLabel htmlFor="outreach-status">
          Statut <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.status ?? OutreachStatus.EN_ATTENTE}
          onValueChange={(val) => setValue("status", val as OutreachStatus, { shouldValidate: true })}
        >
          <SelectTrigger id="outreach-status">
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(OutreachStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {OUTREACH_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-destructive" role="alert">{errors.status.message}</p>
        )}
      </Field>

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="outreach-image">
          Image <span className="text-destructive">*</span>
        </FieldLabel>
        {imageValue && (
          <img
            src={`data:image/jpeg;base64,${imageValue}`}
            alt="Aperçu"
            className="mb-2 h-24 w-24 rounded-lg object-cover border"
          />
        )}
        <Input
          id="outreach-image"
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

    </form>
  );
}