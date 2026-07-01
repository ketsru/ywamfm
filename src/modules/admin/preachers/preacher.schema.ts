// @/lib/schemas/school/preacher/preacher.schema.ts

import { z } from "zod"
import { emailSchema, phoneSchema } from "@/lib/config/common.schema"

const nameSchema = z
    .string()
    .min(1, "Le nom est requis")
    .max(150, "Le nom ne peut pas dépasser 150 caractères")
    .trim()

const originSchema = z
    .string()
    .min(1, "L'origine est requise")
    .max(100, "L'origine ne peut pas dépasser 100 caractères")
    .trim()

const specialitySchema = z
    .string()
    .min(1, "La spécialité est requise")
    .max(150, "La spécialité ne peut pas dépasser 150 caractères")
    .trim()

export const preacherRequestSchema = z.object({
    name:        nameSchema,
    email:       emailSchema,
    origin:      originSchema,
    telephone:   phoneSchema,
    speciality:  specialitySchema,
})

export type PreacherRequestInput = z.infer<typeof preacherRequestSchema>

export const preacherFiltersSchema = z.object({
    search:      z.string().trim().max(100).optional(),
    speciality:  z.string().trim().optional(),
    origin:      z.string().trim().optional(),
})

export type PreacherFiltersInput = z.infer<typeof preacherFiltersSchema>