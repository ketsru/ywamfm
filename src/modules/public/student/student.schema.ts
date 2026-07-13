// ============================================================
// student.schema.ts
// ============================================================

import { z } from "zod"
import { uuidSchema } from "@/lib/config/common.schema"
import { StudentStatus } from "@/lib/types/student/student.types"

/* ============================================================
   HELPERS LOCAUX
============================================================ */

// UUID optionnel : "" (rien sélectionné dans un <Select>) ou UUID valide.
const optionalUuidSchema = z
    .string()
    .uuid("Sélection invalide")
    .optional()
    .or(z.literal(""))

// Même remarque que pour StaffType (voir staff.schema.ts) : enumSchema()
// caste ses valeurs en `[string, ...string[]]` et sort donc un type `string`,
// pas `StudentStatus`. On reconstruit le tuple nous-mêmes pour préserver le
// typage exact (utile dès que studentStatusUpdateSchema est branché sur un
// formulaire typé StudentStatusUpdateFormValues).
const STUDENT_STATUS_VALUES = Object.values(StudentStatus) as [
    StudentStatus,
    ...StudentStatus[],
]

export const studentStatusSchema = z.enum(STUDENT_STATUS_VALUES, {
    error: "Statut invalide",
})

/* ============================================================
   INSCRIPTION (StudentRequestDto)
============================================================ */

export const studentRequestSchema = z.object({
    schoolId: uuidSchema,
    outreachId: optionalUuidSchema,
    objectif: z
        .string()
        .min(1, "L'objectif est requis")
        .max(1000, "1000 caractères maximum"),
    attente: z
        .string()
        .min(1, "Les attentes sont requises")
        .max(1000, "1000 caractères maximum"),
    // Renseigné uniquement par un admin inscrivant un tiers.
    userId: optionalUuidSchema,
})

export type StudentRequestFormValues = z.infer<typeof studentRequestSchema>

/* ============================================================
   MISE À JOUR DE STATUT (StudentStatusUpdateDto) — usage admin
============================================================ */

export const studentStatusUpdateSchema = z.object({
    status: studentStatusSchema,
})

export type StudentStatusUpdateFormValues = z.infer<
    typeof studentStatusUpdateSchema
>