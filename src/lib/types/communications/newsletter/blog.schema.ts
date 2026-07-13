import { z } from "zod";
import { optionalImageValueSchema, enumSchema } from "@/lib/config/common.schema";
import { ArticleType } from "./blog.types";

export const articleRequestSchema = z.object({
  type:        enumSchema(ArticleType, "Veuillez sélectionner un type"),
  title:       z.string().min(1, "Le titre est obligatoire").max(255),
  excerpt:     z.string().min(1, "L'extrait est obligatoire"),
  imageAlt:    z.string().max(255).optional().nullable(),
  actionLabel: z.string().min(1, "Le libellé d'action est obligatoire").max(100),
  slug:        z.string()
                 .min(1, "Le slug est obligatoire")
                 .max(255)
                 .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (ex: mon-article)"),
  isPublish:   z.boolean().default(false),
  episode:     z.string().max(50).optional().nullable(),
  image:       optionalImageValueSchema,
});

export type ArticleRequestInput = z.infer<typeof articleRequestSchema>;