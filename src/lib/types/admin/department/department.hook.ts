// ============================================================
// department.hooks.ts
// ============================================================
//
// Hooks React Query (TanStack Query v5) pour la gestion des
// départements. Chaque hook encapsule la logique de cache,
// d'invalidation et de mutation.
//
// Pré-requis : <QueryClientProvider> dans le layout racine.
// ============================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "./department.service";

import { mapApiToDepartment, mapApiToDepartmentList } from "./department.mapper";
import { Department, DepartmentFilters, DepartmentRequest } from "./department.types";

// ── Clés de cache ─────────────────────────────────────────────
export const departmentKeys = {
  all: ["departments"] as const,
  lists: () => [...departmentKeys.all, "list"] as const,
  list: (filters?: DepartmentFilters) =>
    [...departmentKeys.lists(), filters ?? {}] as const,
  details: () => [...departmentKeys.all, "detail"] as const,
  detail: (id: string) => [...departmentKeys.details(), id] as const,
};

// ── READ ALL ──────────────────────────────────────────────────

/**
 * Récupère la liste des départements avec filtres optionnels.
 *
 * @example
 * const { data, isLoading } = useDepartments({ activeOnly: true });
 * const { data, isLoading } = useDepartments({ search: "finance" });
 */
export function useDepartments(
  filters?: DepartmentFilters
): UseQueryResult<Department[], Error> {
  return useQuery({
    queryKey: departmentKeys.list(filters),
    queryFn: async () => {
      const raw = await getAllDepartments(filters);
      return mapApiToDepartmentList(raw);
    },
  });
}

// ── READ ONE ──────────────────────────────────────────────────

/**
 * Récupère un département par son UUID.
 * La requête est désactivée si `id` est vide / undefined.
 */
export function useDepartment(
  id: string | undefined
): UseQueryResult<Department, Error> {
  return useQuery({
    queryKey: departmentKeys.detail(id ?? ""),
    queryFn: async () => {
      const raw = await getDepartmentById(id!);
      return mapApiToDepartment(raw);
    },
    enabled: Boolean(id),
  });
}

// ── DELETE ────────────────────────────────────────────────────

/**
 * Mutation pour supprimer un département.
 * Invalide toutes les listes après succès.
 */
export function useDeleteDepartment(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
}