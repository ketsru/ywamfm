// ============================================================
// publish-school.types.ts
// ============================================================

// ── Enum ──────────────────────────────────────────────────────

export const PublishSchoolStatus = {
  EN_ATTENTE: "EN_ATTENTE",
  ANNULEE: "ANNULEE",
  TERMINEE: "TERMINEE",
} as const;
export type PublishSchoolStatus =
  (typeof PublishSchoolStatus)[keyof typeof PublishSchoolStatus];

export const PUBLISH_SCHOOL_STATUS_LABELS: Record<PublishSchoolStatus, string> = {
  EN_ATTENTE: "En attente",
  ANNULEE: "Annulée",
  TERMINEE: "Terminée",
};

// ── Interfaces ────────────────────────────────────────────────

export interface PublishSchool {
  id: string; // UUID
  schoolId: string; // UUID
  schoolName: string; // issu de la projection
  promotionId: string; // UUID
  promotionName: string; // issu de la projection
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  location: string;
  description?: string | null;
  imageUrl?: string | null; 
  status: PublishSchoolStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface PublishSchoolRequest {
  schoolId: string;
  promotionId: string;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  location: string;
  description?: string | null;
  image?: File | null; 
  status: PublishSchoolStatus;
}

export interface PublishSchoolFilters {
  status?: PublishSchoolStatus;
  active?: boolean;
}

export interface PublishSchoolBySchoolFilters {
  status?: PublishSchoolStatus;
}

export interface PublishSchoolState {
  publishSchools: PublishSchool[];
  selectedPublishSchool: PublishSchool | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}