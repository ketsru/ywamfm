// ============================================================
// publish-school.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import {
  PublishSchool,
  PublishSchoolRequest,
  PublishSchoolFilters,
  PublishSchoolBySchoolFilters,
} from "./publish-school.types";

const ENDPOINT = "/api/v1/schools/publications";

// ── CREATE ────────────────────────────────────────────────────
export const createPublishSchool = (data: PublishSchoolRequest): Promise<PublishSchool> =>
  post<PublishSchoolRequest, PublishSchool>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getPublishSchoolById = (id: string): Promise<PublishSchool> =>
  get<PublishSchool>(`${ENDPOINT}/${id}`);

// ── READ ALL (status | active | all) ─────────────────────────
// Priorité backend : status > active > all (if/else if exclusif)
export const getAllPublishSchools = (filters?: PublishSchoolFilters): Promise<PublishSchool[]> => {
  const params: Record<string, unknown> = {};

  if (filters?.status)      params.status = filters.status;
  else if (filters?.active) params.active = true;

  return get<PublishSchool[]>(ENDPOINT, params);
};

// ── READ BY SCHOOL ────────────────────────────────────────────
export const getPublishSchoolsBySchool = (
  schoolId: string,
  filters?: PublishSchoolBySchoolFilters
): Promise<PublishSchool[]> =>
  get<PublishSchool[]>(`${ENDPOINT}/school/${schoolId}`, {
    ...(filters?.status && { status: filters.status }),
  });

// ── READ BY PROMOTION ─────────────────────────────────────────
export const getPublishSchoolsByPromotion = (promotionId: string): Promise<PublishSchool[]> =>
  get<PublishSchool[]>(`${ENDPOINT}/promotion/${promotionId}`);

// ── UPDATE ────────────────────────────────────────────────────
export const updatePublishSchool = (id: string, data: PublishSchoolRequest): Promise<PublishSchool> =>
  put<PublishSchoolRequest, PublishSchool>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deletePublishSchool = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);