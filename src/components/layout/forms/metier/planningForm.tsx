// @/components/layout/forms/school/planningForm.tsx

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlanningRequestInput, planningRequestSchema } from "@/modules/planning/planning.schema";
import { Planning, PlanningRequest } from "@/lib/types/courses/plannings/planning.types";

type PlanningFormProps = {
  defaultValues?: Planning;
  onChange: (data: PlanningRequest, isValid: boolean) => void;
  error?: string;
  promotions: { id: string; name: string }[];
  themes: { id: string; name: string }[];
  preachers: { id: string; fullName: string }[];
  books: { id: string; title: string }[];
};

export function PlanningForm({ defaultValues, onChange, error, promotions, themes, preachers, books }: PlanningFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<PlanningRequestInput>({
    resolver: zodResolver(planningRequestSchema),
    mode: "onChange",
    defaultValues: {
      name:        defaultValues?.name        ?? "",
      promotionId: defaultValues?.promotionId ?? "",
      semaine:     defaultValues?.semaine     ?? 1,
      themeId:     defaultValues?.themeId     ?? "",
      preacherId:  defaultValues?.preacherId  ?? null,
      bookId:      defaultValues?.bookId      ?? null,
    },
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as PlanningRequest, isValid);
    });
    return () => subscription.unsubscribe();
  }, [watch, isValid, onChange]);

  return (
    <div className="space-y-5">
      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Nom */}
      <Field>
        <FieldLabel htmlFor="planning-name">
          Nom <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="planning-name"
          placeholder="Ex : Semaine 1 — Introduction"
          {...register("name")}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </Field>

      {/* Promotion */}
      <Field>
        <FieldLabel htmlFor="planning-promotion">Promotion <span className="text-destructive">*</span></FieldLabel>
        <Select
          onValueChange={(val) => setValue("promotionId", val, { shouldValidate: true })}
          defaultValue={watch("promotionId")}
        >
          <SelectTrigger id="planning-promotion">
            <SelectValue placeholder="Choisir une promotion" />
          </SelectTrigger>
          <SelectContent>
            {promotions.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.promotionId && <p className="text-sm text-destructive">{errors.promotionId.message}</p>}
      </Field>

      {/* Semaine */}
      <Field>
        <FieldLabel htmlFor="planning-semaine">Semaine <span className="text-destructive">*</span></FieldLabel>
        <Input
          id="planning-semaine"
          type="number"
          min={1}
          max={10}
          {...register("semaine", { valueAsNumber: true })}
        />
        {errors.semaine && <p className="text-sm text-destructive">{errors.semaine.message}</p>}
      </Field>

      {/* Thème */}
      <Field>
        <FieldLabel htmlFor="planning-theme">Thème <span className="text-destructive">*</span></FieldLabel>
        <Select
          onValueChange={(val) => setValue("themeId", val, { shouldValidate: true })}
          defaultValue={watch("themeId")}
        >
          <SelectTrigger id="planning-theme">
            <SelectValue placeholder="Choisir un thème" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.themeId && <p className="text-sm text-destructive">{errors.themeId.message}</p>}
      </Field>

      {/* Orateur (optionnel) */}
      <Field>
        <FieldLabel htmlFor="planning-preacher">Orateur</FieldLabel>
        <Select
          onValueChange={(val) => setValue("preacherId", val, { shouldValidate: true })}
          defaultValue={watch("preacherId") ?? ""}
        >
          <SelectTrigger id="planning-preacher">
            <SelectValue placeholder="Choisir un orateur (optionnel)" />
          </SelectTrigger>
          <SelectContent>
            {preachers.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.fullName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Livre (optionnel) */}
      <Field>
        <FieldLabel htmlFor="planning-book">Livre</FieldLabel>
        <Select
          onValueChange={(val) => setValue("bookId", val, { shouldValidate: true })}
          defaultValue={watch("bookId") ?? ""}
        >
          <SelectTrigger id="planning-book">
            <SelectValue placeholder="Choisir un livre (optionnel)" />
          </SelectTrigger>
          <SelectContent>
            {books.map((b) => (
              <SelectItem key={b.id} value={b.id}>{b.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
