// ============================================================
// register-school.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import {
  RegisterSchool,
  RegisterSchoolRequest,
  RegisterSchoolFilters,
} from "./school.types";

const ENDPOINT = "/api/v1/admin/schools";

// ── CREATE ────────────────────────────────────────────────────
export const createSchool = (data: RegisterSchoolRequest): Promise<RegisterSchool> =>
  post<RegisterSchoolRequest, RegisterSchool>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getSchoolById = (id: string): Promise<RegisterSchool> =>
  get<RegisterSchool>(`${ENDPOINT}/${id}`);

// ── READ ALL (filtres : status | type+category | aucun) ───────
// Priorité backend : status > type+category > all
export const getAllSchools = (filters?: RegisterSchoolFilters): Promise<RegisterSchool[]> => {
  const params: Record<string, unknown> = {};

  if (filters?.status) {
    params.status = filters.status;
  } else if (filters?.type && filters?.category) {
    params.type     = filters.type;
    params.category = filters.category;
  }

  return get<RegisterSchool[]>(ENDPOINT, params);
};

// ── READ BY DEPARTMENT ────────────────────────────────────────
export const getSchoolsByDepartment = (departmentId: string): Promise<RegisterSchool[]> =>
  get<RegisterSchool[]>(`${ENDPOINT}/department/${departmentId}`);

// ── UPDATE ────────────────────────────────────────────────────
export const updateSchool = (id: string, data: RegisterSchoolRequest): Promise<RegisterSchool> =>
  put<RegisterSchoolRequest, RegisterSchool>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteSchool = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);