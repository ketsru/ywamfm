// ============================================================
// register-outreach.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import {
  RegisterOutreach,
  RegisterOutreachRequest,
  RegisterOutreachFilters,
  RegisterOutreachByDepartmentFilters,
} from "./outreach.types";

const ENDPOINT = "/api/v1/admin/outreach";

// ── CREATE ────────────────────────────────────────────────────
export const createOutreach = (data: RegisterOutreachRequest): Promise<RegisterOutreach> =>
  post<RegisterOutreachRequest, RegisterOutreach>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getOutreachById = (id: string): Promise<RegisterOutreach> =>
  get<RegisterOutreach>(`${ENDPOINT}/${id}`);

// ── READ ALL (category + status combinés, ou all) ─────────────
export const getAllOutreaches = (filters?: RegisterOutreachFilters): Promise<RegisterOutreach[]> =>
  get<RegisterOutreach[]>(ENDPOINT, {
    ...(filters?.category && { category: filters.category }),
    ...(filters?.status   && { status:   filters.status }),
  });

// ── READ BY DEPARTMENT ────────────────────────────────────────
export const getOutreachesByDepartment = (
  departmentId: string,
  filters?: RegisterOutreachByDepartmentFilters
): Promise<RegisterOutreach[]> =>
  get<RegisterOutreach[]>(`${ENDPOINT}/department/${departmentId}`, {
    ...(filters?.status && { status: filters.status }),
  });

// ── UPDATE ────────────────────────────────────────────────────
export const updateOutreach = (id: string, data: RegisterOutreachRequest): Promise<RegisterOutreach> =>
  put<RegisterOutreachRequest, RegisterOutreach>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteOutreach = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);