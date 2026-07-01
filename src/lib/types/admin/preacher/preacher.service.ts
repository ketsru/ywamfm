// ============================================================
// preacher.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { Preacher, PreacherRequest, PreacherFilters } from "./preacher.types";

const ENDPOINT = "/api/v1/preachers";

// ── CREATE ────────────────────────────────────────────────────
export const createPreacher = (data: PreacherRequest): Promise<Preacher> =>
  post<PreacherRequest, Preacher>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getPreacherById = (id: string): Promise<Preacher> =>
  get<Preacher>(`${ENDPOINT}/${id}`);

// ── READ ALL (avec filtres) ───────────────────────────────────
// Priorité backend : search > speciality > origin > all
export const getAllPreachers = (filters?: PreacherFilters): Promise<Preacher[]> => {
  const params: Record<string, string> = {};

  if (filters?.search?.trim())          params.search     = filters.search.trim();
  else if (filters?.speciality?.trim()) params.speciality = filters.speciality.trim();
  else if (filters?.origin?.trim())     params.origin     = filters.origin.trim();

  return get<Preacher[]>(ENDPOINT, params);
};

// ── UPDATE ────────────────────────────────────────────────────
export const updatePreacher = (id: string, data: PreacherRequest): Promise<Preacher> =>
  put<PreacherRequest, Preacher>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deletePreacher = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);