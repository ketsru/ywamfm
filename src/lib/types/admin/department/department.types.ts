// ============================================================
// department.types.ts
// ============================================================

export interface DepartmentApiDto {
  id: string;
  name: string;
  description: string | null;
  image: string | null; // base64 pur, PAS de préfixe data:...
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string; // UUID
  name: string;
  description?: string | null;
  image: string; // base64 string (converti depuis byte[] backend)
  isActive: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface DepartmentRequest {
  name: string;
  description?: string | null;
  image?: string | null; // base64 ou null
  isActive?: boolean;
}

export interface DepartmentFilters {
  activeOnly?: boolean;
  search?: string;
}

export interface DepartmentState {
  departments: Department[];
  selectedDepartment: Department | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}