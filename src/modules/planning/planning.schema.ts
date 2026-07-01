// @/lib/schemas/school/planning/planning.schema.ts

import { z } from "zod"
import { uuidSchema } from "@/lib/config/common.schema"

/* ============================================================
   PRIMITIVES DU DOMAINE
============================================================ */

const nameSchema = z
    .string()
    .min(1, "Le nom est requis")
    .max(150, "Le nom ne peut pas dépasser 150 caractères")
    .trim()

const semaineSchema = z
    .number({ error: "La semaine doit être un nombre" })
    .int({ error: "La semaine doit être un nombre entier" })
    .min(1, { error: "La semaine doit être comprise entre 1 et 10" })
    .max(10, { error: "La semaine doit être comprise entre 1 et 10" })

// id optionnel/nullable réutilisable pour preacherId, bookId, etc.
const optionalUuidSchema = uuidSchema.nullable().optional()

/* ============================================================
   CREATE / UPDATE — PlanningRequest
============================================================ */

export const planningRequestSchema = z.object({
    name:         nameSchema,
    promotionId:  uuidSchema,
    semaine:      semaineSchema,
    themeId:      uuidSchema,
    preacherId:   optionalUuidSchema,
    bookId:       optionalUuidSchema,
})

export type PlanningRequestInput = z.infer<typeof planningRequestSchema>