// ============================================================
// department.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { Department, DepartmentRequest, DepartmentFilters } from "./department.types";

const ENDPOINT = "/api/v1/admin/departments";

// ── CREATE ────────────────────────────────────────────────────
export const createDepartment = (data: DepartmentRequest): Promise<Department> =>
  post<DepartmentRequest, Department>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getDepartmentById = (id: string): Promise<Department> =>
  get<Department>(`${ENDPOINT}/${id}`);

// ── READ ALL (avec filtres optionnels) ────────────────────────
export const getAllDepartments = (filters?: DepartmentFilters): Promise<Department[]> =>
  get<Department[]>(ENDPOINT, {
    ...(filters?.activeOnly                      && { activeOnly: true }),
    ...(filters?.search?.trim()                  && { search: filters.search.trim() }),
  });

// ── UPDATE ────────────────────────────────────────────────────
export const updateDepartment = (id: string, data: DepartmentRequest): Promise<Department> =>
  put<DepartmentRequest, Department>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteDepartment = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);