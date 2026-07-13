// @/lib/schemas/school/book/book.schema.ts

import { z } from "zod"
import { optionalImageValueSchema } from "@/lib/config/common.schema"

const titleSchema = z
  .string()
  .min(1, "Le titre est requis")
  .max(200, "Le titre ne peut pas dépasser 200 caractères")
  .trim()

const authorSchema = z
  .string()
  .min(1, "L'auteur est requis")
  .max(150, "Le nom de l'auteur ne peut pas dépasser 150 caractères")
  .trim()

const languageSchema = z
  .string()
  .min(1, "La langue est requise")
  .trim()

const summarySchema = z
  .string()
  .max(2000, "Le résumé ne peut pas dépasser 2000 caractères")
  .optional()
  .or(z.literal(""))
  .nullable()

const contentSchema = z
  .string()
  .max(100_000, "Le contenu ne peut pas dépasser 100 000 caractères")
  .optional()
  .or(z.literal(""))
  .nullable()

export const bookRequestSchema = z.object({
  title:     titleSchema,
  author:    authorSchema,
  summary:   summarySchema,
  language:  languageSchema,
  image:     optionalImageValueSchema, // image optionnelle comme pour Department
  content:   contentSchema,
  isActive:  z.boolean().optional(),
})

export type BookRequestInput = z.infer<typeof bookRequestSchema>

export const bookFiltersSchema = z.object({
  activeOnly: z.boolean().optional(),
  title:      z.string().trim().max(100).optional(),
  author:     z.string().trim().max(100).optional(),
  language:   z.string().trim().optional(),
})

export type BookFiltersInput = z.infer<typeof bookFiltersSchema>
