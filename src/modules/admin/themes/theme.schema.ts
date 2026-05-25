// ============================================================
// theme.schema.ts
// ============================================================

import { z } from "zod";

// ── Schéma création / mise à jour ─────────────────────────────
export const themeRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom est obligatoire")
    .max(150, "Le nom ne peut pas dépasser 150 caractères"),

  description: z
    .string()
    .trim()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .nullable()
    .optional(),
});

export type ThemeRequestSchema = z.infer<typeof themeRequestSchema>;

// ── Schéma de réponse (validation données API) ────────────────
export const themeResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type ThemeResponseSchema = z.infer<typeof themeResponseSchema>;

// ── Schéma des filtres ────────────────────────────────────────
export const themeFiltersSchema = z.object({
  search: z
    .string()
    .trim()
    .max(150, "La recherche ne peut pas dépasser 150 caractères")
    .optional(),
});

export type ThemeFiltersSchema = z.infer<typeof themeFiltersSchema>;