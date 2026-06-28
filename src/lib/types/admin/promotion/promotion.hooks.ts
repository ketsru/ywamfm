// ============================================================
// promotion.hooks.ts
// ============================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllPromotions,
  getPromotionById,
  getPromotionsBySchool,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "./promotion.service";

import { mapApiToPromotion, mapApiToPromotionList } from "./promotion.mapper";
import {
  Promotion,
  PromotionFilters,
  PromotionBySchoolFilters,
  PromotionRequest,
} from "./promotion.types";

// ── Clés de cache ─────────────────────────────────────────────
export const promotionKeys = {
  all: ["promotions"] as const,
  lists: () => [...promotionKeys.all, "list"] as const,
  list: (filters?: PromotionFilters) =>
    [...promotionKeys.lists(), filters ?? {}] as const,
  bySchool: (schoolId: string, filters?: PromotionBySchoolFilters) =>
    [...promotionKeys.all, "school", schoolId, filters ?? {}] as const,
  details: () => [...promotionKeys.all, "detail"] as const,
  detail: (id: string) => [...promotionKeys.details(), id] as const,
};

// ── READ ALL ──────────────────────────────────────────────────

/**
 * @example
 * usePromotionsQuery()                   // toutes
 * usePromotionsQuery({ activeOnly: true }) // actives uniquement
 */
export function usePromotionsQuery(
  filters?: PromotionFilters
): UseQueryResult<Promotion[], Error> {
  return useQuery({
    queryKey: promotionKeys.list(filters),
    queryFn: async () => {
      const raw = await getAllPromotions(filters);
      return mapApiToPromotionList(raw as unknown as Record<string, unknown>[]);
    },
  });
}

// ── READ BY SCHOOL ────────────────────────────────────────────

/**
 * Récupère les promotions d'une école, avec filtre actif optionnel.
 * Désactivé si `schoolId` est vide.
 *
 * @example
 * usePromotionsBySchoolQuery("uuid-école")
 * usePromotionsBySchoolQuery("uuid-école", { activeOnly: true })
 */
export function usePromotionsBySchoolQuery(
  schoolId: string | undefined,
  filters?: PromotionBySchoolFilters
): UseQueryResult<Promotion[], Error> {
  return useQuery({
    queryKey: promotionKeys.bySchool(schoolId ?? "", filters),
    queryFn: async () => {
      const raw = await getPromotionsBySchool(schoolId!, filters);
      return mapApiToPromotionList(raw as unknown as Record<string, unknown>[]);
    },
    enabled: Boolean(schoolId),
  });
}

// ── READ ONE ──────────────────────────────────────────────────
export function usePromotionQuery(
  id: string | undefined
): UseQueryResult<Promotion, Error> {
  return useQuery({
    queryKey: promotionKeys.detail(id ?? ""),
    queryFn: async () => {
      const raw = await getPromotionById(id!);
      return mapApiToPromotion(raw as unknown as Record<string, unknown>);
    },
    enabled: Boolean(id),
  });
}

// ── CREATE ────────────────────────────────────────────────────
export function useCreatePromotion(): UseMutationResult<
  Promotion,
  Error,
  PromotionRequest
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PromotionRequest) => {
      const raw = await createPromotion(data);
      return mapApiToPromotion(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: promotionKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: promotionKeys.bySchool(created.schoolId),
      });
    },
  });
}

// ── UPDATE ────────────────────────────────────────────────────
export function useUpdatePromotion(): UseMutationResult<
  Promotion,
  Error,
  { id: string; data: PromotionRequest }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const raw = await updatePromotion(id, data);
      return mapApiToPromotion(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: promotionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: promotionKeys.detail(id) });
      queryClient.invalidateQueries({
        queryKey: promotionKeys.bySchool(updated.schoolId),
      });
    },
  });
}

// ── DELETE ────────────────────────────────────────────────────
export function useDeletePromotion(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePromotion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promotionKeys.lists() });
    },
  });
}