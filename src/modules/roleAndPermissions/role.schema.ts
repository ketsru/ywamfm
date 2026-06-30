// src/lib/schemas/role.schema.ts

import { PermissionKey } from "@/lib/types/access/permissions/permisionKey"
import { RoleKey } from "@/lib/types/access/role/role.types"
import * as z from "zod"


export const roleFormSchema = z.object({
  key: z.nativeEnum(RoleKey, {
    message: "Veuillez sélectionner une clé de rôle",
  }),
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional()
    .nullable(),
  active: z.boolean(),
  permissions: z
    .array(z.nativeEnum(PermissionKey))
    .min(1, "Sélectionnez au moins une permission"),
})

export type RoleFormValues = z.infer<typeof roleFormSchema>