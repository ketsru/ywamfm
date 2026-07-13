// ============================================================
// staff.schema.ts
// ============================================================

import { z } from "zod"
import { uuidSchema, isoDatetimeSchema } from "@/lib/config/common.schema"
import { StaffType } from "@/lib/types/staff/staff.types"

/* ============================================================
   HELPERS LOCAUX
============================================================ */

const optionalUuidSchema = z
    .string()
    .uuid("Sélection invalide")
    .optional()
    .or(z.literal(""))

// isoDatetimeSchema valide déjà "non vide + parseable" — suffisant pour
// une LocalDate (ex: "2024-06-15") saisie via <Input type="date">.
const localDateSchema = isoDatetimeSchema

// On n'utilise PAS enumSchema() ici : sa signature générique
// (`T extends Record<string, string>`) caste ses valeurs en `[string, ...string[]]`,
// ce qui efface le type littéral de l'enum et fait sortir un `z.enum` typé `string`
// au lieu de `StaffType`. On reconstruit donc le tuple nous-mêmes pour préserver
// le typage exact — nécessaire ici car StaffProfileFormValues.type doit être StaffType.
const STAFF_TYPE_VALUES = Object.values(StaffType) as [StaffType, ...StaffType[]]

export const staffTypeSchema = z.enum(STAFF_TYPE_VALUES, {
    error: "Type de staff invalide",
})

/* ============================================================
   AFFECTATION (StaffProfileRequestDto)
============================================================ */

export const staffProfileRequestSchema = z
    .object({
        departmentId: uuidSchema,
        type: staffTypeSchema,
        debut: localDateSchema,
        fin: localDateSchema,
        objectif: z
            .string()
            .min(1, "L'objectif est requis")
            .max(1000, "1000 caractères maximum"),
        attente: z
            .string()
            .min(1, "Les attentes sont requises")
            .max(1000, "1000 caractères maximum"),
        decisionParcours: z.boolean().optional().default(false),
        parcoursList: z.string().max(2000).optional().or(z.literal("")),
        ywamDecisionParcours: z.boolean().optional().default(false),
        ywamParcoursList: z.string().max(2000).optional().or(z.literal("")),
        // Renseigné uniquement par un admin affectant un tiers.
        userId: optionalUuidSchema,
    })
    .refine((data) => new Date(data.fin) > new Date(data.debut), {
        message: "La date de fin doit être postérieure à la date de début",
        path: ["fin"],
    })

export type StaffProfileFormValues = z.infer<typeof staffProfileRequestSchema>

/* ============================================================
   DÉCISIONS PARCOURS — usage admin
============================================================ */

export const parcoursDecisionSchema = z.object({
    decisionParcours: z.boolean(),
    parcoursList: z.string().max(2000).optional().or(z.literal("")),
})
export type ParcoursDecisionFormValues = z.infer<typeof parcoursDecisionSchema>

export const ywamParcoursDecisionSchema = z.object({
    ywamDecisionParcours: z.boolean(),
    ywamParcoursList: z.string().max(2000).optional().or(z.literal("")),
})
export type YwamParcoursDecisionFormValues = z.infer<
    typeof ywamParcoursDecisionSchema
>