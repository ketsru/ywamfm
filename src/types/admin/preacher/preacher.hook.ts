// ============================================================
// preacher.hooks.ts
// ============================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllPreachers,
  getPreacherById,
  createPreacher,
  updatePreacher,
  deletePreacher,
} from "./preacher.service";

import { mapApiToPreacher, mapApiToPreacherList } from "./preacher.mapper";
import { Preacher, PreacherFilters, PreacherRequest } from "./preacher.types";

// ── Clés de cache ─────────────────────────────────────────────
export const preacherKeys = {
  all: ["preachers"] as const,
  lists: () => [...preacherKeys.all, "list"] as const,
  list: (filters?: PreacherFilters) =>
    [...preacherKeys.lists(), filters ?? {}] as const,
  details: () => [...preacherKeys.all, "detail"] as const,
  detail: (id: string) => [...preacherKeys.details(), id] as const,
};

// ── READ ALL ──────────────────────────────────────────────────

/**
 * @example
 * usePreachersQuery({ search: "Jean" })
 * usePreachersQuery({ speciality: "evangelisme" })
 * usePreachersQuery({ origin: "Togo" })
 */
export function usePreachersQuery(
  filters?: PreacherFilters
): UseQueryResult<Preacher[], Error> {
  return useQuery({
    queryKey: preacherKeys.list(filters),
    queryFn: async () => {
      const raw = await getAllPreachers(filters);
      return mapApiToPreacherList(raw as unknown as Record<string, unknown>[]);
    },
  });
}

// ── READ ONE ──────────────────────────────────────────────────
export function usePreacherQuery(
  id: string | undefined
): UseQueryResult<Preacher, Error> {
  return useQuery({
    queryKey: preacherKeys.detail(id ?? ""),
    queryFn: async () => {
      const raw = await getPreacherById(id!);
      return mapApiToPreacher(raw as unknown as Record<string, unknown>);
    },
    enabled: Boolean(id),
  });
}

// ── CREATE ────────────────────────────────────────────────────
export function useCreatePreacher(): UseMutationResult<
  Preacher,
  Error,
  PreacherRequest
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PreacherRequest) => {
      const raw = await createPreacher(data);
      return mapApiToPreacher(raw as unknown as Record<string, unknown>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: preacherKeys.lists() });
    },
  });
}

// ── UPDATE ────────────────────────────────────────────────────
export function useUpdatePreacher(): UseMutationResult<
  Preacher,
  Error,
  { id: string; data: PreacherRequest }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const raw = await updatePreacher(id, data);
      return mapApiToPreacher(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (_updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: preacherKeys.lists() });
      queryClient.invalidateQueries({ queryKey: preacherKeys.detail(id) });
    },
  });
}

// ── DELETE ────────────────────────────────────────────────────
export function useDeletePreacher(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePreacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: preacherKeys.lists() });
    },
  });
}