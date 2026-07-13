// ============================================================
// theme.hooks.ts
// ============================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllThemes,
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
} from "./theme.service";

import { mapApiToTheme, mapApiToThemeList } from "./theme.mapper";
import { ThemeFilters, ThemeRequest, ThemeResponseDto } from "./theme.types";

// ── Clés de cache ─────────────────────────────────────────────
export const themeKeys = {
  all: ["themes"] as const,
  lists: () => [...themeKeys.all, "list"] as const,
  list: (filters?: ThemeFilters) =>
    [...themeKeys.lists(), filters ?? {}] as const,
  details: () => [...themeKeys.all, "detail"] as const,
  detail: (id: string) => [...themeKeys.details(), id] as const,
};

// ── READ ALL ──────────────────────────────────────────────────

/**
 * @example
 * useThemesQuery()                        // tous les thèmes
 * useThemesQuery({ search: "evangelisme" }) // recherche par nom
 */
export function useThemesQuery(
  filters?: ThemeFilters
): UseQueryResult<ThemeResponseDto[], Error> {
  return useQuery({
    queryKey: themeKeys.list(filters),
    queryFn: async () => {
      const raw = await getAllThemes(filters);
      return mapApiToThemeList(raw as unknown as Record<string, unknown>[]);
    },
  });
}

// ── READ ONE ──────────────────────────────────────────────────
export function useThemeQuery(
  id: string | undefined
): UseQueryResult<ThemeResponseDto, Error> {
  return useQuery({
    queryKey: themeKeys.detail(id ?? ""),
    queryFn: async () => {
      const raw = await getThemeById(id!);
      return mapApiToTheme(raw as unknown as Record<string, unknown>);
    },
    enabled: Boolean(id),
  });
}

// ── CREATE ────────────────────────────────────────────────────
export function useCreateTheme(): UseMutationResult<
  ThemeResponseDto,
  Error,
  ThemeRequest
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ThemeRequest) => {
      const raw = await createTheme(data);
      return mapApiToTheme(raw as unknown as Record<string, unknown>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: themeKeys.lists() });
    },
  });
}

// ── UPDATE ────────────────────────────────────────────────────
export function useUpdateTheme(): UseMutationResult<
  ThemeResponseDto,
  Error,
  { id: string; data: ThemeRequest }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const raw = await updateTheme(id, data);
      return mapApiToTheme(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (_updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: themeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: themeKeys.detail(id) });
    },
  });
}

// ── DELETE ────────────────────────────────────────────────────
export function useDeleteTheme(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTheme(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: themeKeys.lists() });
    },
  });
}