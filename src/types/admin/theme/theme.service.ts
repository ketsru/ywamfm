// ============================================================
// theme.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { Theme, ThemeRequest, ThemeFilters } from "./theme.types";

const ENDPOINT = "/api/v1/admin/themes";

// ── CREATE ────────────────────────────────────────────────────
export const createTheme = (data: ThemeRequest): Promise<Theme> =>
  post<ThemeRequest, Theme>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getThemeById = (id: string): Promise<Theme> =>
  get<Theme>(`${ENDPOINT}/${id}`);

// ── READ ALL (avec recherche optionnelle) ─────────────────────
export const getAllThemes = (filters?: ThemeFilters): Promise<Theme[]> =>
  get<Theme[]>(ENDPOINT, {
    ...(filters?.search?.trim() && { search: filters.search.trim() }),
  });

// ── UPDATE ────────────────────────────────────────────────────
export const updateTheme = (id: string, data: ThemeRequest): Promise<Theme> =>
  put<ThemeRequest, Theme>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteTheme = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);