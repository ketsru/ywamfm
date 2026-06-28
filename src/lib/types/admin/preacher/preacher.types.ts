// ============================================================
// preacher.types.ts
// ============================================================

export interface Preacher {
  id: string; // UUID
  name: string;
  email: string;
  origin: string;
  telephone: string;
  speciality: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface PreacherRequest {
  name: string;
  email: string;
  origin: string;
  telephone: string;
  speciality: string;
}

export interface PreacherFilters {
  search?: string;
  speciality?: string;
  origin?: string;
}

export interface PreacherState {
  preachers: Preacher[];
  selectedPreacher: Preacher | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}