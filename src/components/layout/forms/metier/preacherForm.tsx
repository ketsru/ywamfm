// @/modules/preachers/components/PreacherForm.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Preacher } from "@/lib/types/admin/preacher/preacher.types";
import { preacherRequestSchema } from "@/modules/preachers/preacher.schema";

type PreacherFormValues = z.output<typeof preacherRequestSchema>;

type PreacherFormProps = {
  defaultValues?: Preacher;
  onChange: (data: PreacherFormValues, isValid: boolean) => void;
  error?: string;
};

export function PreacherForm({ defaultValues, onChange, error }: PreacherFormProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<PreacherFormValues>({
    resolver: zodResolver(preacherRequestSchema),
    mode: "onChange",
    defaultValues: {
      firstName:  defaultValues?.firstName  ?? "",
      lastName:   defaultValues?.lastName   ?? "",
      email:      defaultValues?.email      ?? "",
      origin:     defaultValues?.origin     ?? "",
      telephone:  defaultValues?.telephone  ?? "",
      speciality: defaultValues?.speciality ?? "",
    },
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as PreacherFormValues, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  return (
    <div className="space-y-5">
      {error && (
        <p
          className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Prénom */}
      <Field>
        <FieldLabel htmlFor="preacher-firstName">
          Prénom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="preacher-firstName"
          placeholder="Ex : Jean"
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-sm text-destructive" role="alert">
            {errors.firstName.message}
          </p>
        )}
      </Field>

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="preacher-lastName">
          Nom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="preacher-lastName"
          placeholder="Ex : Dupont"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-sm text-destructive" role="alert">
            {errors.lastName.message}
          </p>
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
          <p className="text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
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
          <p className="text-sm text-destructive" role="alert">
            {errors.origin.message}
          </p>
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
          <p className="text-sm text-destructive" role="alert">
            {errors.telephone.message}
          </p>
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
          <p className="text-sm text-destructive" role="alert">
            {errors.speciality.message}
          </p>
        )}
      </Field>
    </div>
  );
}
