// ============================================================
// publish-school.hooks.ts
// ============================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllPublishSchools,
  getPublishSchoolById,
  getPublishSchoolsBySchool,
  getPublishSchoolsByPromotion,
  createPublishSchool,
  updatePublishSchool,
  deletePublishSchool,
} from "./publish-school.service";

import {
  mapApiToPublishSchool,
  mapApiToPublishSchoolList,
} from "./publish-school.mapper";

import {
  PublishSchool,
  PublishSchoolFilters,
  PublishSchoolBySchoolFilters,
  PublishSchoolRequest,
} from "./publish-school.types";
import { getActivePublicSchoolById, listActivePublicSchools } from "./public-school.service";

// ── Clés de cache ─────────────────────────────────────────────
export const publishSchoolKeys = {
  all: ["publish-schools"] as const,
  active: () => [...publishSchoolKeys.all, "active"] as const,
  lists: () => [...publishSchoolKeys.all, "list"] as const,
  list: (filters?: PublishSchoolFilters) =>
    [...publishSchoolKeys.lists(), filters ?? {}] as const,
  bySchool: (schoolId: string, filters?: PublishSchoolBySchoolFilters) =>
    [...publishSchoolKeys.all, "school", schoolId, filters ?? {}] as const,
  byPromotion: (promotionId: string) =>
    [...publishSchoolKeys.all, "promotion", promotionId] as const,
  details: () => [...publishSchoolKeys.all, "detail"] as const,
  detail: (id: string) => [...publishSchoolKeys.details(), id] as const,
};

// ── READ ALL ──────────────────────────────────────────────────

/**
 * @example
 * usePublishSchoolsQuery()
 * usePublishSchoolsQuery({ status: "EN_ATTENTE" })
 * usePublishSchoolsQuery({ active: true })  // en cours maintenant
 */
export function usePublishSchoolsQuery(
  filters?: PublishSchoolFilters
): UseQueryResult<PublishSchool[], Error> {
  return useQuery({
    queryKey: publishSchoolKeys.list(filters),
    queryFn: async () => {
      const raw = await getAllPublishSchools(filters);
      return mapApiToPublishSchoolList(
        raw as unknown as Record<string, unknown>[]
      );
    },
  });
}

// ── READ BY SCHOOL ────────────────────────────────────────────
export function usePublishSchoolsBySchoolQuery(
  schoolId: string | undefined,
  filters?: PublishSchoolBySchoolFilters
): UseQueryResult<PublishSchool[], Error> {
  return useQuery({
    queryKey: publishSchoolKeys.bySchool(schoolId ?? "", filters),
    queryFn: async () => {
      const raw = await getPublishSchoolsBySchool(schoolId!, filters);
      return mapApiToPublishSchoolList(
        raw as unknown as Record<string, unknown>[]
      );
    },
    enabled: Boolean(schoolId),
  });
}

// ── READ BY PROMOTION ─────────────────────────────────────────
export function usePublishSchoolsByPromotionQuery(
  promotionId: string | undefined
): UseQueryResult<PublishSchool[], Error> {
  return useQuery({
    queryKey: publishSchoolKeys.byPromotion(promotionId ?? ""),
    queryFn: async () => {
      const raw = await getPublishSchoolsByPromotion(promotionId!);
      return mapApiToPublishSchoolList(
        raw as unknown as Record<string, unknown>[]
      );
    },
    enabled: Boolean(promotionId),
  });
}

// ── READ ONE ──────────────────────────────────────────────────
export function usePublishSchoolQuery(
  id: string | undefined
): UseQueryResult<PublishSchool, Error> {
  return useQuery({
    queryKey: publishSchoolKeys.detail(id ?? ""),
    queryFn: async () => {
      const raw = await getPublishSchoolById(id!);
      return mapApiToPublishSchool(raw as unknown as Record<string, unknown>);
    },
    enabled: Boolean(id),
  });
}

// ── CREATE ────────────────────────────────────────────────────
export function useCreatePublishSchool(): UseMutationResult<
  PublishSchool,
  Error,
  PublishSchoolRequest
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PublishSchoolRequest) => {
      const raw = await createPublishSchool(data);
      return mapApiToPublishSchool(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: publishSchoolKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: publishSchoolKeys.bySchool(created.schoolId),
      });
      queryClient.invalidateQueries({
        queryKey: publishSchoolKeys.byPromotion(created.promotionId),
      });
    },
  });
}

// ── UPDATE ────────────────────────────────────────────────────
export function useUpdatePublishSchool(): UseMutationResult<
  PublishSchool,
  Error,
  { id: string; data: PublishSchoolRequest }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const raw = await updatePublishSchool(id, data);
      return mapApiToPublishSchool(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: publishSchoolKeys.lists() });
      queryClient.invalidateQueries({ queryKey: publishSchoolKeys.detail(id) });
      queryClient.invalidateQueries({
        queryKey: publishSchoolKeys.bySchool(updated.schoolId),
      });
      queryClient.invalidateQueries({
        queryKey: publishSchoolKeys.byPromotion(updated.promotionId),
      });
    },
  });
}

// ── DELETE ────────────────────────────────────────────────────
export function useDeletePublishSchool(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePublishSchool(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publishSchoolKeys.lists() });
    },
  });
}

/** Liste des écoles actuellement publiées / actives. */
export function useActivePublicSchools() {
  return useQuery<PublishSchool[]>({
    queryKey: publishSchoolKeys.active(),
    queryFn: listActivePublicSchools,
    staleTime: 5 * 60 * 1000,
  });
}
 
/** Détail d'une école publiée (désactivé tant que l'id n'est pas fourni). */
export function useActivePublicSchoolById(id?: string | null) {
  return useQuery<PublishSchool>({
    queryKey: publishSchoolKeys.detail(id ?? ""),
    queryFn: () => getActivePublicSchoolById(id as string),
    enabled: Boolean(id),
  });
}