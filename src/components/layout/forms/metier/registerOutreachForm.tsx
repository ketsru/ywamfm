"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { registerOutreachRequestSchema } from "@/modules/outreach/outreach.schema";
import {
  RegisterOutreach, RegisterOutreachRequest,
  OutreachCategory, OutreachStatus,
  OUTREACH_CATEGORY_LABELS, OUTREACH_STATUS_LABELS,
} from "@/lib/types/admin/outreach/outreach.types";
import { ImageUploader } from "@/modules/shared/imageUploader";

type RegisterOutreachFormValues = z.output<typeof registerOutreachRequestSchema>;

type RegisterOutreachFormProps = {
  defaultValues?: RegisterOutreach;
  departments: { id: string; name: string }[];
  onChange: (data: RegisterOutreachRequest, isValid: boolean) => void;
  error?: string;
};

export function RegisterOutreachForm({
  defaultValues,
  departments,
  onChange,
  error,
}: RegisterOutreachFormProps) {

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterOutreachFormValues>({
    resolver: zodResolver(registerOutreachRequestSchema),
    mode: "onChange",
    defaultValues: {
      name:         defaultValues?.name         ?? "",
      departmentId: defaultValues?.departmentId ?? "",
      category:     defaultValues?.category     ?? OutreachCategory.ECOLE,
      image:        null,   // jamais pré-rempli avec l'URL
      status:       defaultValues?.status       ?? OutreachStatus.EN_ATTENTE,
    },
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as RegisterOutreachRequest, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  const imageValue  = watch("image");
  const currentFile = imageValue instanceof File ? imageValue : undefined;
  // URL existante lue depuis la prop, pas depuis le formulaire
  const existingUrl = defaultValues?.imageUrl ?? undefined;

  return (
    <div className="space-y-5">

      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="outreach-name">
          Nom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input id="outreach-name" placeholder="Nom de l'outreach" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>
        )}
      </Field>

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
              <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
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
              <SelectItem key={cat} value={cat}>{OUTREACH_CATEGORY_LABELS[cat]}</SelectItem>
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
            {Object.values(OutreachStatus).map((s) => (
              <SelectItem key={s} value={s}>{OUTREACH_STATUS_LABELS[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-destructive" role="alert">{errors.status.message}</p>
        )}
      </Field>

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="outreach-image">Image</FieldLabel>
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

    </div>
  );
}