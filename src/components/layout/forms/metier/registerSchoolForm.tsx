// @/modules/schools/components/RegisterSchoolForm.tsx
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
import { registerSchoolRequestSchema } from "@/modules/schools/school.schema";
import {
  RegisterSchool,
  RegisterSchoolRequest,
  SchoolType,
  SchoolCategory,
  SchoolStatus,
  SCHOOL_TYPE_LABELS,
  SCHOOL_CATEGORY_LABELS,
  SCHOOL_STATUS_LABELS,
} from "@/lib/types/admin/school/school.types";
import { ImageUploader } from "@/modules/shared/imageUploader";

type RegisterSchoolFormValues = z.output<typeof registerSchoolRequestSchema>;

type RegisterSchoolFormProps = {
  defaultValues?: RegisterSchool;
  departments: { id: string; name: string }[];
  onChange: (data: RegisterSchoolRequest, isValid: boolean) => void;
  error?: string;
};

export function RegisterSchoolForm({
  defaultValues,
  departments,
  onChange,
  error,
}: RegisterSchoolFormProps) {

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterSchoolFormValues>({
    resolver: zodResolver(registerSchoolRequestSchema),
    mode: "onChange",
    defaultValues: {
      departmentId: defaultValues?.departmentId ?? "",
      name:         defaultValues?.name         ?? "",
      type:         defaultValues?.type         ?? SchoolType.EN_PRESENTIELLE,
      category:     defaultValues?.category     ?? SchoolCategory.GRATUITE,
      image:        defaultValues?.image        ?? null,
      price:        defaultValues?.price        ?? null,
      status:       defaultValues?.status       ?? SchoolStatus.EN_ATTENTE,
      duration:     defaultValues?.duration     ?? undefined,
    },
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as RegisterSchoolRequest, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  const category   = watch("category");
  const imageValue = watch("image");

  const currentFile = imageValue instanceof File ? imageValue : undefined;
  const existingUrl = typeof imageValue === "string" ? imageValue : undefined;

  return (
    <div className="space-y-5">

      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Département */}
      <Field>
        <FieldLabel htmlFor="school-department">
          Département <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.departmentId ?? ""}
          onValueChange={(val) => setValue("departmentId", val, { shouldValidate: true })}
        >
          <SelectTrigger id="school-department">
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

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="school-name">
          Nom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="school-name"
          placeholder="Ex : École de Fondations Bibliques"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>
        )}
      </Field>

      {/* Type */}
      <Field>
        <FieldLabel htmlFor="school-type">
          Type <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.type ?? SchoolType.EN_PRESENTIELLE}
          onValueChange={(val) => setValue("type", val as SchoolType, { shouldValidate: true })}
        >
          <SelectTrigger id="school-type">
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SchoolType).map((type) => (
              <SelectItem key={type} value={type}>
                {SCHOOL_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-destructive" role="alert">{errors.type.message}</p>
        )}
      </Field>

      {/* Catégorie */}
      <Field>
        <FieldLabel htmlFor="school-category">
          Catégorie <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.category ?? SchoolCategory.GRATUITE}
          onValueChange={(val) => setValue("category", val as SchoolCategory, { shouldValidate: true })}
        >
          <SelectTrigger id="school-category">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SchoolCategory).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {SCHOOL_CATEGORY_LABELS[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive" role="alert">{errors.category.message}</p>
        )}
      </Field>

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="school-image">Image</FieldLabel>
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

      {/* Prix — visible uniquement si PAYANTE */}
      {category === SchoolCategory.PAYANTE && (
        <Field>
          <FieldLabel htmlFor="school-price">
            Prix <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="school-price"
            type="number"
            min={0}
            step={0.01}
            placeholder="Ex : 50000"
            {...register("price", { valueAsNumber: true })}
          />
          <FieldDescription>Montant en FCFA.</FieldDescription>
          {errors.price && (
            <p className="text-sm text-destructive" role="alert">{errors.price.message}</p>
          )}
        </Field>
      )}

      {/* Statut */}
      <Field>
        <FieldLabel htmlFor="school-status">
          Statut <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.status ?? SchoolStatus.EN_ATTENTE}
          onValueChange={(val) => setValue("status", val as SchoolStatus, { shouldValidate: true })}
        >
          <SelectTrigger id="school-status">
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SchoolStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {SCHOOL_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-destructive" role="alert">{errors.status.message}</p>
        )}
      </Field>

      {/* Durée */}
      <Field>
        <FieldLabel htmlFor="school-duration">
          Durée <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="school-duration"
          type="number"
          min={1}
          placeholder="Ex : 30"
          {...register("duration", { valueAsNumber: true })}
        />
        <FieldDescription>Durée en jours.</FieldDescription>
        {errors.duration && (
          <p className="text-sm text-destructive" role="alert">{errors.duration.message}</p>
        )}
      </Field>

    </div>
  );
}