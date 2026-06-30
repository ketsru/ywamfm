// ============================================================
// publish-school.schema.ts
// ============================================================

import { PublishSchoolStatus } from "@/lib/types/admin/publish-school/publish-school.types";
import { z } from "zod";

// ── Enum Zod ──────────────────────────────────────────────────

export const publishSchoolStatusSchema = z.enum([
  PublishSchoolStatus.EN_ATTENTE,
  PublishSchoolStatus.ANNULEE,
  PublishSchoolStatus.TERMINEE,
]);

// ── Schéma création / mise à jour ─────────────────────────────
export const publishSchoolRequestSchema = z
  .object({
    schoolId: z
      .string()
      .uuid("L'identifiant de l'école doit être un UUID valide")
      .min(1, "L'école est obligatoire"),

    promotionId: z
      .string()
      .uuid("L'identifiant de la promotion doit être un UUID valide")
      .min(1, "La promotion est obligatoire"),

    startDate: z
      .string()
      .min(1, "La date de début est obligatoire")
      .datetime({ offset: true, message: "La date de début doit être une date valide" }),

    endDate: z
      .string()
      .min(1, "La date de fin est obligatoire")
      .datetime({ offset: true, message: "La date de fin doit être une date valide" }),

    location: z
      .string()
      .trim()
      .min(1, "Le lieu est obligatoire")
      .max(200, "Le lieu ne peut pas dépasser 200 caractères"),

    description: z
      .string()
      .trim()
      .max(5000, "La description ne peut pas dépasser 5000 caractères")
      .nullable()
      .optional(),

    image: z
      .string()
      .min(1, "L'image ne peut pas être vide si fournie")
      .nullable()
      .optional(),

    status: publishSchoolStatusSchema,
  })
  .superRefine((data, ctx) => {
    // La date de fin doit être après la date de début
    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La date de fin doit être postérieure à la date de début",
        path: ["endDate"],
      });
    }
  });

export type PublishSchoolRequestSchema = z.infer<
  typeof publishSchoolRequestSchema
>;

// ── Schéma de réponse (validation données API) ────────────────
export const publishSchoolResponseSchema = z.object({
  id: z.string().uuid(),
  schoolId: z.string().uuid(),
  schoolName: z.string(),
  promotionId: z.string().uuid(),
  promotionName: z.string(),
  startDate: z.string().datetime({ offset: true }),
  endDate: z.string().datetime({ offset: true }),
  location: z.string(),
  description: z.string().nullable().optional(),
  image: z.string(),
  status: publishSchoolStatusSchema,
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type PublishSchoolResponseSchema = z.infer<
  typeof publishSchoolResponseSchema
>;

// ── Schéma des filtres ────────────────────────────────────────
export const publishSchoolFiltersSchema = z.object({
  status: publishSchoolStatusSchema.optional(),
  active: z.boolean().optional(),
});

export type PublishSchoolFiltersSchema = z.infer<
  typeof publishSchoolFiltersSchema
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