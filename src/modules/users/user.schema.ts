// @/modules/users/user.schema.ts

import { z } from "zod"
import { emailSchema } from "@/lib/config/common.schema"

const nameSchema = (label: string) =>
    z.string()
        .min(1, `Le ${label} est requis`)
        .max(100, `Le ${label} ne peut pas dépasser 100 caractères`)
        .trim()

// ── Formulaire admin (création/édition d'un compte tiers) ──────────────
export const userRequestSchema = z.object({
    firstName: nameSchema("prénom"),
    lastName:  nameSchema("nom"),
    email:     emailSchema,
    roleKey:   z.string().min(1, "Le rôle est requis"),
})

export type UserRequestInput = z.infer<typeof userRequestSchema>

// ── Formulaire self-service (édition de son propre profil) ─────────────
// Pas d'email ni de rôle : un utilisateur ne peut modifier ni l'un ni
// l'autre lui-même (cf. UserUpdateSelfRequest côté back).
export const selfProfileSchema = z.object({
    firstName: nameSchema("prénom"),
    lastName:  nameSchema("nom"),
})

export type SelfProfileInput = z.infer<typeof selfProfileSchema>