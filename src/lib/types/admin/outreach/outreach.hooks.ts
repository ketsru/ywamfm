// ============================================================
// register-outreach.hooks.ts
// ============================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllOutreaches,
  getOutreachById,
  getOutreachesByDepartment,
  createOutreach,
  updateOutreach,
  deleteOutreach,
} from "./outreach.service";

import { mapApiToOutreach, mapApiToOutreachList } from "./outreach.mapper";
import {
  RegisterOutreach,
  RegisterOutreachFilters,
  RegisterOutreachByDepartmentFilters,
  RegisterOutreachRequest,
} from "./outreach.types";
import { getActivePublicOutreachById, listActivePublicOutreaches } from "./public-outreach.service";

// ── Clés de cache ─────────────────────────────────────────────
export const outreachKeys = {
  all: ["outreaches"] as const,
  active: () => [...outreachKeys.all, "active"] as const,
  lists: () => [...outreachKeys.all, "list"] as const,
  list: (filters?: RegisterOutreachFilters) =>
    [...outreachKeys.lists(), filters ?? {}] as const,
  byDepartment: (
    departmentId: string,
    filters?: RegisterOutreachByDepartmentFilters
  ) =>
    [...outreachKeys.all, "department", departmentId, filters ?? {}] as const,
  details: () => [...outreachKeys.all, "detail"] as const,
  detail: (id: string) => [...outreachKeys.details(), id] as const,
};

// ── READ ALL ──────────────────────────────────────────────────

/**
 * @example
 * useOutreachesQuery()
 * useOutreachesQuery({ category: "ECOLE", status: "EN_ATTENTE" })
 */
export function useOutreachesQuery(
  filters?: RegisterOutreachFilters
): UseQueryResult<RegisterOutreach[], Error> {
  return useQuery({
    queryKey: outreachKeys.list(filters),
    queryFn: async () => {
      const raw = await getAllOutreaches(filters);
      return mapApiToOutreachList(raw as unknown as Record<string, unknown>[]);
    },
  });
}

// ── READ BY DEPARTMENT ────────────────────────────────────────

/**
 * @example
 * useOutreachesByDepartmentQuery("uuid")
 * useOutreachesByDepartmentQuery("uuid", { status: "TERMINEE" })
 */
export function useOutreachesByDepartmentQuery(
  departmentId: string | undefined,
  filters?: RegisterOutreachByDepartmentFilters
): UseQueryResult<RegisterOutreach[], Error> {
  return useQuery({
    queryKey: outreachKeys.byDepartment(departmentId ?? "", filters),
    queryFn: async () => {
      const raw = await getOutreachesByDepartment(departmentId!, filters);
      return mapApiToOutreachList(raw as unknown as Record<string, unknown>[]);
    },
    enabled: Boolean(departmentId),
  });
}

// ── READ ONE ──────────────────────────────────────────────────
export function useOutreachQuery(
  id: string | undefined
): UseQueryResult<RegisterOutreach, Error> {
  return useQuery({
    queryKey: outreachKeys.detail(id ?? ""),
    queryFn: async () => {
      const raw = await getOutreachById(id!);
      return mapApiToOutreach(raw as unknown as Record<string, unknown>);
    },
    enabled: Boolean(id),
  });
}

// ── CREATE ────────────────────────────────────────────────────
export function useCreateOutreach(): UseMutationResult<
  RegisterOutreach,
  Error,
  RegisterOutreachRequest
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterOutreachRequest) => {
      const raw = await createOutreach(data);
      return mapApiToOutreach(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: outreachKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: outreachKeys.byDepartment(created.departmentId),
      });
    },
  });
}

// ── UPDATE ────────────────────────────────────────────────────
export function useUpdateOutreach(): UseMutationResult<
  RegisterOutreach,
  Error,
  { id: string; data: RegisterOutreachRequest }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const raw = await updateOutreach(id, data);
      return mapApiToOutreach(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: outreachKeys.lists() });
      queryClient.invalidateQueries({ queryKey: outreachKeys.detail(id) });
      queryClient.invalidateQueries({
        queryKey: outreachKeys.byDepartment(updated.departmentId),
      });
    },
  });
}

// ── DELETE ────────────────────────────────────────────────────
export function useDeleteOutreach(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteOutreach(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: outreachKeys.lists() });
    },
  });
}

/** Liste des missions terrain actuellement actives. */
export function useActivePublicOutreaches() {
  return useQuery<RegisterOutreach[]>({
    queryKey: outreachKeys.active(),
    queryFn: listActivePublicOutreaches,
    staleTime: 5 * 60 * 1000,
  });
}
 
/** Détail d'une mission active (désactivé tant que l'id n'est pas fourni). */
export function useActivePublicOutreachById(id?: string | null) {
  return useQuery<RegisterOutreach>({
    queryKey: outreachKeys.detail(id ?? ""),
    queryFn: () => getActivePublicOutreachById(id as string),
    enabled: Boolean(id),
  });
}