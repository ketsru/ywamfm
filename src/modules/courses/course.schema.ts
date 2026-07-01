// @/lib/schemas/school/course/course.schema.ts

import { z } from "zod"
import { uuidSchema, optionalUrlSchema } from "@/lib/config/common.schema"

/* ============================================================
   PRIMITIVES DU DOMAINE
============================================================ */

const titreSchema = z
    .string()
    .min(1, "Le titre est requis")
    .max(200, "Le titre ne peut pas dépasser 200 caractères")
    .trim()

const contenuTexteSchema = z
    .string()
    .max(50_000, "Le contenu ne peut pas dépasser 50 000 caractères")
    .optional()
    .or(z.literal(""))

/* ============================================================
   CREATE / UPDATE — CourseRequest
============================================================ */

export const courseRequestSchema = z.object({
    promotionId:   uuidSchema,
    planningId:    uuidSchema,
    titre:         titreSchema,
    link:          optionalUrlSchema,
    contenuTexte:  contenuTexteSchema,
})

export type CourseRequestInput = z.infer<typeof courseRequestSchema>

/* ============================================================
   FILTRES DE LISTE — CourseFilters
============================================================ */

export const courseFiltersSchema = z.object({
    promotionId: uuidSchema.optional(),
    planningId:  uuidSchema.optional(),
    search:      z.string().trim().max(100).optional(),
})

export type CourseFiltersInput = z.infer<typeof courseFiltersSchema>