// @/modules/schools/components/RegisterSchoolForm.tsx
"use client";

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
  SchoolType,
  SchoolCategory,
  SchoolStatus,
  SCHOOL_TYPE_LABELS,
  SCHOOL_CATEGORY_LABELS,
  SCHOOL_STATUS_LABELS,
} from "@/lib/types/admin/school/school.types";

type RegisterSchoolFormValues = z.output<typeof registerSchoolRequestSchema>;

type RegisterSchoolFormProps = {
  formId: string;
  defaultValues?: RegisterSchool;
  departments: { id: string; name: string }[];
  onSubmit: (data: RegisterSchoolFormValues) => void;
};

export function RegisterSchoolForm({
  formId,
  defaultValues,
  departments,
  onSubmit,
}: RegisterSchoolFormProps) {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterSchoolFormValues>({
    resolver: zodResolver(registerSchoolRequestSchema),
    defaultValues: {
      departmentId: defaultValues?.departmentId ?? "",
      name:         defaultValues?.name         ?? "",
      type:         defaultValues?.type         ?? SchoolType.EN_PRESENTIELLE,
      category:     defaultValues?.category     ?? SchoolCategory.GRATUITE,
      price:        defaultValues?.price        ?? null,
      status:       defaultValues?.status       ?? SchoolStatus.EN_ATTENTE,
      duration:     defaultValues?.duration     ?? undefined,
    },
  });

  const category = watch("category");

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

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

    </form>
  );
}