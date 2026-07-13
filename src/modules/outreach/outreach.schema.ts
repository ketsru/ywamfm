// @/lib/schemas/school/register-outreach/register-outreach.schema.ts

import { z } from "zod"
import { uuidSchema, imageValueSchema, enumSchema, optionalImageValueSchema } from "@/lib/config/common.schema"
import { OutreachCategory, OutreachStatus } from "@/lib/types/admin/outreach/outreach.types"

export const registerOutreachRequestSchema = z.object({
    name:         z.string().min(1, "Le nom est requis").max(200),
    departmentId: uuidSchema,
    category:     enumSchema(OutreachCategory, "Veuillez sélectionner une catégorie"),
    image:        optionalImageValueSchema,
    status:       enumSchema(OutreachStatus, "Veuillez sélectionner un statut"),
})

export type RegisterOutreachRequestInput = z.infer<typeof registerOutreachRequestSchema>

export const registerOutreachFiltersSchema = z.object({
    category: enumSchema(OutreachCategory).optional(),
    status:   enumSchema(OutreachStatus).optional(),
})

export type RegisterOutreachFiltersInput = z.infer<typeof registerOutreachFiltersSchema>

export const registerOutreachByDepartmentFiltersSchema = z.object({
    status: enumSchema(OutreachStatus).optional(),
})

export type RegisterOutreachByDepartmentFiltersInput = z.infer<
    typeof registerOutreachByDepartmentFiltersSchema>
