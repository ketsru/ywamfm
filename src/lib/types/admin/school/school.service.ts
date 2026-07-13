// ============================================================
// register-school.service.ts
// ============================================================

import { get, del, postFormData, putFormData, patchFormData } from "@/lib/api/core/apifetch";
import { buildMultipartFormData } from "@/lib/api/core/form-data.util";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import {
  RegisterSchool,
  RegisterSchoolRequest,
  RegisterSchoolFilters,
} from "./school.types";

const ENDPOINT = "/api/v1/schools";

// ── CREATE ────────────────────────────────────────────────────
// multipart obligatoire côté back (@RequestPart "data" + "image" optionnelle)
export const createSchool = (data: RegisterSchoolRequest): Promise<RegisterSchool> =>
  postFormData<RegisterSchool>(ENDPOINT, buildMultipartFormData(data));

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
// Le backend ignore actuellement departmentId dans son filtrage réel — voir remarque.
export const getSchoolsByDepartment = (
  departmentId: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<RegisterSchool>> =>
  get<PageResponseDto<RegisterSchool>>(`${ENDPOINT}/department/${departmentId}`, {
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

// ── UPDATE (données + image en un seul appel) ──────────────────
export const updateSchool = (id: string, data: RegisterSchoolRequest): Promise<RegisterSchool> =>
  putFormData<RegisterSchool>(`${ENDPOINT}/${id}`, buildMultipartFormData(data));

// ── UPDATE IMAGE SEULE ───────────────────────────────────────────
// endpoint dédié : PATCH /{id}/image, image obligatoire (pas de "data")
export const updateSchoolImage = (id: string, image: File): Promise<RegisterSchool> => {
  const formData = new FormData();
  formData.append("image", image);
  return patchFormData<RegisterSchool>(`${ENDPOINT}/${id}/image`, formData);
};

// ── DELETE ────────────────────────────────────────────────────
export const deleteSchool = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);