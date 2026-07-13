// ============================================================
// register-school.types.ts
// ============================================================

// ── Enums (miroir des enums Java) ─────────────────────────────

export const SchoolType = {
  EN_PRESENTIELLE: "EN_PRESENTIELLE",
  EN_LIGNE: "EN_LIGNE",
} as const;
export type SchoolType = (typeof SchoolType)[keyof typeof SchoolType];

export const SchoolCategory = {
  PAYANTE: "PAYANTE",
  GRATUITE: "GRATUITE",
} as const;
export type SchoolCategory = (typeof SchoolCategory)[keyof typeof SchoolCategory];

export const SchoolStatus = {
  EN_ATTENTE: "EN_ATTENTE",
  EN_COURS: "EN_COURS",
  ANNULEE: "ANNULEE",
  TERMINEE: "TERMINEE",
} as const;
export type SchoolStatus = (typeof SchoolStatus)[keyof typeof SchoolStatus];

// ── Labels affichables (pour UI selects / badges) ─────────────

export const SCHOOL_TYPE_LABELS: Record<SchoolType, string> = {
  EN_PRESENTIELLE: "En présentiel",
  EN_LIGNE: "En ligne",
};

export const SCHOOL_CATEGORY_LABELS: Record<SchoolCategory, string> = {
  PAYANTE: "Payante",
  GRATUITE: "Gratuite",
};

export const SCHOOL_STATUS_LABELS: Record<SchoolStatus, string> = {
  EN_ATTENTE: "En attente",
  EN_COURS: "En cours",
  ANNULEE: "Annulée",
  TERMINEE: "Terminée",
};

// ── Interfaces ────────────────────────────────────────────────

export interface RegisterSchool {
  id: string; // UUID
  departmentId: string; // UUID
  departmentName: string; // issu de la projection
  name: string;
  type: SchoolType;
  category: SchoolCategory;
  image: string;
  price?: number | null;
  status: SchoolStatus;
  duration: number; // en jours
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface RegisterSchoolRequest {
  departmentId: string;
  name: string;
  type: SchoolType;
  category: SchoolCategory;
  image?: File | string | null;
  price?: number | null;
  status: SchoolStatus;
  duration: number;
}

export interface RegisterSchoolFilters {
  status?: SchoolStatus;
  type?: SchoolType;
  category?: SchoolCategory;
}

export interface RegisterSchoolState {
  schools: RegisterSchool[];
  selectedSchool: RegisterSchool | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}