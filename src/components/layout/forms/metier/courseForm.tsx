// @/modules/courses/components/CourseForm.tsx
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
import { courseRequestSchema } from "@/modules/courses/course.schema";
import { CourseDetail, CourseRequest } from "@/lib/types/courses/course/course.types";

type CourseFormValues = z.output<typeof courseRequestSchema>;

type PromotionOption = { id: string; name: string };
type PlanningOption = { id: string; name: string; promotionId?: string };

type CourseFormProps = {
  defaultValues?: CourseDetail;
  promotions: PromotionOption[];
  plannings: PlanningOption[];
  onChange: (data: CourseRequest, isValid: boolean) => void;
  error?: string;
};

const CONTENU_MAX = 50_000;

export function CourseForm({
  defaultValues,
  promotions,
  plannings,
  onChange,
  error,
}: CourseFormProps) {

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseRequestSchema),
    mode: "onChange",
    defaultValues: {
      promotionId:  defaultValues?.promotionId  ?? "",
      planningId:   defaultValues?.planningId   ?? "",
      titre:        defaultValues?.titre        ?? "",
      link:         defaultValues?.link         ?? "",
      contenuTexte: defaultValues?.contenuTexte ?? "",
    },
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as CourseRequest, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  const promotionId  = watch("promotionId");
  const planningId   = watch("planningId");
  const contenuTexte = watch("contenuTexte");

  const filteredPlannings = React.useMemo(() => {
    if (!promotionId) return plannings;
    const hasRelation = plannings.some((p) => p.promotionId !== undefined);
    if (!hasRelation) return plannings;
    return plannings.filter((p) => p.promotionId === promotionId);
  }, [plannings, promotionId]);

  React.useEffect(() => {
    if (planningId && !filteredPlannings.some((p) => p.id === planningId)) {
      setValue("planningId", "", { shouldValidate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promotionId]);

  return (
    <div className="space-y-5">

      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Promotion */}
      <Field>
        <FieldLabel htmlFor="course-promotion">
          Promotion <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          defaultValue={defaultValues?.promotionId ?? ""}
          onValueChange={(val) => setValue("promotionId", val, { shouldValidate: true })}
        >
          <SelectTrigger id="course-promotion">
            <SelectValue placeholder="Sélectionner une promotion" />
          </SelectTrigger>
          <SelectContent>
            {promotions.map((promo) => (
              <SelectItem key={promo.id} value={promo.id}>
                {promo.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.promotionId && (
          <p className="text-sm text-destructive" role="alert">{errors.promotionId.message}</p>
        )}
      </Field>

      {/* Planning */}
      <Field>
        <FieldLabel htmlFor="course-planning">
          Planning <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          value={planningId}
          disabled={!promotionId && filteredPlannings.length === 0}
          onValueChange={(val) => setValue("planningId", val, { shouldValidate: true })}
        >
          <SelectTrigger id="course-planning">
            <SelectValue placeholder="Sélectionner un planning" />
          </SelectTrigger>
          <SelectContent>
            {filteredPlannings.map((planning) => (
              <SelectItem key={planning.id} value={planning.id}>
                {planning.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {filteredPlannings.length === 0 && promotionId && (
          <FieldDescription>Aucun planning disponible pour cette promotion.</FieldDescription>
        )}
        {errors.planningId && (
          <p className="text-sm text-destructive" role="alert">{errors.planningId.message}</p>
        )}
      </Field>

      {/* Titre */}
      <Field>
        <FieldLabel htmlFor="course-titre">
          Titre <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="course-titre"
          placeholder="Ex : Introduction à l'épître aux Romains"
          {...register("titre")}
        />
        {errors.titre && (
          <p className="text-sm text-destructive" role="alert">{errors.titre.message}</p>
        )}
      </Field>

      {/* Lien (optionnel) */}
      <Field>
        <FieldLabel htmlFor="course-link">Lien</FieldLabel>
        <Input
          id="course-link"
          type="url"
          placeholder="https://…"
          {...register("link")}
        />
        <FieldDescription>Lien vers une ressource externe (vidéo, document, etc.).</FieldDescription>
        {errors.link && (
          <p className="text-sm text-destructive" role="alert">{errors.link.message}</p>
        )}
      </Field>

      {/* Contenu texte (optionnel) */}
      <Field>
        <FieldLabel htmlFor="course-contenu">Contenu</FieldLabel>
        <Textarea
          id="course-contenu"
          placeholder="Rédigez le contenu du cours…"
          rows={10}
          {...register("contenuTexte")}
        />
        <FieldDescription>
          {(contenuTexte?.length ?? 0).toLocaleString()} / {CONTENU_MAX.toLocaleString()} caractères
        </FieldDescription>
        {errors.contenuTexte && (
          <p className="text-sm text-destructive" role="alert">{errors.contenuTexte.message}</p>
        )}
      </Field>

    </div>
  );
}