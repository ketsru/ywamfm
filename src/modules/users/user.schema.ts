// @/lib/schemas/iam/users/user.schema.ts

import { z } from "zod"
import { uuidSchema, emailSchema, imageFileSchema } from "@/lib/config/common.schema"

const nameSchema = (label: string) =>
    z.string()
        .min(1, `Le ${label} est requis`)
        .max(100, `Le ${label} ne peut pas dépasser 100 caractères`)
        .trim()

export const userRequestSchema = z.object({
    firstName:  nameSchema("prénom"),
    lastName:   nameSchema("nom"),
    email:      emailSchema,
    // File nouveau OU null (pas d'avatar / suppression) — pas d'URL existante ici
    // vu que UserRequestDto n'accepte que File | null
    avatar:     imageFileSchema.nullable().optional(),
    roleId:     uuidSchema,
})

export type UserRequestInput = z.infer<typeof userRequestSchema>