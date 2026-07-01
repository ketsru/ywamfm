// ============================================================
// register-outreach.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import {
  RegisterOutreach,
  RegisterOutreachRequest,
  RegisterOutreachFilters,
  RegisterOutreachByDepartmentFilters,
} from "./outreach.types";

const ENDPOINT = "/api/v1/outreaches";

// ── CREATE ────────────────────────────────────────────────────
export const createOutreach = (data: RegisterOutreachRequest): Promise<RegisterOutreach> =>
  post<RegisterOutreachRequest, RegisterOutreach>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getOutreachById = (id: string): Promise<RegisterOutreach> =>
  get<RegisterOutreach>(`${ENDPOINT}/${id}`);

// ── READ ALL (category + status combinés, ou all) + pagination ─
export const getAllOutreaches = (
  filters?: RegisterOutreachFilters,
  pageRequest?: PageRequest
): Promise<PageResponseDto<RegisterOutreach>> =>
  get<PageResponseDto<RegisterOutreach>>(ENDPOINT, {
    ...(filters?.category && { category: filters.category }),
    ...(filters?.status   && { status:   filters.status }),
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

// ── READ BY DEPARTMENT + pagination ─────────────────────────────
export const getOutreachesByDepartment = (
  departmentId: string,
  filters?: RegisterOutreachByDepartmentFilters,
  pageRequest?: PageRequest
): Promise<PageResponseDto<RegisterOutreach>> =>
  get<PageResponseDto<RegisterOutreach>>(`${ENDPOINT}/department/${departmentId}`, {
    ...(filters?.status && { status: filters.status }),
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

// ── UPDATE ────────────────────────────────────────────────────
export const updateOutreach = (id: string, data: RegisterOutreachRequest): Promise<RegisterOutreach> =>
  put<RegisterOutreachRequest, RegisterOutreach>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteOutreach = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);