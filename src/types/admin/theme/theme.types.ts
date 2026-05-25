// ============================================================
// theme.types.ts
// ============================================================

export interface Theme {
  id: string; // UUID
  name: string;
  description?: string | null;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface ThemeRequest {
  name: string;
  description?: string | null;
}

export interface ThemeFilters {
  search?: string;
}

export interface ThemeState {
  themes: Theme[];
  selectedTheme: Theme | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}