// @/lib/schemas/school/theme/theme.schema.ts

import { z } from "zod"

const nameSchema = z
    .string()
    .min(1, "Le nom est requis")
    .max(150, "Le nom ne peut pas dépasser 150 caractères")
    .trim()

const descriptionSchema = z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal(""))
    .nullable()

export const themeRequestSchema = z.object({
    name:         nameSchema,
    description:  descriptionSchema,
})

export type ThemeRequestInput = z.infer<typeof themeRequestSchema>

export const themeFiltersSchema = z.object({
    search: z.string().trim().max(100).optional(),
})

export type ThemeFiltersInput = z.infer<typeof themeFiltersSchema>