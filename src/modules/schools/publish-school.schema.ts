// @/lib/schemas/school/publish-school/publish-school.schema.ts

import { z } from "zod"
import {
    uuidSchema,
    isoDatetimeSchema,
    optionalImageValueSchema,
    enumSchema,
    dateRangeRefinement,
    dateRangeRefinementMessage,
} from "@/lib/config/common.schema"
import { PublishSchoolStatus } from "@/lib/types/admin/publish-school/publish-school.types"

const locationSchema = z
    .string()
    .min(1, "Le lieu est requis")
    .max(200, "Le lieu ne peut pas dépasser 200 caractères")
    .trim()

const descriptionSchema = z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal(""))
    .nullable()

export const publishSchoolRequestSchema = z
    .object({
        schoolId:     uuidSchema,
        promotionId:  uuidSchema,
        startDate:    isoDatetimeSchema,
        endDate:      isoDatetimeSchema,
        location:     locationSchema,
        description:  descriptionSchema,
        image:        optionalImageValueSchema,
        status:       enumSchema(PublishSchoolStatus, "Veuillez sélectionner un statut"),
    })
    .refine(dateRangeRefinement, dateRangeRefinementMessage)

export type PublishSchoolRequestInput = z.infer<typeof publishSchoolRequestSchema>

export const publishSchoolFiltersSchema = z.object({
    status: enumSchema(PublishSchoolStatus).optional(),
    active: z.boolean().optional(),
})

export const publishSchoolBySchoolFiltersSchema = z.object({
    status: enumSchema(PublishSchoolStatus).optional(),
})

export type PublishSchoolFiltersInput = z.infer<typeof publishSchoolFiltersSchema>