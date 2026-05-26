// ============================================================
// promotion.schema.ts
// ============================================================

import { z } from "zod";

// ── Schéma création / mise à jour ─────────────────────────────
export const promotionRequestSchema = z.object({
  schoolId: z
    .string()
    .uuid("L'identifiant de l'école doit être un UUID valide")
    .min(1, "L'école est obligatoire"),

  name: z
    .string()
    .trim()
    .min(1, "Le nom de la promotion est obligatoire")
    .max(150, "Le nom ne peut pas dépasser 150 caractères"),

  speciality: z
    .string()
    .trim()
    .min(1, "La spécialité est obligatoire")
    .max(150, "La spécialité ne peut pas dépasser 150 caractères"),

  description: z
    .string()
    .trim()
    .max(150, "La description ne peut pas dépasser 150 caractères")
    .nullable()
    .optional(),

  isActive: z.boolean(),
});

export type PromotionRequestSchema = z.infer<typeof promotionRequestSchema>;

// ── Schéma de réponse (validation données API) ────────────────
export const promotionResponseSchema = z.object({
  id: z.string().uuid(),
  schoolId: z.string().uuid(),
  schoolName: z.string(),
  name: z.string(),
  speciality: z.string(),
  description: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type PromotionResponseSchema = z.infer<typeof promotionResponseSchema>;

// ── Schéma des filtres ────────────────────────────────────────
export const promotionFiltersSchema = z.object({
  activeOnly: z.boolean().optional(),
});

export type PromotionFiltersSchema = z.infer<typeof promotionFiltersSchema>;