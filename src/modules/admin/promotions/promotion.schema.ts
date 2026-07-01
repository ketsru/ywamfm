// @/lib/schemas/school/promotion/promotion.schema.ts

import { z } from "zod"
import { uuidSchema } from "@/lib/config/common.schema"

const nameSchema = z
    .string()
    .min(1, "Le nom est requis")
    .max(150, "Le nom ne peut pas dépasser 150 caractères")
    .trim()

// Provisoire : texte libre. À remplacer par un enum si liste fermée.
const specialitySchema = z
    .string()
    .min(1, "La spécialité est requise")
    .max(150)
    .trim()

const descriptionSchema = z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal(""))
    .nullable()

export const promotionRequestSchema = z.object({
    schoolId:     uuidSchema,
    name:         nameSchema,
    speciality:   specialitySchema,
    description:  descriptionSchema,
    isActive:     z.boolean().optional(),
})

export type PromotionRequestInput = z.infer<typeof promotionRequestSchema>

export const promotionFiltersSchema = z.object({
    activeOnly: z.boolean().optional(),
})

export const promotionBySchoolFiltersSchema = promotionFiltersSchema

export type PromotionFiltersInput = z.infer<typeof promotionFiltersSchema>