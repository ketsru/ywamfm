"use client"

import * as React from "react"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEnroll } from "@/lib/types/student/student.hooks"
import { toStudentRequestDto } from "@/lib/types/student/student.mapper"
import { StudentRequestFormValues, studentRequestSchema } from "@/modules/public/student/student.schema"
import { CrudForm } from "@/modules/shared/crudForm"


// ── Options passées par le parent (déjà chargées via leurs propres hooks) ──

export interface SchoolOption {
  id: string
  name: string
}

export interface OutreachOption {
  id: string
  name: string
}

export interface StudentFormProps {
  schools: SchoolOption[]
  outreaches?: OutreachOption[]
  defaultValues?: Partial<StudentRequestFormValues>
  onSuccess?: () => void
}

export function StudentRegistrationForm({
  schools,
  outreaches = [],
  defaultValues,
  onSuccess,
}: StudentFormProps) {
  const { mutateAsync } = useEnroll()

  return (
    <CrudForm<StudentRequestFormValues>
      schema={studentRequestSchema}
      defaultValues={{
        schoolId: "",
        outreachId: "",
        objectif: "",
        attente: "",
        userId: "",
        ...defaultValues,
      }}
      submitLabel="S'inscrire"
      onSubmit={async (values) => {
        await mutateAsync(toStudentRequestDto(values))
        onSuccess?.()
      }}
    >
      {(form) => {
        const { errors } = form.formState

        return (
          <>
            <Field data-invalid={!!errors.schoolId}>
              <FieldLabel htmlFor="schoolId">École / formation</FieldLabel>
              <Select
                value={form.watch("schoolId")}
                onValueChange={(value) =>
                  form.setValue("schoolId", value, { shouldValidate: true })
                }
              >
                <SelectTrigger id="schoolId">
                  <SelectValue placeholder="Choisissez une formation" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>{errors.schoolId?.message}</FieldError>
            </Field>

            {outreaches.length > 0 && (
              <Field data-invalid={!!errors.outreachId}>
                <FieldLabel htmlFor="outreachId">
                  Mission terrain (optionnel)
                </FieldLabel>
                <Select
                  value={form.watch("outreachId") || ""}
                  onValueChange={(value) =>
                    form.setValue("outreachId", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger id="outreachId">
                    <SelectValue placeholder="Aucune mission" />
                  </SelectTrigger>
                  <SelectContent>
                    {outreaches.map((outreach) => (
                      <SelectItem key={outreach.id} value={outreach.id}>
                        {outreach.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.outreachId?.message}</FieldError>
              </Field>
            )}

            <Field data-invalid={!!errors.objectif}>
              <FieldLabel htmlFor="objectif">Objectif</FieldLabel>
              <Textarea
                id="objectif"
                rows={3}
                placeholder="Qu'espérez-vous accomplir dans cette formation ?"
                {...form.register("objectif")}
              />
              <FieldError>{errors.objectif?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.attente}>
              <FieldLabel htmlFor="attente">Attentes</FieldLabel>
              <Textarea
                id="attente"
                rows={3}
                placeholder="Qu'attendez-vous de l'équipe pédagogique ?"
                {...form.register("attente")}
              />
              <FieldDescription>
                Ces informations aident l'équipe à mieux vous accompagner.
              </FieldDescription>
              <FieldError>{errors.attente?.message}</FieldError>
            </Field>
          </>
        )
      }}
    </CrudForm>
  )
}

export default StudentRegistrationForm