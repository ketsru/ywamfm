// ============================================================
// register-school.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import {
  RegisterSchool,
  RegisterSchoolRequest,
  RegisterSchoolFilters,
} from "./school.types";

const ENDPOINT = "/api/v1/schools";

// ── CREATE ────────────────────────────────────────────────────
export const createSchool = (data: RegisterSchoolRequest): Promise<RegisterSchool> =>
  post<RegisterSchoolRequest, RegisterSchool>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getSchoolById = (id: string): Promise<RegisterSchool> =>
  get<RegisterSchool>(`${ENDPOINT}/${id}`);

// ── READ ALL (filtres combinables + pagination) ────────────────
export const getAllSchools = (
  filters?: RegisterSchoolFilters,
  pageRequest?: PageRequest
): Promise<PageResponseDto<RegisterSchool>> => {
  const params: Record<string, unknown> = {
    ...(filters?.status   && { status:   filters.status }),
    ...(filters?.type     && { type:     filters.type }),
    ...(filters?.category && { category: filters.category }),
    ...(pageRequest?.page  !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size  !== undefined && { size: pageRequest.size }),
  };

  return get<PageResponseDto<RegisterSchool>>(ENDPOINT, params);
};

// ── READ BY DEPARTMENT ────────────────────────────────────────
// ⚠️ Le backend ignore actuellement departmentId dans son filtrage réel — voir remarque.
export const getSchoolsByDepartment = (
  departmentId: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<RegisterSchool>> =>
  get<PageResponseDto<RegisterSchool>>(`${ENDPOINT}/department/${departmentId}`, {
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

// ── UPDATE ────────────────────────────────────────────────────
export const updateSchool = (id: string, data: RegisterSchoolRequest): Promise<RegisterSchool> =>
  put<RegisterSchoolRequest, RegisterSchool>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteSchool = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);