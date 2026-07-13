// @/components/layout/forms/access/selfProfileForm.tsx
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { User, UserUpdateSelfRequest } from "@/lib/types/users/user/user.types"
import { selfProfileSchema } from "@/modules/users/user.schema"

type SelfProfileFormValues = z.output<typeof selfProfileSchema>

interface SelfProfileFormProps {
  defaultValues?: User
  onChange: (data: UserUpdateSelfRequest, isValid: boolean) => void
  error?: string
}

export function SelfProfileForm({ defaultValues, onChange, error }: SelfProfileFormProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<SelfProfileFormValues>({
    resolver: zodResolver(selfProfileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: defaultValues?.firstName ?? "",
      lastName:  defaultValues?.lastName  ?? "",
    },
  })

  React.useEffect(() => {
    const subscription = watch((values) => {
      const dto: UserUpdateSelfRequest = {
        firstName: values.firstName ?? "",
        lastName:  values.lastName  ?? "",
      }
      onChange(dto, isValid)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid])

  const firstName = watch("firstName")

  return (
    <div className="space-y-5">

      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {defaultValues?.avatarUrl && (
        <div className="flex justify-center">
          <img
            src={defaultValues.avatarUrl}
            alt={firstName}
            className="h-16 w-16 rounded-full object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field data-invalid={!!errors.firstName}>
          <FieldLabel htmlFor="firstName">Prénom</FieldLabel>
          <Input id="firstName" placeholder="Alice" {...register("firstName")} />
          {errors.firstName && <FieldError errors={[errors.firstName]} />}
        </Field>

        <Field data-invalid={!!errors.lastName}>
          <FieldLabel htmlFor="lastName">Nom</FieldLabel>
          <Input id="lastName" placeholder="Dupont" {...register("lastName")} />
          {errors.lastName && <FieldError errors={[errors.lastName]} />}
        </Field>
      </div>

      {/* Email affiché en lecture seule : sa modification nécessite
          une reconfirmation, donc pas via ce formulaire self-service */}
      {defaultValues?.email && (
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" value={defaultValues.email} disabled />
        </Field>
      )}

    </div>
  )
}