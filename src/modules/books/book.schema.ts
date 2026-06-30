// ============================================================
// book.schema.ts
// ============================================================

import { z } from "zod";

// ── Schéma création / mise à jour ─────────────────────────────
export const bookRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Le titre est obligatoire")
    .max(200, "Le titre ne peut pas dépasser 200 caractères"),

  author: z
    .string()
    .trim()
    .min(1, "L'auteur est obligatoire")
    .max(150, "Le nom de l'auteur ne peut pas dépasser 150 caractères"),

  summary: z
    .string()
    .trim()
    .max(1000, "Le résumé ne peut pas dépasser 1000 caractères")
    .nullable()
    .optional(),

  language: z
    .string()
    .trim()
    .min(1, "La langue est obligatoire")
    .max(50, "La langue ne peut pas dépasser 50 caractères"),

  image: z
    .string()
    .min(1, "L'image est obligatoire"),

  content: z
    .string()
    .trim()
    .nullable()
    .optional(),

  isActive: z.boolean(),
});

export type BookRequestSchema = z.infer<typeof bookRequestSchema>;

// ── Schéma de réponse (validation données API) ────────────────
export const bookResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  author: z.string(),
  summary: z.string().nullable().optional(),
  language: z.string(),
  image: z.string(),
  content: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type BookResponseSchema = z.infer<typeof bookResponseSchema>;

// ── Schéma des filtres ────────────────────────────────────────
export const bookFiltersSchema = z.object({
  activeOnly: z.boolean().optional(),
  title: z.string().trim().max(200).optional(),
  author: z.string().trim().max(150).optional(),
  language: z.string().trim().max(50).optional(),
});

export type BookFiltersSchema = z.infer<typeof bookFiltersSchema>;

// ── Schéma upload image ───────────────────────────────────────
export const imageFileSchema = z
  .instanceof(File, { message: "Veuillez sélectionner un fichier valide" })
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "L'image ne doit pas dépasser 5 Mo"
  )
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Format accepté : JPEG, PNG ou WebP"
  );