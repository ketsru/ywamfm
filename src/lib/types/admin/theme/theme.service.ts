// ============================================================
// theme.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { ThemeResponseDto, ThemeRequest, ThemeFilters } from "./theme.types";

const ENDPOINT = "/api/v1/admin/themes";

// ── CREATE ────────────────────────────────────────────────────
export const createTheme = (data: ThemeRequest): Promise<ThemeResponseDto> =>
  post<ThemeRequest, ThemeResponseDto>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getThemeById = (id: string): Promise<ThemeResponseDto> =>
  get<ThemeResponseDto>(`${ENDPOINT}/${id}`);

// ── READ ALL (avec recherche optionnelle) ─────────────────────
export const getAllThemes = (filters?: ThemeFilters): Promise<ThemeResponseDto[]> =>
  get<ThemeResponseDto[]>(ENDPOINT, {
    ...(filters?.search?.trim() && { search: filters.search.trim() }),
  });

// ── UPDATE ────────────────────────────────────────────────────
export const updateTheme = (id: string, data: ThemeRequest): Promise<ThemeResponseDto> =>
  put<ThemeRequest, ThemeResponseDto>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteTheme = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);