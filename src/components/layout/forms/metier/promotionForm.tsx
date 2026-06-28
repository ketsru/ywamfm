// @/modules/promotions/components/PromotionForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { promotionRequestSchema } from "@/modules/admin/promotions/promotion.schema";
import { Promotion } from "@/lib/types/admin/promotion/promotion.types";

type PromotionFormValues = z.output<typeof promotionRequestSchema>;

type PromotionFormProps = {
  formId: string;
  defaultValues?: Promotion;
  schools: { id: string; name: string }[];
  onSubmit: (data: PromotionFormValues) => void;
};

export function PromotionForm({
  formId,
  defaultValues,
  schools,
  onSubmit,
}: PromotionFormProps) {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionRequestSchema),
    defaultValues: {
      schoolId:    defaultValues?.schoolId    ?? "",
      name:        defaultValues?.name        ?? "",
      speciality:  defaultValues?.speciality  ?? "",
      description: defaultValues?.description ?? "",
      isActive:    defaultValues?.isActive    ?? true,
    },
  });

  const isActive = watch("isActive");

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* École */}
      <Field>
        <FieldLabel htmlFor="promotion-school">
          École <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.schoolId ?? ""}
          onValueChange={(val) => setValue("schoolId", val, { shouldValidate: true })}
        >
          <SelectTrigger id="promotion-school">
            <SelectValue placeholder="Sélectionner une école" />
          </SelectTrigger>
          <SelectContent>
            {schools.map((school) => (
              <SelectItem key={school.id} value={school.id}>
                {school.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.schoolId && (
          <p className="text-sm text-destructive" role="alert">{errors.schoolId.message}</p>
        )}
      </Field>

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="promotion-name">
          Nom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="promotion-name"
          placeholder="Ex : Promotion 2025"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>
        )}
      </Field>

      {/* Spécialité */}
      <Field>
        <FieldLabel htmlFor="promotion-speciality">
          Spécialité <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="promotion-speciality"
          placeholder="Ex : Théologie appliquée"
          {...register("speciality")}
        />
        {errors.speciality && (
          <p className="text-sm text-destructive" role="alert">{errors.speciality.message}</p>
        )}
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel htmlFor="promotion-description">Description</FieldLabel>
        <Textarea
          id="promotion-description"
          placeholder="Décrivez brièvement cette promotion…"
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive" role="alert">{errors.description.message}</p>
        )}
      </Field>

      {/* Actif */}
      <Field>
        <div className="flex items-center justify-between rounded-lg border px-4 py-3">
          <div className="space-y-0.5">
            <FieldLabel htmlFor="promotion-active">Active</FieldLabel>
            <FieldDescription>La promotion sera visible sur la plateforme.</FieldDescription>
          </div>
          <Switch
            id="promotion-active"
            checked={isActive}
            onCheckedChange={(val) => setValue("isActive", val, { shouldValidate: true })}
          />
        </div>
      </Field>

    </form>
  );
}