// ============================================================
// rapport.service.ts
// ============================================================

import { get, post, put, patch, del } from "@/lib/api/core/apifetch";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import {
  RapportResponseDto,
  RapportDetailResponseDto,
  RapportRequest,
  RapportGradeRequest,
} from "./rapport.types";

const ENDPOINT = "/api/v1/rapports";

// ── Self-service étudiant ───────────────────────────────────────

export const submitRapport = (data: RapportRequest): Promise<RapportDetailResponseDto> =>
  post<RapportRequest, RapportDetailResponseDto>(ENDPOINT, data);

export const getMyRapports = (
  schoolId?: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<RapportResponseDto>> =>
  get<PageResponseDto<RapportResponseDto>>(`${ENDPOINT}/me`, {
    ...(schoolId && { schoolId }),
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

export const getMyRapportById = (id: string): Promise<RapportDetailResponseDto> =>
  get<RapportDetailResponseDto>(`${ENDPOINT}/me/${id}`);

export const updateMyRapport = (id: string, data: RapportRequest): Promise<RapportDetailResponseDto> =>
  put<RapportRequest, RapportDetailResponseDto>(`${ENDPOINT}/me/${id}`, data);

export const deleteMyRapport = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/me/${id}`);

// ── Vue scopée staff/admin (ABAC) ───────────────────────────────

export const getAllRapports = (
  filters?: { schoolId?: string; studentId?: string; search?: string },
  pageRequest?: PageRequest
): Promise<PageResponseDto<RapportResponseDto>> =>
  get<PageResponseDto<RapportResponseDto>>(ENDPOINT, {
    ...(filters?.schoolId && { schoolId: filters.schoolId }),
    ...(filters?.studentId && { studentId: filters.studentId }),
    ...(filters?.search?.trim() && { search: filters.search.trim() }),
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

export const getRapportById = (id: string): Promise<RapportDetailResponseDto> =>
  get<RapportDetailResponseDto>(`${ENDPOINT}/${id}`);

// ── Notation par le superviseur ─────────────────────────────────

export const gradeRapport = (id: string, data: RapportGradeRequest): Promise<RapportDetailResponseDto> =>
  patch<RapportGradeRequest, RapportDetailResponseDto>(`${ENDPOINT}/${id}/grade`, data);

// ── Admin uniquement ─────────────────────────────────────────────

export const adminDeleteRapport = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);