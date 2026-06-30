// src/lib/schemas/user.schema.ts

import * as z from "zod"

export const userFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Adresse email invalide"),
  roleId: z.string().min(1, "Veuillez sélectionner un rôle"),
  avatar: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "L'image ne doit pas dépasser 5 Mo"
    )
    .refine(
      (file) =>
        !file || ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      "Format accepté : PNG, JPEG ou WEBP"
    ),
})

export type UserFormValues = z.infer<typeof userFormSchema>