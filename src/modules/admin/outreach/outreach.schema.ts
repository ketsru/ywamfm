// ============================================================
// register-outreach.schema.ts
// ============================================================

import { z } from "zod";
import { OutreachCategory, OutreachStatus } from "@/types/admin/outreach/outreach.types";

// ── Enums Zod ─────────────────────────────────────────────────

export const outreachCategorySchema = z.enum([
  OutreachCategory.ECOLE,
  OutreachCategory.INDEPENDANT,
]);

export const outreachStatusSchema = z.enum([
  OutreachStatus.EN_ATTENTE,
  OutreachStatus.ANNULEE,
  OutreachStatus.TERMINEE,
]);

// ── Schéma création / mise à jour ─────────────────────────────
export const registerOutreachRequestSchema = z.object({
  departmentId: z
    .string()
    .uuid("L'identifiant du département doit être un UUID valide")
    .min(1, "Le département est obligatoire"),

  category: outreachCategorySchema,

  image: z.string().min(1, "L'image est obligatoire"),

  status: outreachStatusSchema,
});

export type RegisterOutreachRequestSchema = z.infer<
  typeof registerOutreachRequestSchema
>;

// ── Schéma de réponse (validation données API) ────────────────
export const registerOutreachResponseSchema = z.object({
  id: z.string().uuid(),
  departmentId: z.string().uuid(),
  departmentName: z.string(),
  category: outreachCategorySchema,
  image: z.string(),
  status: outreachStatusSchema,
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type RegisterOutreachResponseSchema = z.infer<
  typeof registerOutreachResponseSchema
>;

// ── Schéma des filtres ────────────────────────────────────────
// Note : le backend ne filtre que si category ET status sont fournis ensemble
export const registerOutreachFiltersSchema = z.object({
  category: outreachCategorySchema.optional(),
  status: outreachStatusSchema.optional(),
});

export type RegisterOutreachFiltersSchema = z.infer<
  typeof registerOutreachFiltersSchema
>;

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