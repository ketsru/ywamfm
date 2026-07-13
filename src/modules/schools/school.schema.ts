// @/lib/schemas/school/register-school/register-school.schema.ts

import { z } from "zod"
import { uuidSchema, enumSchema, optionalImageValueSchema } from "@/lib/config/common.schema"
import { 
    SchoolType,
    SchoolCategory,
    SchoolStatus,
 } from "@/lib/types/admin/school/school.types"


const nameSchema = z
    .string()
    .min(1, "Le nom est requis")
    .max(150, "Le nom ne peut pas dépasser 150 caractères")
    .trim()

const durationSchema = z
    .number("La durée doit être un nombre")
    .int("La durée doit être un nombre entier de jours")
    .positive("La durée doit être positive")

const priceSchema = z
    .number("Le prix doit être un nombre" )
    .nonnegative("Le prix ne peut pas être négatif")
    .nullable()
    .optional()

export const registerSchoolRequestSchema = z
    .object({
        departmentId:  uuidSchema,
        name:          nameSchema,
        type:          enumSchema(SchoolType, "Veuillez sélectionner un type"),
        category:      enumSchema(SchoolCategory, "Veuillez sélectionner une catégorie"),
        image:         optionalImageValueSchema,
        price:         priceSchema,
        status:        enumSchema(SchoolStatus, "Veuillez sélectionner un statut"),
        duration:      durationSchema,
    })
    // Une école GRATUITE ne devrait pas porter de prix
    .refine(
        (data) => data.category !== "GRATUITE" || !data.price,
        {
            message: "Une école gratuite ne peut pas avoir de prix",
            path: ["price"],
        }
    )
    // Une école PAYANTE doit avoir un prix > 0
    .refine(
        (data) => data.category !== "PAYANTE" || (data.price != null && data.price > 0),
        {
            message: "Le prix est requis pour une école payante",
            path: ["price"],
        }
    )

export type RegisterSchoolRequestInput = z.infer<typeof registerSchoolRequestSchema>

export const registerSchoolFiltersSchema = z.object({
    status:    enumSchema(SchoolStatus).optional(),
    type:      enumSchema(SchoolType).optional(),
    category:  enumSchema(SchoolCategory).optional(),
})

export type RegisterSchoolFiltersInput = z.infer<typeof registerSchoolFiltersSchema>