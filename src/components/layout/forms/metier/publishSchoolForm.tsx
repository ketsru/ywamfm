// @/components/layout/forms/metier/publishSchoolForm.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/modules/shared/imageUploader";
import {
  PublishSchool,
  PublishSchoolRequest,
  PublishSchoolStatus,
  PUBLISH_SCHOOL_STATUS_LABELS,
} from "@/lib/types/admin/publish-school/publish-school.types";
import { publishSchoolRequestSchema } from "@/modules/schools/publish-school.schema";

type PublishSchoolFormValues = z.output<typeof publishSchoolRequestSchema>;

interface PromotionOption {
  id: string;
  name: string;
  speciality: string;
}

type PublishSchoolFormProps = {
  defaultValues?: PublishSchool;
  promotions: PromotionOption[];
  promotionsLoading?: boolean;
  onChange: (data: Omit<PublishSchoolRequest, "schoolId">, isValid: boolean) => void;
  error?: string;
};

export function PublishSchoolForm({
  defaultValues,
  promotions,
  promotionsLoading,
  onChange,
  error,
}: PublishSchoolFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<PublishSchoolFormValues>({
    resolver: zodResolver(publishSchoolRequestSchema),
    mode: "onChange",
    defaultValues: {
      promotionId: defaultValues?.promotionId ?? "",
      startDate:   defaultValues?.startDate?.slice(0, 10) ?? "",
      endDate:     defaultValues?.endDate?.slice(0, 10) ?? "",
      location:    defaultValues?.location ?? "",
      description: defaultValues?.description ?? "",
      status:      defaultValues?.status ?? PublishSchoolStatus.EN_ATTENTE,
      image:       null, // on ne pré-remplit jamais l'image — existingUrl gère l'affichage
    },
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as Omit<PublishSchoolRequest, "schoolId">, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  const promotionId = watch("promotionId");
  const status      = watch("status");
  const imageValue  = watch("image");

  const currentFile = imageValue instanceof File ? imageValue : undefined;
  const existingUrl = typeof defaultValues?.imageUrl === "string"
    ? defaultValues.imageUrl    // lu depuis la prop, pas depuis le formulaire
    : undefined;

  return (
    <div className="space-y-5">

      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Promotion */}
      <Field>
        <FieldLabel htmlFor="publish-promotion">
          Promotion <span className="text-destructive">*</span>
        </FieldLabel>
        {promotionsLoading ? (
          <p className="text-sm text-muted-foreground">Chargement des promotions…</p>
        ) : promotions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune promotion active pour cette école. Créez-en une avant de publier.
          </p>
        ) : (
          <Select
            value={promotionId}
            onValueChange={(v) => setValue("promotionId", v, { shouldValidate: true })}
          >
            <SelectTrigger id="publish-promotion">
              <SelectValue placeholder="Sélectionner une promotion" />
            </SelectTrigger>
            <SelectContent>
              {promotions.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} — {p.speciality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.promotionId && (
          <p className="text-sm text-destructive" role="alert">{errors.promotionId.message}</p>
        )}
      </Field>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="publish-start">
            Date de début <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="publish-start" type="date" {...register("startDate")} />
          {errors.startDate && (
            <p className="text-sm text-destructive" role="alert">{errors.startDate.message}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="publish-end">
            Date de fin <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="publish-end" type="date" {...register("endDate")} />
          {errors.endDate && (
            <p className="text-sm text-destructive" role="alert">{errors.endDate.message}</p>
          )}
        </Field>
      </div>

      {/* Lieu */}
      <Field>
        <FieldLabel htmlFor="publish-location">
          Lieu <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="publish-location"
          placeholder="Ex : Lomé, Campus principal"
          {...register("location")}
        />
        {errors.location && (
          <p className="text-sm text-destructive" role="alert">{errors.location.message}</p>
        )}
      </Field>

      {/* Statut */}
      <Field>
        <FieldLabel htmlFor="publish-status">
          Statut <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          value={status}
          onValueChange={(v) => setValue("status", v as PublishSchoolStatus, { shouldValidate: true })}
        >
          <SelectTrigger id="publish-status">
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(PublishSchoolStatus).map((s) => (
              <SelectItem key={s} value={s}>
                {PUBLISH_SCHOOL_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-destructive" role="alert">{errors.status.message}</p>
        )}
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel htmlFor="publish-description">Description</FieldLabel>
        <Textarea
          id="publish-description"
          placeholder="Description optionnelle de la publication…"
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive" role="alert">{errors.description.message}</p>
        )}
      </Field>

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="publish-image">Image</FieldLabel>
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