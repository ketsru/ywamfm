// ============================================================
// register-school.hooks.ts
// ============================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllSchools,
  getSchoolById,
  getSchoolsByDepartment,
  createSchool,
  updateSchool,
  deleteSchool,
} from "./school.service";

import { mapApiToSchool, mapApiToSchoolList } from "./school.mapper";
import {
  RegisterSchool,
  RegisterSchoolFilters,
  RegisterSchoolRequest,
} from "./school.types";

// ── Clés de cache ─────────────────────────────────────────────
export const schoolKeys = {
  all: ["schools"] as const,
  lists: () => [...schoolKeys.all, "list"] as const,
  list: (filters?: RegisterSchoolFilters) =>
    [...schoolKeys.lists(), filters ?? {}] as const,
  byDepartment: (departmentId: string) =>
    [...schoolKeys.all, "department", departmentId] as const,
  details: () => [...schoolKeys.all, "detail"] as const,
  detail: (id: string) => [...schoolKeys.details(), id] as const,
};

// ── READ ALL ──────────────────────────────────────────────────

/**
 * @example
 * useSchoolsQuery()                                          // toutes
 * useSchoolsQuery({ status: "EN_COURS" })                   // par statut
 * useSchoolsQuery({ type: "EN_LIGNE", category: "GRATUITE" }) // type + catégorie
 */
export function useSchoolsQuery(
  filters?: RegisterSchoolFilters
): UseQueryResult<RegisterSchool[], Error> {
  return useQuery({
    queryKey: schoolKeys.list(filters),
    queryFn: async () => {
      const page = await getAllSchools(filters); // PageResponseDto<RegisterSchool>
      return mapApiToSchoolList(page.content as unknown as Record<string, unknown>[]);
    },
  });
}

// ── READ BY DEPARTMENT ────────────────────────────────────────

/**
 * Récupère toutes les écoles d'un département.
 * Désactivé si `departmentId` est vide.
 */
export function useSchoolsByDepartmentQuery(
  departmentId: string | undefined
): UseQueryResult<RegisterSchool[], Error> {
  return useQuery({
    queryKey: schoolKeys.byDepartment(departmentId ?? ""),
    queryFn: async () => {
      const raw = await getSchoolsByDepartment(departmentId!);
      return mapApiToSchoolList(raw as unknown as Record<string, unknown>[]);
    },
    enabled: Boolean(departmentId),
  });
}

// ── READ ONE ──────────────────────────────────────────────────
export function useSchoolQuery(
  id: string | undefined
): UseQueryResult<RegisterSchool, Error> {
  return useQuery({
    queryKey: schoolKeys.detail(id ?? ""),
    queryFn: async () => {
      const raw = await getSchoolById(id!);
      return mapApiToSchool(raw as unknown as Record<string, unknown>);
    },
    enabled: Boolean(id),
  });
}

// ── CREATE ────────────────────────────────────────────────────
export function useCreateSchool(): UseMutationResult<
  RegisterSchool,
  Error,
  RegisterSchoolRequest
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterSchoolRequest) => {
      const raw = await createSchool(data);
      return mapApiToSchool(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: schoolKeys.byDepartment(created.departmentId),
      });
    },
  });
}

// ── UPDATE ────────────────────────────────────────────────────
export function useUpdateSchool(): UseMutationResult<
  RegisterSchool,
  Error,
  { id: string; data: RegisterSchoolRequest }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const raw = await updateSchool(id, data);
      return mapApiToSchool(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
      queryClient.invalidateQueries({ queryKey: schoolKeys.detail(id) });
      queryClient.invalidateQueries({
        queryKey: schoolKeys.byDepartment(updated.departmentId),
      });
    },
  });
}

// ── DELETE ────────────────────────────────────────────────────
export function useDeleteSchool(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSchool(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
    },
  });
}