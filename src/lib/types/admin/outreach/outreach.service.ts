// ============================================================
// register-outreach.service.ts
// ============================================================

import { get, del, postFormData, putFormData, patchFormData } from "@/lib/api/core/apifetch";
import { buildMultipartFormData } from "@/lib/api/core/form-data.util";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import {
  RegisterOutreach,
  RegisterOutreachRequest,
  RegisterOutreachFilters,
  RegisterOutreachByDepartmentFilters,
} from "./outreach.types";

const ENDPOINT = "/api/v1/outreaches";

// ── CREATE ────────────────────────────────────────────────────
// multipart obligatoire côté back (@RequestPart "data" + "image" optionnelle)
export const createOutreach = (data: RegisterOutreachRequest): Promise<RegisterOutreach> =>
  postFormData<RegisterOutreach>(ENDPOINT, buildMultipartFormData(data));

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

// ── UPDATE (données + image en un seul appel) ──────────────────
export const updateOutreach = (id: string, data: RegisterOutreachRequest): Promise<RegisterOutreach> =>
  putFormData<RegisterOutreach>(`${ENDPOINT}/${id}`, buildMultipartFormData(data));

// ── UPDATE IMAGE SEULE ───────────────────────────────────────────
// endpoint dédié : PATCH /{id}/image, image obligatoire (pas de "data")
export const updateOutreachImage = (id: string, image: File): Promise<RegisterOutreach> => {
  const formData = new FormData();
  formData.append("image", image);
  return patchFormData<RegisterOutreach>(`${ENDPOINT}/${id}/image`, formData);
};

// ── DELETE ────────────────────────────────────────────────────
export const deleteOutreach = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);