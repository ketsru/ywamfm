// @/lib/schemas/school/department/department.schema.ts

import { z } from "zod"
import { optionalImageValueSchema } from "@/lib/config/common.schema"

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

export const departmentRequestSchema = z.object({
    name:         nameSchema,
    description:  descriptionSchema,
    image:        optionalImageValueSchema, // optionnel d'après DepartmentRequest
    isActive:     z.boolean().optional(),
})

export type DepartmentRequestInput = z.infer<typeof departmentRequestSchema>

export const departmentFiltersSchema = z.object({
    activeOnly: z.boolean().optional(),
    search:     z.string().trim().max(100).optional(),
})

export type DepartmentFiltersInput = z.infer<typeof departmentFiltersSchema>