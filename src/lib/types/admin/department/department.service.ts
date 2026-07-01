// ============================================================
// department.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { DepartmentApiDto, DepartmentRequest, DepartmentFilters } from "./department.types";

const ENDPOINT = "/api/v1/departments";

// ── CREATE ────────────────────────────────────────────────────
export const createDepartment = (data: DepartmentRequest): Promise<DepartmentApiDto> =>
  post<DepartmentRequest, DepartmentApiDto>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getDepartmentById = (id: string): Promise<DepartmentApiDto> =>
  get<DepartmentApiDto>(`${ENDPOINT}/${id}`);

// ── READ ALL (avec filtres optionnels) ────────────────────────
export const getAllDepartments = (filters?: DepartmentFilters): Promise<DepartmentApiDto[]> =>
  get<DepartmentApiDto[]>(ENDPOINT, {
    ...(filters?.activeOnly     && { activeOnly: true }),
    ...(filters?.search?.trim() && { search: filters.search.trim() }),
  });

// ── UPDATE ────────────────────────────────────────────────────
export const updateDepartment = (id: string, data: DepartmentRequest): Promise<DepartmentApiDto> =>
  put<DepartmentRequest, DepartmentApiDto>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteDepartment = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);