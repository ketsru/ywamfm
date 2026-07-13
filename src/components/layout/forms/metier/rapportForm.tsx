"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RapportRequest } from "@/lib/types/courses/rapport/rapport.types";
import { RapportRequestInput, rapportRequestSchema } from "@/modules/rapports/rapport.schema";

interface RapportFormProps {
  defaultValues?: RapportRequest;
  onChange:       (data: RapportRequest, isValid: boolean) => void;
  error?:         string;
  schools:        { id: string; name: string }[];
  students?:      { id: string; fullName: string }[]; // optionnel — admin uniquement
}

export function RapportForm({
  defaultValues,
  onChange,
  error,
  schools,
  students,
}: RapportFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<RapportRequestInput>({
    resolver: zodResolver(rapportRequestSchema),
    mode: "onChange",
    defaultValues: {
      nomLivre:       defaultValues?.nomLivre       ?? "",
      auteur:         defaultValues?.auteur         ?? "",
      contenuRapport: defaultValues?.contenuRapport ?? "",
      schoolId:       defaultValues?.schoolId       ?? "",
      studentId:      defaultValues?.studentId      ?? null,
    },
  });

  React.useEffect(() => {
    const sub = watch((values) => {
      onChange(values as RapportRequest, isValid);
    });
    return () => sub.unsubscribe();
  }, [watch, isValid, onChange]);

  const schoolId  = watch("schoolId");
  const studentId = watch("studentId");

  return (
    <div className="space-y-5">

      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* École */}
      <Field>
        <FieldLabel htmlFor="rapport-school">
          École <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          value={schoolId}
          onValueChange={(val) => setValue("schoolId", val, { shouldValidate: true })}
        >
          <SelectTrigger id="rapport-school">
            <SelectValue placeholder="Choisir une école" />
          </SelectTrigger>
          <SelectContent>
            {schools.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.schoolId && (
          <p className="text-sm text-destructive" role="alert">{errors.schoolId.message}</p>
        )}
      </Field>

      {/* Étudiant — réservé admin */}
      {students && (
        <Field>
          <FieldLabel htmlFor="rapport-student">Étudiant</FieldLabel>
          <Select
            value={studentId ?? ""}
            onValueChange={(val) =>
              setValue("studentId", val || null, { shouldValidate: true })
            }
          >
            <SelectTrigger id="rapport-student">
              <SelectValue placeholder="Sélectionner un étudiant (optionnel)" />
            </SelectTrigger>
            <SelectContent>
              {students.map((st) => (
                <SelectItem key={st.id} value={st.id}>
                  {st.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.studentId && (
            <p className="text-sm text-destructive" role="alert">{errors.studentId.message}</p>
          )}
        </Field>
      )}

      {/* Nom du livre */}
      <Field>
        <FieldLabel htmlFor="rapport-nomLivre">
          Nom du livre <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="rapport-nomLivre"
          placeholder="Ex : Les Misérables"
          {...register("nomLivre")}
        />
        {errors.nomLivre && (
          <p className="text-sm text-destructive" role="alert">{errors.nomLivre.message}</p>
        )}
      </Field>

      {/* Auteur */}
      <Field>
        <FieldLabel htmlFor="rapport-auteur">
          Auteur <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="rapport-auteur"
          placeholder="Ex : Victor Hugo"
          {...register("auteur")}
        />
        {errors.auteur && (
          <p className="text-sm text-destructive" role="alert">{errors.auteur.message}</p>
        )}
      </Field>

      {/* Contenu */}
      <Field>
        <FieldLabel htmlFor="rapport-contenu">
          Contenu <span className="text-destructive">*</span>
        </FieldLabel>
        <Textarea
          id="rapport-contenu"
          placeholder="Rédigez le contenu du rapport…"
          rows={6}
          {...register("contenuRapport")}
        />
        {errors.contenuRapport && (
          <p className="text-sm text-destructive" role="alert">{errors.contenuRapport.message}</p>
        )}
      </Field>

    </div>
  );
}