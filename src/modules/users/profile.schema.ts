// @/lib/schemas/iam/profiles/profile.schema.ts

import { z } from "zod"
import { uuidSchema } from "@/lib/config/common.schema"

const sexeSchema = z.enum(["M", "F", "OTHER"], {
    error: "Veuillez sélectionner un sexe",
})

const maritalStatusSchema = z.enum(
    ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "SEPARATED"],
    { error: "Veuillez sélectionner un statut marital" }
)

// Indicatif pays type "+228" — souple, à resserrer si liste fermée de pays
const countryCodeSchema = z
    .string()
    .regex(/^\+\d{1,4}$/, "Indicatif invalide (ex: +228)")

// Numéro local sans indicatif
const phoneSchema = z
    .string()
    .regex(/^\d{6,12}$/, "Numéro invalide")

const birthDateSchema = z
    .string()
    .min(1, "La date de naissance est requise")
    .refine((val) => !isNaN(Date.parse(val)), "Date invalide")
    .refine((val) => new Date(val) < new Date(), "La date de naissance doit être dans le passé")

export const profileRequestSchema = z.object({
    countryCode:     countryCodeSchema.nullable().optional(),
    phone:           phoneSchema.nullable().optional(),
    address:         z.string().max(300).nullable().optional(),
    country:         z.string().max(100).nullable().optional(),
    city:            z.string().max(100).nullable().optional(),
    sexe:            sexeSchema.nullable().optional(),
    maritalStatus:   maritalStatusSchema.nullable().optional(),
    birthDate:       birthDateSchema.nullable().optional(),
    userId:          uuidSchema.optional(), // admin only — géré côté logique métier, pas dans le form public
})

export type ProfileRequestInput = z.infer<typeof profileRequestSchema>