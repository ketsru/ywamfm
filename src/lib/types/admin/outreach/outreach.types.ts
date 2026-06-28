// ============================================================
// register-outreach.types.ts
// ============================================================

// ── Enums ─────────────────────────────────────────────────────

export const OutreachCategory = {
  ECOLE: "ECOLE",
  INDEPENDANT: "INDEPENDANT",
} as const;
export type OutreachCategory =
  (typeof OutreachCategory)[keyof typeof OutreachCategory];

export const OutreachStatus = {
  EN_ATTENTE: "EN_ATTENTE",
  ANNULEE: "ANNULEE",
  TERMINEE: "TERMINEE",
} as const;
export type OutreachStatus =
  (typeof OutreachStatus)[keyof typeof OutreachStatus];

// ── Labels affichables ────────────────────────────────────────

export const OUTREACH_CATEGORY_LABELS: Record<OutreachCategory, string> = {
  ECOLE: "École",
  INDEPENDANT: "Indépendant",
};

export const OUTREACH_STATUS_LABELS: Record<OutreachStatus, string> = {
  EN_ATTENTE: "En attente",
  ANNULEE: "Annulée",
  TERMINEE: "Terminée",
};

// ── Interfaces ────────────────────────────────────────────────

export interface RegisterOutreach {
  id: string; // UUID
  departmentId: string; // UUID
  departmentName: string; // issu de la projection
  category: OutreachCategory;
  image: string; // base64 data-URI (converti depuis byte[] backend)
  status: OutreachStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface RegisterOutreachRequest {
  departmentId: string;
  category: OutreachCategory;
  image: string; // base64 brut (sans préfixe data-URI)
  status: OutreachStatus;
}

export interface RegisterOutreachFilters {
  category?: OutreachCategory;
  status?: OutreachStatus;
}

export interface RegisterOutreachByDepartmentFilters {
  status?: OutreachStatus;
}

export interface RegisterOutreachState {
  outreaches: RegisterOutreach[];
  selectedOutreach: RegisterOutreach | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}