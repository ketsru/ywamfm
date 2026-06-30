// ============================================================
// register-school.schema.ts
// ============================================================

import { z } from "zod";
import { SchoolType, SchoolCategory, SchoolStatus } from "@/lib/types/admin/school/school.types";

// ── Enums Zod (alignés sur les enums Java) ────────────────────

export const schoolTypeSchema = z.enum([
  SchoolType.EN_PRESENTIELLE,
  SchoolType.EN_LIGNE,
]);

export const schoolCategorySchema = z.enum([
  SchoolCategory.PAYANTE,
  SchoolCategory.GRATUITE,
]);

export const schoolStatusSchema = z.enum([
  SchoolStatus.EN_ATTENTE,
  SchoolStatus.EN_COURS,
  SchoolStatus.ANNULEE,
  SchoolStatus.TERMINEE,
]);

// ── Schéma création / mise à jour ─────────────────────────────
export const registerSchoolRequestSchema = z
  .object({
    departmentId: z
      .string()
      .uuid("L'identifiant du département doit être un UUID valide")
      .min(1, "Le département est obligatoire"),

    name: z
      .string()
      .trim()
      .min(1, "Le nom de l'école est obligatoire")
      .max(200, "Le nom ne peut pas dépasser 200 caractères"),

    type: schoolTypeSchema.refine((v) => !!v, {
      message: "Le type d'école est obligatoire",
    }),

    category: schoolCategorySchema.refine((v) => !!v, {
      message: "La catégorie est obligatoire",
    }),

    // Le prix est obligatoire uniquement si category === PAYANTE
    price: z
      .number()
      .positive("Le prix doit être positif")
      .nullable()
      .optional(),

    status: schoolStatusSchema.refine((v) => !!v, {
      message: "Le statut est obligatoire",
    }),

    duration: z
      .number()
      .int("La durée doit être un entier")
      .positive("La durée doit être supérieure à 0"),
  })
  .superRefine((data, ctx) => {
    // Le prix est requis si l'école est payante
    if (data.category === SchoolCategory.PAYANTE && !data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le prix est obligatoire pour une école payante",
        path: ["price"],
      });
    }
    // Le prix doit être null/absent si l'école est gratuite
    if (data.category === SchoolCategory.GRATUITE && data.price != null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Une école gratuite ne peut pas avoir de prix",
        path: ["price"],
      });
    }
  });

export type RegisterSchoolRequestSchema = z.infer<
  typeof registerSchoolRequestSchema
>;

// ── Schéma de réponse (validation données API) ────────────────
export const registerSchoolResponseSchema = z.object({
  id: z.string().uuid(),
  departmentId: z.string().uuid(),
  departmentName: z.string(),
  name: z.string(),
  type: schoolTypeSchema,
  category: schoolCategorySchema,
  price: z.number().nullable().optional(),
  status: schoolStatusSchema,
  duration: z.number().int().positive(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type RegisterSchoolResponseSchema = z.infer<
  typeof registerSchoolResponseSchema
>;

// ── Schéma des filtres ────────────────────────────────────────
export const registerSchoolFiltersSchema = z.object({
  status: schoolStatusSchema.optional(),
  type: schoolTypeSchema.optional(),
  category: schoolCategorySchema.optional(),
});

export type RegisterSchoolFiltersSchema = z.infer<
  typeof registerSchoolFiltersSchema
>;