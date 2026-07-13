// @/components/layout/forms/access/userForm.tsx
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, UserRequestDto } from "@/lib/types/users/user/user.types"
import { Role } from "@/lib/types/access/role/role.types"
import { userRequestSchema } from "@/modules/users/user.schema"

type UserFormValues = z.output<typeof userRequestSchema>

interface UserFormProps {
  defaultValues?: User;
  roles: Role[];
  onChange: (data: UserRequestDto, isValid: boolean) => void;
  error?: string;
}

export function UserForm({ defaultValues, roles, onChange, error }: UserFormProps) {
  const isEditMode = Boolean(defaultValues)

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userRequestSchema),
    mode: "onChange",
    defaultValues: {
      firstName: defaultValues?.firstName ?? "",
      lastName:  defaultValues?.lastName  ?? "",
      email:     defaultValues?.email     ?? "",
      roleKey:   defaultValues?.roleKey   ?? "",
    },
  })

  React.useEffect(() => {
    const subscription = watch((values) => {
      const dto: UserRequestDto = {
        firstName: values.firstName ?? "",
        lastName:  values.lastName  ?? "",
        email:     values.email     ?? "",
        roleKey:   values.roleKey   ?? "", // ← valeur courante du formulaire, pas defaultValues figé
      }
      onChange(dto, isValid)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid])

  const firstName = watch("firstName")
  const roleKey = watch("roleKey")

  return (
    <div className="space-y-5">

      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Avatar en lecture seule : pas d'upload possible ici (endpoint admin en JSON pur) */}
      {defaultValues?.avatarUrl && (
        <div className="flex justify-center">
          <img
            src={defaultValues.avatarUrl}
            alt={firstName}
            className="h-16 w-16 rounded-full object-cover"
          />
        </div>
      )}

      {/* Prénom / Nom */}
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

      {/* Email */}
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="alice@example.com" {...register("email")} />
        {isEditMode && (
          <FieldDescription>
            Modifier l&apos;email peut nécessiter une reconfirmation.
          </FieldDescription>
        )}
        {errors.email && <FieldError errors={[errors.email]} />}
      </Field>

      {/* Rôle */}
      <Field data-invalid={!!errors.roleKey}>
        <FieldLabel htmlFor="roleKey">Rôle</FieldLabel>
        <Select
          value={roleKey}
          onValueChange={(value) => setValue("roleKey", value, { shouldValidate: true })}
        >
          <SelectTrigger id="roleKey" aria-invalid={!!errors.roleKey}>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.key}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.roleKey && <FieldError errors={[errors.roleKey]} />}
      </Field>

    </div>
  )
}