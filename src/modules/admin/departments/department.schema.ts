// ============================================================
// department.schema.ts
// ============================================================
//
// Schémas de validation Zod alignés sur les contraintes
// du backend (DepartmentRequestDTO + DepartmentResponseDTO).
// ============================================================

import { z } from "zod";

// ── Schéma de création / mise à jour ─────────────────────────

export const departmentRequestSchema = z.object({
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

  /**
   * L'image est stockée en base64 (data-URI ou base64 brut).
   * On valide uniquement que c'est une chaîne non vide si fournie.
   */
  image: z
    .string()
    .min(1, "L'image ne peut pas être vide si fournie")
    .nullable()
    .optional(),

  isActive: z.boolean(),
});

export type DepartmentRequestSchema = z.infer<typeof departmentRequestSchema>;

// ── Schéma de réponse (validation données API) ────────────────

export const departmentResponseSchema = z.object({
  id: z.string().uuid("L'identifiant doit être un UUID valide"),
  name: z.string(),
  description: z.string().nullable().optional(),
  image: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type DepartmentResponseSchema = z.infer<typeof departmentResponseSchema>;

// ── Schéma des filtres de liste ───────────────────────────────

export const departmentFiltersSchema = z.object({
  activeOnly: z.boolean().optional(),
  search: z
    .string()
    .trim()
    .max(150, "La recherche ne peut pas dépasser 150 caractères")
    .optional(),
});

export type DepartmentFiltersSchema = z.infer<typeof departmentFiltersSchema>;

// ── Schéma d'upload image (validation côté formulaire) ────────

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