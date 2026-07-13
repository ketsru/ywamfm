// ============================================================
// student.mapper.ts
// ============================================================
// Transforme les DTOs bruts de l'API en modèles prêts pour l'UI,
// et les valeurs de formulaire en DTOs prêts pour l'API.

import { Page, PageResponseDto } from "@/lib/api/core/api.types";
import { StudentResponseDto, StudentStatus } from "./student.types";

// ── Libellés & styles de statut (source unique de vérité) ──────

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  [StudentStatus.PENDING]: "En attente",
  [StudentStatus.VALIDATED]: "Validée",
  [StudentStatus.REJECTED]: "Refusée",
  [StudentStatus.ACTIVE]: "En cours",
  [StudentStatus.COMPLETED]: "Terminée",
  [StudentStatus.DROPPED]: "Abandonnée",
};

export const STUDENT_STATUS_BADGE_VARIANT: Record<
  StudentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [StudentStatus.PENDING]: "secondary",
  [StudentStatus.VALIDATED]: "default",
  [StudentStatus.REJECTED]: "destructive",
  [StudentStatus.ACTIVE]: "default",
  [StudentStatus.COMPLETED]: "outline",
  [StudentStatus.DROPPED]: "destructive",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

// ── DTO API → modèle d'affichage ────────────────────────────────

/**
 * Vue enrichie d'un StudentResponseDto : ajoute les libellés/variantes
 * de statut et les dates déjà formatées, pour éviter de recalculer
 * cette logique dans chaque composant (StudentCard, tableau admin...).
 */
export interface StudentDisplay extends StudentResponseDto {
  statusLabel: string;
  statusBadgeVariant: "default" | "secondary" | "destructive" | "outline";
  initials: string;
  createdAtLabel: string;
}

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

export function toStudentDisplay(dto: StudentResponseDto): StudentDisplay {
  return {
    ...dto,
    statusLabel: STUDENT_STATUS_LABELS[dto.status],
    statusBadgeVariant: STUDENT_STATUS_BADGE_VARIANT[dto.status],
    initials: getInitials(dto.userFullName),
    createdAtLabel: dateFormatter.format(new Date(dto.createdAt)),
  };
}

export function toStudentDisplayList(
  dtos: StudentResponseDto[]
): StudentDisplay[] {
  return dtos.map(toStudentDisplay);
}

// ── Formulaire d'inscription → DTO API ───────────────────────────

/** Valeurs typiques d'un formulaire d'inscription public ("Enroll Now"). */
export interface EnrollmentFormValues {
  schoolId: string;
  outreachId?: string | null;
  objectif: string;
  attente: string;
  /** Renseigné uniquement lorsqu'un admin inscrit un étudiant pour un tiers. */
  userId?: string | null;
}

export function toStudentRequestDto(values: EnrollmentFormValues) {
  return {
    schoolId: values.schoolId,
    outreachId: values.outreachId?.trim() || null,
    objectif: values.objectif.trim(),
    attente: values.attente.trim(),
    userId: values.userId?.trim() || null,
  };
}

// ── Pagination : PageResponseDto (Spring) → Page (frontend) ─────

/**
 * Convertit la pagination "façon Spring" (`content`, `totalElements`...)
 * vers le format `Page<T>` générique attendu par le reste du frontend
 * (`items`, `total`...), afin que les composants de pagination restent
 * indépendants du back.
 */
export function toPage<T>(dto: PageResponseDto<T>): Page<T> {
  return {
    items: dto.content,
    total: dto.totalElements,
    page: dto.page,
    size: dto.size,
  };
}