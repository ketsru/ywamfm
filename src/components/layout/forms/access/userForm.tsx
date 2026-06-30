// src/modules/users/userForm.tsx

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { Loader2, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, UserRequestDto } from "@/lib/types/users/user/user.types"
import { Role } from "@/lib/types/access/role/role.types"
import { userFormSchema, UserFormValues } from "@/modules/users/user.schema"


interface UserFormProps {
  user?: User
  roles: Role[]
  onSubmit: (data: UserRequestDto) => Promise<void> | void
  onCancel?: () => void
  isSubmitting?: boolean
}

export function UserForm({
  user,
  roles,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: UserFormProps) {
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(
    user?.avatarUrl ?? null
  )
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      roleId: user?.roleId ?? "",
      avatar: null,
    },
  })

  const isEditMode = Boolean(user)
  const firstName = watch("firstName")
  const roleId = watch("roleId")

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setValue("avatar", file, { shouldValidate: true })

    const reader = new FileReader()
    reader.onload = () => setAvatarPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleRemoveAvatar() {
    setValue("avatar", null)
    setAvatarPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleFormSubmit(values: UserFormValues) {
    const dto: UserRequestDto = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      roleId: values.roleId,
      avatar: values.avatar ?? null,
    }
    await onSubmit(dto)
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          {isEditMode ? "Modifier l'utilisateur" : "Créer un utilisateur"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            {/* Avatar */}
            <Field>
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-24 w-24">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Avatar preview"
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted text-2xl font-semibold text-muted-foreground">
                      {firstName?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  )}
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {avatarPreview ? "Changer la photo" : "Ajouter une photo"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              {errors.avatar && <FieldError errors={[errors.avatar]} />}
            </Field>

            {/* Prénom / Nom */}
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.firstName}>
                <FieldLabel htmlFor="firstName">Prénom</FieldLabel>
                <Input
                  id="firstName"
                  placeholder="Alice"
                  aria-invalid={!!errors.firstName}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <FieldError errors={[errors.firstName]} />
                )}
              </Field>

              <Field data-invalid={!!errors.lastName}>
                <FieldLabel htmlFor="lastName">Nom</FieldLabel>
                <Input
                  id="lastName"
                  placeholder="Dupont"
                  aria-invalid={!!errors.lastName}
                  {...register("lastName")}
                />
                {errors.lastName && <FieldError errors={[errors.lastName]} />}
              </Field>
            </div>

            {/* Email */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="alice@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {isEditMode && (
                <FieldDescription>
                  Modifier l&apos;email peut nécessiter une reconfirmation.
                </FieldDescription>
              )}
              {errors.email && <FieldError errors={[errors.email]} />}
            </Field>

            {/* Rôle */}
            <Field data-invalid={!!errors.roleId}>
              <FieldLabel htmlFor="roleId">Rôle</FieldLabel>
              <Select
                value={roleId}
                onValueChange={(value) =>
                  setValue("roleId", value, { shouldValidate: true })
                }
              >
                <SelectTrigger id="roleId" aria-invalid={!!errors.roleId}>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.roleId && <FieldError errors={[errors.roleId]} />}
            </Field>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEditMode ? "Enregistrer" : "Créer l'utilisateur"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}