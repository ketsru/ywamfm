"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllPlannings,
  getPlanningById,
  createPlanning,
  updatePlanning,
  deletePlanning,
} from "./planning.service";

import { type PageRequest, type PageResponseDto } from "@/lib/api/core/api.types";
import { type Planning, type PlanningRequest } from "./planning.types";

export const planningKeys = {
  all: ["plannings"] as const,
  lists: () => [...planningKeys.all, "list"] as const,
  list: (promotionId?: string, pageRequest?: PageRequest) =>
    [...planningKeys.lists(), promotionId ?? "", pageRequest ?? {}] as const,
  details: () => [...planningKeys.all, "detail"] as const,
  detail: (id: string) => [...planningKeys.details(), id] as const,
};

export function usePlanningsQuery(
  promotionId?: string,
  pageRequest?: PageRequest
): UseQueryResult<PageResponseDto<Planning>, Error> {
  return useQuery({
    queryKey: planningKeys.list(promotionId, pageRequest),
    queryFn: () => getAllPlannings(promotionId, pageRequest),
  });
}

export function usePlanningQuery(
  id: string | undefined
): UseQueryResult<Planning, Error> {
  return useQuery({
    queryKey: planningKeys.detail(id ?? ""),
    queryFn: () => getPlanningById(id!),
    enabled: !!id,
  });
}

export function useCreatePlanning(): UseMutationResult<
  Planning,
  Error,
  PlanningRequest
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlanning,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planningKeys.lists() });
    },
  });
}

export function useUpdatePlanning(): UseMutationResult<
  Planning,
  Error,
  { id: string; data: PlanningRequest }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updatePlanning(id, data),
    onSuccess: (_updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: planningKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planningKeys.detail(id) });
    },
  });
}

export function useDeletePlanning(): UseMutationResult<
  void,
  Error,
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlanning,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planningKeys.lists() });
    },
  });
}