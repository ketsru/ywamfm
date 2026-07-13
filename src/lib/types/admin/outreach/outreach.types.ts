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
  id: string; 
  name: string;
  departmentId: string; 
  departmentName: string; 
  category: OutreachCategory;
  imageUrl?: string | null;
  status: OutreachStatus;
  createdAt: string; 
  updatedAt: string; 
}

export interface RegisterOutreachRequest {
  name: string;
  departmentId: string;
  category: OutreachCategory;
  image?: File | null; 
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