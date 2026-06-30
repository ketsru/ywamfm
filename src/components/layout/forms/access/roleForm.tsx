// src/modules/roles/roleForm.tsx

"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Role, RoleKey, RoleRequestDto } from "@/lib/types/access/role/role.types"
import { PermissionKey } from "@/lib/types/access/permissions/permisionKey"
import { roleFormSchema, RoleFormValues } from "@/modules/roleAndPermissions/role.schema"


const ROLE_KEY_LABELS: Record<RoleKey, string> = {
  [RoleKey.ADMIN]: "Administrateur",
  [RoleKey.BTP_PROVIDER]: "Prestataire BTP",
  [RoleKey.SERVICE_SEEKER]: "Demandeur de service",
  [RoleKey.MATERIAL_SUPPLIER]: "Fournisseur de matériel",
  [RoleKey.TRAINING_CENTER]: "Centre de formation",
  [RoleKey.USER]: "Utilisateur",
}

// Regroupe les permissions par préfixe (ex: "USER_VIEW" -> "USER")
function groupPermissions(): Record<string, PermissionKey[]> {
  const groups: Record<string, PermissionKey[]> = {}
  for (const key of Object.values(PermissionKey)) {
    const prefix = key.split("_")[0]
    if (!groups[prefix]) groups[prefix] = []
    groups[prefix].push(key)
  }
  return groups
}

const PERMISSION_GROUPS = groupPermissions()

interface RoleFormProps {
  role?: Role
  onSubmit: (data: RoleRequestDto) => Promise<void> | void
  onCancel?: () => void
  isSubmitting?: boolean
}

export function RoleForm({
  role,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: RoleFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      key: role?.key ?? undefined,
      name: role?.name ?? "",
      description: role?.description ?? "",
      active: role?.active ?? true,
      permissions: role?.permissions ?? [],
    },
  })

  const isEditMode = Boolean(role)
  const selectedPermissions = watch("permissions")

  function togglePermission(permission: PermissionKey, checked: boolean) {
    const current = selectedPermissions ?? []
    const next = checked
      ? [...current, permission]
      : current.filter((p) => p !== permission)
    setValue("permissions", next, { shouldValidate: true })
  }

  function toggleGroup(group: PermissionKey[], checked: boolean) {
    const current = new Set(selectedPermissions ?? [])
    if (checked) {
      group.forEach((p) => current.add(p))
    } else {
      group.forEach((p) => current.delete(p))
    }
    setValue("permissions", Array.from(current), { shouldValidate: true })
  }

  async function handleFormSubmit(values: RoleFormValues) {
    const dto: RoleRequestDto = {
      key: values.key,
      name: values.name,
      description: values.description ?? "",
      active: values.active,
      permissions: values.permissions,
    }
    await onSubmit(dto)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{isEditMode ? "Modifier le rôle" : "Créer un rôle"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            {/* Clé de rôle */}
            <Field data-invalid={!!errors.key}>
              <FieldLabel htmlFor="key">Clé du rôle</FieldLabel>
              <Controller
                control={control}
                name="key"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="key" aria-invalid={!!errors.key}>
                      <SelectValue placeholder="Sélectionner une clé" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(RoleKey).map((key) => (
                        <SelectItem key={key} value={key}>
                          {ROLE_KEY_LABELS[key]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.key && <FieldError errors={[errors.key]} />}
            </Field>

            {/* Nom */}
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Nom</FieldLabel>
              <Input
                id="name"
                placeholder="Administrateur"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && <FieldError errors={[errors.name]} />}
            </Field>

            {/* Description */}
            <Field data-invalid={!!errors.description}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Décrivez le périmètre de ce rôle..."
                rows={3}
                {...register("description")}
              />
              {errors.description && (
                <FieldError errors={[errors.description]} />
              )}
            </Field>

            {/* Actif */}
            <Field orientation="horizontal">
              <FieldLabel htmlFor="active">Rôle actif</FieldLabel>
              <Controller
                control={control}
                name="active"
                render={({ field }) => (
                  <Switch
                    id="active"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <FieldDescription>
                Un rôle inactif ne peut plus être assigné aux utilisateurs.
              </FieldDescription>
            </Field>

            <FieldSeparator />

            {/* Permissions */}
            <FieldSet>
              <FieldLegend>Permissions</FieldLegend>
              <FieldDescription>
                Sélectionnez les permissions accordées à ce rôle.
              </FieldDescription>

              <ScrollArea className="h-80 rounded-md border p-4">
                <div className="space-y-5">
                  {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => {
                    const allChecked = perms.every((p) =>
                      selectedPermissions?.includes(p)
                    )
                    const someChecked = perms.some((p) =>
                      selectedPermissions?.includes(p)
                    )

                    return (
                      <div key={group} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`group-${group}`}
                            checked={
                              allChecked
                                ? true
                                : someChecked
                                ? "indeterminate"
                                : false
                            }
                            onCheckedChange={(checked) =>
                              toggleGroup(perms, checked === true)
                            }
                          />
                          <label
                            htmlFor={`group-${group}`}
                            className="text-sm font-semibold"
                          >
                            {group}
                          </label>
                        </div>
                        <div className="ml-6 grid grid-cols-2 gap-2">
                          {perms.map((perm) => (
                            <div
                              key={perm}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={perm}
                                checked={selectedPermissions?.includes(perm)}
                                onCheckedChange={(checked) =>
                                  togglePermission(perm, checked === true)
                                }
                              />
                              <label
                                htmlFor={perm}
                                className="text-xs text-muted-foreground"
                              >
                                {perm}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>

              {errors.permissions && (
                <FieldError errors={[errors.permissions]} />
              )}
            </FieldSet>

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
                {isEditMode ? "Enregistrer" : "Créer le rôle"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}