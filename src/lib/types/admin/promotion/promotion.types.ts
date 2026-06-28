// ============================================================
// promotion.types.ts
// ============================================================

export interface Promotion {
  id: string; // UUID
  schoolId: string; // UUID
  schoolName: string; // issu de la projection
  name: string;
  speciality: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface PromotionRequest {
  schoolId: string;
  name: string;
  speciality: string;
  description?: string | null;
  isActive?: boolean;
}

export interface PromotionFilters {
  activeOnly?: boolean;
}

export interface PromotionBySchoolFilters {
  activeOnly?: boolean;
}

export interface PromotionState {
  promotions: Promotion[];
  selectedPromotion: Promotion | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}