// ============================================================
// department.service.ts
// ============================================================

import { get, post, put, del, postFormData, putFormData, patchFormData } from "@/lib/api/core/apifetch";
import { buildMultipartFormData } from "@/lib/api/core/form-data.util";
import { DepartmentApiDto, DepartmentRequest, DepartmentFilters } from "./department.types";

const ENDPOINT = "/api/v1/departments";

// ── CREATE ────────────────────────────────────────────────────
// multipart obligatoire côté back (@RequestPart "data" + "image" optionnelle)
export const createDepartment = (data: DepartmentRequest): Promise<DepartmentApiDto> =>
  postFormData<DepartmentApiDto>(ENDPOINT, buildMultipartFormData(data));

// ── READ ONE ──────────────────────────────────────────────────
export const getDepartmentById = (id: string): Promise<DepartmentApiDto> =>
  get<DepartmentApiDto>(`${ENDPOINT}/${id}`);

// ── READ ALL (avec filtres optionnels) ────────────────────────
export const getAllDepartments = (filters?: DepartmentFilters): Promise<DepartmentApiDto[]> =>
  get<DepartmentApiDto[]>(ENDPOINT, {
    ...(filters?.activeOnly     && { activeOnly: true }),
    ...(filters?.search?.trim() && { search: filters.search.trim() }),
  });

// ── UPDATE (données + image en un seul appel) ──────────────────
export const updateDepartment = (id: string, data: DepartmentRequest): Promise<DepartmentApiDto> =>
  putFormData<DepartmentApiDto>(`${ENDPOINT}/${id}`, buildMultipartFormData(data));

// ── UPDATE IMAGE SEULE ──────────────────────────────────────────
// endpoint dédié : PATCH /{id}/image, image obligatoire (pas de "data")
export const updateDepartmentImage = (id: string, image: File): Promise<DepartmentApiDto> => {
  const formData = new FormData();
  formData.append("image", image);
  return patchFormData<DepartmentApiDto>(`${ENDPOINT}/${id}/image`, formData);
};

// ── DELETE ────────────────────────────────────────────────────
export const deleteDepartment = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);