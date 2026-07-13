import { z } from "zod";
import { uuidSchema } from "@/lib/config/common.schema";

export const testimonyRequestSchema = z.object({
  domaine:  z.string().min(1, "Le domaine est obligatoire").max(150),
  content:  z.string().min(10, "Le contenu est trop court").max(5000),
  courseId: uuidSchema.nullable().optional(),
});

export type TestimonyRequestInput = z.infer<typeof testimonyRequestSchema>;