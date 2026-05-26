// @/modules/preachers/components/PreacherForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { preacherRequestSchema } from "@/modules/admin/preachers/preacher.schema";
import { Preacher } from "@/types/admin/preacher/preacher.types";

type PreacherFormValues = z.output<typeof preacherRequestSchema>;

type PreacherFormProps = {
  formId: string;
  defaultValues?: Preacher;
  onSubmit: (data: PreacherFormValues) => void;
};

export function PreacherForm({ formId, defaultValues, onSubmit }: PreacherFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreacherFormValues>({
    resolver: zodResolver(preacherRequestSchema),
    defaultValues: {
      name:       defaultValues?.name       ?? "",
      email:      defaultValues?.email      ?? "",
      origin:     defaultValues?.origin     ?? "",
      telephone:  defaultValues?.telephone  ?? "",
      speciality: defaultValues?.speciality ?? "",
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="preacher-name">
          Nom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="preacher-name"
          placeholder="Ex : Jean Dupont"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>
        )}
      </Field>

      {/* Email */}
      <Field>
        <FieldLabel htmlFor="preacher-email">
          Email <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="preacher-email"
          type="email"
          placeholder="Ex : jean.dupont@exemple.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive" role="alert">{errors.email.message}</p>
        )}
      </Field>

      {/* Origine */}
      <Field>
        <FieldLabel htmlFor="preacher-origin">
          Origine <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="preacher-origin"
          placeholder="Ex : Togo"
          {...register("origin")}
        />
        {errors.origin && (
          <p className="text-sm text-destructive" role="alert">{errors.origin.message}</p>
        )}
      </Field>

      {/* Téléphone */}
      <Field>
        <FieldLabel htmlFor="preacher-telephone">
          Téléphone <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="preacher-telephone"
          type="tel"
          placeholder="Ex : +228 90 00 00 00"
          {...register("telephone")}
        />
        {errors.telephone && (
          <p className="text-sm text-destructive" role="alert">{errors.telephone.message}</p>
        )}
      </Field>

      {/* Spécialité */}
      <Field>
        <FieldLabel htmlFor="preacher-speciality">
          Spécialité <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="preacher-speciality"
          placeholder="Ex : Évangélisation"
          {...register("speciality")}
        />
        {errors.speciality && (
          <p className="text-sm text-destructive" role="alert">{errors.speciality.message}</p>
        )}
      </Field>

    </form>
  );
}