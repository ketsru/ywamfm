"use client"

import * as React from "react"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreateStaffProfile } from "@/lib/types/staff/staff.hooks"
import { StaffProfileFormValues, toStaffProfileRequestDto, STAFF_TYPE_LABELS } from "@/lib/types/staff/staff.mapper"
import { StaffType } from "@/lib/types/staff/staff.types"
import { staffProfileRequestSchema } from "@/modules/public/staff/staff.schema"
import { CrudForm } from "@/modules/shared/crudForm"

// ── Options passées par le parent ─────────────────────────────

export interface DepartmentOption {
  id: string
  name: string
}

export interface StaffFormProps {
  departments: DepartmentOption[]
  defaultValues?: Partial<StaffProfileFormValues>
  onSuccess?: () => void
}

export function StaffForm({
  departments,
  defaultValues,
  onSuccess,
}: StaffFormProps) {
  const { mutateAsync } = useCreateStaffProfile()

  return (
    <CrudForm<StaffProfileFormValues>
      schema={staffProfileRequestSchema}
      defaultValues={{
        departmentId: "",
        type: StaffType.PLEIN_TEMPS,
        debut: "",
        fin: "",
        objectif: "",
        attente: "",
        decisionParcours: false,
        parcoursList: "",
        ywamDecisionParcours: false,
        ywamParcoursList: "",
        userId: "",
        ...defaultValues,
      }}
      submitLabel="Enregistrer l'affectation"
      layout="double"
      onSubmit={async (values) => {
        await mutateAsync(toStaffProfileRequestDto(values))
        onSuccess?.()
      }}
    >
      {(form) => {
        const { errors } = form.formState
        const decisionParcours = form.watch("decisionParcours")
        const ywamDecisionParcours = form.watch("ywamDecisionParcours")

        return (
          <>
            <Field data-invalid={!!errors.departmentId}>
              <FieldLabel htmlFor="departmentId">Département</FieldLabel>
              <Select
                value={form.watch("departmentId")}
                onValueChange={(value) =>
                  form.setValue("departmentId", value, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger id="departmentId">
                  <SelectValue placeholder="Choisissez un département" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>{errors.departmentId?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.type}>
              <FieldLabel htmlFor="type">Type d&apos;affectation</FieldLabel>
              <Select
                value={form.watch("type")}
                onValueChange={(value) =>
                  form.setValue("type", value as StaffType, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Plein temps / temps partiel" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(StaffType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {STAFF_TYPE_LABELS[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>{errors.type?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.debut}>
              <FieldLabel htmlFor="debut">Date de début</FieldLabel>
              <Input id="debut" type="date" {...form.register("debut")} />
              <FieldError>{errors.debut?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.fin}>
              <FieldLabel htmlFor="fin">Date de fin</FieldLabel>
              <Input id="fin" type="date" {...form.register("fin")} />
              <FieldError>{errors.fin?.message}</FieldError>
            </Field>

            <Field className="sm:col-span-2" data-invalid={!!errors.objectif}>
              <FieldLabel htmlFor="objectif">Objectif</FieldLabel>
              <Textarea
                id="objectif"
                rows={3}
                placeholder="Quel est l'objectif de cette affectation ?"
                {...form.register("objectif")}
              />
              <FieldError>{errors.objectif?.message}</FieldError>
            </Field>

            <Field className="sm:col-span-2" data-invalid={!!errors.attente}>
              <FieldLabel htmlFor="attente">Attentes</FieldLabel>
              <Textarea
                id="attente"
                rows={3}
                placeholder="Quelles sont les attentes vis-à-vis de l'équipe ?"
                {...form.register("attente")}
              />
              <FieldError>{errors.attente?.message}</FieldError>
            </Field>

            {/* Parcours local */}
            <Field className="sm:col-span-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="decisionParcours"
                  checked={decisionParcours}
                  onCheckedChange={(checked) =>
                    form.setValue("decisionParcours", checked === true, {
                      shouldValidate: true,
                    })
                  }
                />
                <FieldLabel htmlFor="decisionParcours" className="mb-0">
                  Parcours local validé
                </FieldLabel>
              </div>
              {decisionParcours && (
                <Input
                  className="mt-2"
                  placeholder="Détail du parcours suivi"
                  {...form.register("parcoursList")}
                />
              )}
              <FieldError>{errors.parcoursList?.message}</FieldError>
            </Field>

            {/* Parcours YWAM */}
            <Field className="sm:col-span-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="ywamDecisionParcours"
                  checked={ywamDecisionParcours}
                  onCheckedChange={(checked) =>
                    form.setValue("ywamDecisionParcours", checked === true, {
                      shouldValidate: true,
                    })
                  }
                />
                <FieldLabel htmlFor="ywamDecisionParcours" className="mb-0">
                  Parcours YWAM validé
                </FieldLabel>
              </div>
              {ywamDecisionParcours && (
                <Input
                  className="mt-2"
                  placeholder="Détail du parcours YWAM suivi"
                  {...form.register("ywamParcoursList")}
                />
              )}
              <FieldDescription>
                Coche uniquement les parcours réellement validés à ce jour.
              </FieldDescription>
              <FieldError>{errors.ywamParcoursList?.message}</FieldError>
            </Field>
          </>
        )
      }}
    </CrudForm>
  )
}

export default StaffForm