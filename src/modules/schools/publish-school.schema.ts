// @/lib/schemas/school/publish-school/publish-school.schema.ts

import { z } from "zod"
import { optionalImageValueSchema } from "@/lib/config/common.schema"
import { PublishSchoolStatus } from "@/lib/types/admin/publish-school/publish-school.types"

const publishSchoolStatusValues = Object.values(PublishSchoolStatus) as [
  PublishSchoolStatus,
  ...PublishSchoolStatus[]
]

const promotionIdSchema = z
    .string()
    .min(1, "La promotion est requise")

const dateSchema = z
    .string()
    .min(1, "La date est requise")

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

// schoolId est fixé par le contexte (l'école qu'on publie), pas un champ du formulaire —
// il est injecté par le dialog, pas par l'utilisateur.
export const publishSchoolRequestSchema = z
  .object({
    promotionId: promotionIdSchema,
    startDate:   dateSchema,
    endDate:     dateSchema,
    location:    locationSchema,
    description: descriptionSchema,
    status:      z.enum(publishSchoolStatusValues),
    image:       optionalImageValueSchema, // optionnel d'après PublishSchoolRequest
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "La date de fin doit être postérieure à la date de début.",
    path: ["endDate"],
  })

export type PublishSchoolRequestInput = z.infer<typeof publishSchoolRequestSchema>

export const publishSchoolFiltersSchema = z.object({
  status: z.enum(publishSchoolStatusValues).optional(),
  active: z.boolean().optional(),
})

export type PublishSchoolFiltersInput = z.infer<typeof publishSchoolFiltersSchema>