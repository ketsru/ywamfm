// @/lib/config/common.schema.ts

import { z } from "zod"
import {
    IMAGE_MAX_SIZE,
    IMAGE_ACCEPTED_TYPES,
    DISCOUNT_MAX,
    PRODUCT_RATING_MAX,
    VIDEO_MAX_SIZE,
    VIDEO_ACCEPTED_TYPES,
} from "@/lib/config/upload.config"

/* ============================================================
   PRIMITIVES
============================================================ */

export const uuidSchema = z.string().uuid("UUID invalide")

// Accepte le format datetime-local ("2024-06-15T14:30")
// ET l'ISO 8601 complet ("2024-06-15T14:30:00.000Z")
export const isoDatetimeSchema = z.string()
    .min(1, "La date est requise")
    .refine(
        (val) => !isNaN(Date.parse(val)),
        "Date invalide"
    )

/* ============================================================
   LIENS GÉNÉRIQUES
============================================================ */

export const urlSchema = z.string().url("URL invalide")

export const optionalUrlSchema = urlSchema.optional().or(z.literal(""))

/* ============================================================
   CONTACT
============================================================ */

export const emailSchema = z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide")
    .trim()
    .toLowerCase()

// Format souple : chiffres, espaces, +, -, parenthèses — à resserrer si format imposé (ex: +228 XX XX XX XX)
export const phoneSchema = z
    .string()
    .min(1, "Le téléphone est requis")
    .regex(/^[\d\s+()-]{8,20}$/, "Numéro de téléphone invalide")
    .trim()

/* ============================================================
   IMAGE
============================================================ */

export const imageFileSchema = z
    .instanceof(File)
    .refine(
        (f) => f.size <= IMAGE_MAX_SIZE,
        `L'image ne doit pas dépasser ${IMAGE_MAX_SIZE / 1024 / 1024} Mo`
    )
    .refine(
        (f) => IMAGE_ACCEPTED_TYPES.includes(f.type),
        `Format accepté : ${IMAGE_ACCEPTED_TYPES.map((t) => t.split("/")[1].toUpperCase()).join(", ")}`
    )

export const optionalImageFileSchema = imageFileSchema.optional()

// Valeur de champ image : File (nouvel upload) OU string (base64/URL déjà existant, mode édition)
export const imageValueSchema = z.union([
    imageFileSchema,
    z.string().min(1, "L'image est requise"),
])

export const optionalImageValueSchema = z.union([
    imageFileSchema,
    z.string(),
]).nullable().optional()

/* ============================================================
   VIDÉO
============================================================ */

const YOUTUBE_REGEX =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w-]{6,}(\S*)?$/

export const youtubeUrlSchema = z
    .string()
    .regex(YOUTUBE_REGEX, "Lien YouTube invalide")

export const videoFileSchema = z
    .instanceof(File)
    .refine(
        (f) => f.size <= VIDEO_MAX_SIZE,
        `La vidéo ne doit pas dépasser ${VIDEO_MAX_SIZE / 1024 / 1024} Mo`
    )
    .refine(
        (f) => VIDEO_ACCEPTED_TYPES.includes(f.type),
        `Format accepté : ${VIDEO_ACCEPTED_TYPES.map((t) => t.split("/")[1].toUpperCase()).join(", ")}`
    )

// Saisie utilisateur dans le formulaire : File nouveau OU lien YouTube strictement validé.
// N'accepte PAS n'importe quelle URL — évite qu'un lien non-vidéo soit accepté par erreur.
export const videoInputSchema = z.union([
    videoFileSchema,
    youtubeUrlSchema,
])

export const optionalVideoInputSchema = videoInputSchema.optional()

// Valeur de champ vidéo côté formulaire d'édition : ajoute le cas "URL déjà hébergée par
// le backend" (provenant de l'API, donc de confiance — pas une saisie libre de l'utilisateur).
export const videoValueSchema = z.union([
    videoFileSchema,
    youtubeUrlSchema,
    urlSchema,
])

export const optionalVideoSchema = videoValueSchema.optional()

/* ============================================================
   METIER
============================================================ */

export const discountValueSchema = z
    .number()
    .positive("La remise doit être positive")
    .max(DISCOUNT_MAX, `La remise ne peut pas dépasser ${DISCOUNT_MAX}%`)

export const ratingSchema = z
    .number()
    .min(0)
    .max(PRODUCT_RATING_MAX)
    .optional()

export const dateRangeRefinement = (data: { startDate: string; endDate: string }) =>
    new Date(data.endDate) > new Date(data.startDate)

export const dateRangeRefinementMessage = {
    message: "La date de fin doit être postérieure à la date de début",
    path:    ["endDate"],
}

/* ============================================================
   HELPER — enum depuis un objet const "as const"
============================================================ */

export function enumSchema<T extends Record<string, string>>(
    obj: T,
    message = "Valeur invalide"
) {
    const values = Object.values(obj) as [string, ...string[]]
    return z.enum(values, { error: message })
}