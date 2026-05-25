// ============================================================
// theme.mapper.ts
// ============================================================

import { Theme, ThemeRequest } from "./theme.types";

// ── Réponse API → type frontend ───────────────────────────────

export function mapApiToTheme(raw: Record<string, unknown>): Theme {
  return {
    id: raw.id as string,
    name: raw.name as string,
    description: (raw.description as string | null) ?? null,
    createdAt: raw.createdAt as string,
    updatedAt: raw.updatedAt as string,
  };
}

export function mapApiToThemeList(rawList: Record<string, unknown>[]): Theme[] {
  return rawList.map(mapApiToTheme);
}

// ── Type frontend → requête API ───────────────────────────────

export function mapToThemeApiRequest(
  data: Partial<Theme> & { name: string }
): ThemeRequest {
  return {
    name: data.name.trim(),
    description: data.description?.trim() ?? null,
  };
}