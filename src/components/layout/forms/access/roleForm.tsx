// src/modules/roles/roleForm.tsx
"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Role, RoleKey, RoleRequestDto } from "@/lib/types/access/role/role.types"
import { PermissionKey } from "@/lib/types/access/permissions/permisionKey"
import { roleFormSchema, RoleFormValues } from "@/modules/roleAndPermissions/role.schema"

const ROLE_KEY_LABELS: Record<RoleKey, string> = {
  [RoleKey.ADMIN]: "Administrateur",
  [RoleKey.STUDENT]: "Étudiant",
  [RoleKey.STAFF]: "Personnel",
  [RoleKey.MANAGER]: "Responsable",
  [RoleKey.SECRETARY]: "Secrétaire",
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
  defaultValues?: Role;
  onChange: (data: RoleRequestDto, isValid: boolean) => void;
  error?: string;
}

export function RoleForm({ defaultValues, onChange, error }: RoleFormProps) {
  const isEditMode = Boolean(defaultValues)

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    mode: "onChange", // nécessaire pour que isValid reflète l'état en temps réel
    defaultValues: {
      key:         defaultValues?.key ?? undefined,
      name:        defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      active:      defaultValues?.active ?? true,
      permissions: defaultValues?.permissions ?? [],
    },
  })

  // Remonte chaque changement de champ au parent (pas de bouton submit interne :
  // c'est CrudDialog qui déclenche la création/mise à jour via handleConfirm).
  React.useEffect(() => {
    const subscription = watch((values) => {
      const dto: RoleRequestDto = {
        key:         values.key as string,
        name:        values.name ?? "",
        description: values.description ?? "",
        active:      values.active,
        permissions: values.permissions as PermissionKey[] | undefined,
      }
      onChange(dto, isValid)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid])

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

  return (
    <FieldGroup>

      {/* Erreur globale remontée par le dialog (ex: échec API) */}
      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Clé de rôle */}
      <Field data-invalid={!!errors.key}>
        <FieldLabel htmlFor="key">Clé du rôle</FieldLabel>
        <Controller
          control={control}
          name="key"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={isEditMode}>
              <SelectTrigger id="key" aria-invalid={!!errors.key}>
                <SelectValue placeholder="Sélectionner une clé" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(RoleKey)
                  .filter((key) => key !== RoleKey.ADMIN || isEditMode)
                  .map((key) => (
                    <SelectItem key={key} value={key}>
                      {ROLE_KEY_LABELS[key]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.key && <FieldError errors={[errors.key]} />}
        {isEditMode && (
          <FieldDescription>La clé d'un rôle ne peut pas être modifiée après création.</FieldDescription>
        )}
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
        {errors.description && <FieldError errors={[errors.description]} />}
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
                      <div key={perm} className="flex items-center gap-2">
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

        {errors.permissions && <FieldError errors={[errors.permissions]} />}
      </FieldSet>

    </FieldGroup>
  )
}