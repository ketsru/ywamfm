// @/lib/schemas/school/rapport/rapport.schema.ts

import { z } from "zod";

export const rapportRequestSchema = z.object({
  nomLivre:       z.string().min(1, "Le nom du livre est obligatoire").max(200),
  auteur:         z.string().min(1, "L'auteur est obligatoire").max(150),
  contenuRapport: z.string().min(1, "Le contenu du rapport est obligatoire"),
  schoolId:       z.string().uuid("École invalide"),
  studentId:      z.string().uuid().nullable().optional(),
});

export type RapportRequestInput = z.infer<typeof rapportRequestSchema>;