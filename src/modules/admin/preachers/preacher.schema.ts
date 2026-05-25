// ============================================================
// preacher.schema.ts
// ============================================================

import { z } from "zod";

// ── Schéma création / mise à jour ─────────────────────────────
export const preacherRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom est obligatoire")
    .max(150, "Le nom ne peut pas dépasser 150 caractères"),

  email: z
    .string()
    .trim()
    .min(1, "L'email est obligatoire")
    .max(150, "L'email ne peut pas dépasser 150 caractères")
    .email("L'email doit être valide"),

  origin: z
    .string()
    .trim()
    .min(1, "L'origine est obligatoire")
    .max(100, "L'origine ne peut pas dépasser 100 caractères"),

  telephone: z
    .string()
    .trim()
    .min(1, "Le téléphone est obligatoire")
    .max(30, "Le téléphone ne peut pas dépasser 30 caractères"),

  speciality: z
    .string()
    .trim()
    .min(1, "La spécialité est obligatoire")
    .max(150, "La spécialité ne peut pas dépasser 150 caractères"),
});

export type PreacherRequestSchema = z.infer<typeof preacherRequestSchema>;

// ── Schéma de réponse (validation données API) ────────────────
export const preacherResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  origin: z.string(),
  telephone: z.string(),
  speciality: z.string(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type PreacherResponseSchema = z.infer<typeof preacherResponseSchema>;

// ── Schéma des filtres ────────────────────────────────────────
// Note : le backend applique search > speciality > origin (priorité exclusive)
export const preacherFiltersSchema = z.object({
  search: z.string().trim().max(150).optional(),
  speciality: z.string().trim().max(150).optional(),
  origin: z.string().trim().max(100).optional(),
});

export type PreacherFiltersSchema = z.infer<typeof preacherFiltersSchema>;