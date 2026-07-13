// ============================================================
// staff-profile.mapper.ts
// ============================================================

import { Page, PageResponseDto } from "@/lib/api/core/api.types";
import {
  MaritalStatus,
  Sexe,
  StaffProfileResponseDto,
  StaffType,
} from "./staff.types";

// ── Libellés (source unique de vérité pour l'affichage) ─────────

export const STAFF_TYPE_LABELS: Record<StaffType, string> = {
  [StaffType.PLEIN_TEMPS]: "Plein temps",
  [StaffType.TEMPS_PARTIEL]: "Temps partiel",
};

export const SEXE_LABELS: Record<Sexe, string> = {
  [Sexe.M]: "Homme",
  [Sexe.F]: "Femme",
};

export const MARITAL_STATUS_LABELS: Record<MaritalStatus, string> = {
  [MaritalStatus.SINGLE]: "Célibataire",
  [MaritalStatus.MARRIED]: "Marié(e)",
  [MaritalStatus.DIVORCED]: "Divorcé(e)",
  [MaritalStatus.WIDOWED]: "Veuf/Veuve",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

// ── DTO API → modèle d'affichage ────────────────────────────────

export interface StaffProfileDisplay extends StaffProfileResponseDto {
  typeLabel: string;
  initials: string;
  debutLabel: string;
  finLabel: string;
  /** Recalculée côté frontend si le back ne l'a pas fournie. */
  durationDaysComputed: number;
  parcoursLabel: string;
  ywamParcoursLabel: string;
}

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

/** Nombre de jours entre deux dates ISO (LocalDate, sans heure). */
function computeDurationDays(debut: string, fin: string): number {
  const start = new Date(debut).getTime();
  const end = new Date(fin).getTime();
  return Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
}

export function toStaffProfileDisplay(
  dto: StaffProfileResponseDto
): StaffProfileDisplay {
  return {
    ...dto,
    typeLabel: STAFF_TYPE_LABELS[dto.type],
    initials: getInitials(dto.userFullName),
    debutLabel: dateFormatter.format(new Date(dto.debut)),
    finLabel: dateFormatter.format(new Date(dto.fin)),
    durationDaysComputed: dto.durationDays ?? computeDurationDays(dto.debut, dto.fin),
    parcoursLabel: dto.decisionParcours ? "Validé" : "En attente",
    ywamParcoursLabel: dto.ywamDecisionParcours ? "Validé" : "En attente",
  };
}

export function toStaffProfileDisplayList(
  dtos: StaffProfileResponseDto[]
): StaffProfileDisplay[] {
  return dtos.map(toStaffProfileDisplay);
}

// ── Formulaire → DTO API ──────────────────────────────────────

export interface StaffProfileFormValues {
  departmentId: string;
  type: StaffType;
  debut: string;
  fin: string;
  objectif: string;
  attente: string;
  decisionParcours?: boolean;
  parcoursList?: string | null;
  ywamDecisionParcours?: boolean;
  ywamParcoursList?: string | null;
  userId?: string | null;
}

export function toStaffProfileRequestDto(values: StaffProfileFormValues) {
  return {
    departmentId: values.departmentId,
    type: values.type,
    debut: values.debut,
    fin: values.fin,
    objectif: values.objectif.trim(),
    attente: values.attente.trim(),
    decisionParcours: values.decisionParcours ?? false,
    parcoursList: values.parcoursList?.trim() || null,
    ywamDecisionParcours: values.ywamDecisionParcours ?? false,
    ywamParcoursList: values.ywamParcoursList?.trim() || null,
    userId: values.userId?.trim() || null,
  };
}

// ── Pagination : PageResponseDto (Spring) → Page (frontend) ─────

export function toPage<T>(dto: PageResponseDto<T>): Page<T> {
  return {
    items: dto.content,
    total: dto.totalElements,
    page: dto.page,
    size: dto.size,
  };
}