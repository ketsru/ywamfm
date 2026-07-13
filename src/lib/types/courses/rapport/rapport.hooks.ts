// @/lib/types/school/rapport/rapport.hooks.ts

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import {
  RapportResponseDto,
  RapportDetailResponseDto,
  RapportRequest,
  RapportGradeRequest,
} from "./rapport.types";
import {
  submitRapport,
  getMyRapports,
  getMyRapportById,
  updateMyRapport,
  deleteMyRapport,
  getAllRapports,
  getRapportById,
  gradeRapport,
  adminDeleteRapport,
} from "./rapport.service";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";

// ── Clés de cache ─────────────────────────────────────────────
export const rapportKeys = {
  all:          ["rapports"] as const,
  mine:         (schoolId?: string) => ["rapports", "me", schoolId] as const,
  myDetail:     (id: string)        => ["rapports", "me", id] as const,
  scoped:       (filters?: object, page?: PageRequest) =>
                  ["rapports", "scoped", filters, page] as const,
  detail:       (id: string)        => ["rapports", id] as const,
};

// =========================================
// Self-service étudiant
// =========================================

export const useMyRapports = (
  schoolId?: string,
  pageRequest?: PageRequest,
  options?: UseQueryOptions<PageResponseDto<RapportResponseDto>>
) =>
  useQuery({
    queryKey: rapportKeys.mine(schoolId),
    queryFn:  () => getMyRapports(schoolId, pageRequest),
    ...options,
  });

export const useMyRapportById = (
  id: string,
  options?: UseQueryOptions<RapportDetailResponseDto>
) =>
  useQuery({
    queryKey: rapportKeys.myDetail(id),
    queryFn:  () => getMyRapportById(id),
    enabled:  !!id,
    ...options,
  });

export const useSubmitRapport = (onSuccess?: (result: RapportDetailResponseDto) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RapportRequest) => submitRapport(data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: rapportKeys.mine() });
      toast.success("Rapport soumis avec succès.");
      onSuccess?.(result);
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la soumission." }),
  });
};

export const useUpdateMyRapport = (onSuccess?: (result: RapportDetailResponseDto) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RapportRequest }) =>
      updateMyRapport(id, data),
    onSuccess: (result, { id }) => {
      queryClient.invalidateQueries({ queryKey: rapportKeys.mine() });
      queryClient.invalidateQueries({ queryKey: rapportKeys.myDetail(id) });
      toast.success("Rapport mis à jour.");
      onSuccess?.(result);
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la mise à jour." }),
  });
};

export const useDeleteMyRapport = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMyRapport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rapportKeys.mine() });
      toast.success("Rapport supprimé.");
      onSuccess?.();
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la suppression." }),
  });
};

// =========================================
// Vue scopée staff/admin
// =========================================

export const useAllRapports = (
  filters?: { schoolId?: string; studentId?: string; search?: string },
  pageRequest?: PageRequest,
  options?: UseQueryOptions<PageResponseDto<RapportResponseDto>>
) =>
  useQuery({
    queryKey: rapportKeys.scoped(filters, pageRequest),
    queryFn:  () => getAllRapports(filters, pageRequest),
    ...options,
  });

export const useRapportById = (
  id: string,
  options?: UseQueryOptions<RapportDetailResponseDto>
) =>
  useQuery({
    queryKey: rapportKeys.detail(id),
    queryFn:  () => getRapportById(id),
    enabled:  !!id,
    ...options,
  });

// =========================================
// Notation
// =========================================

export const useGradeRapport = (onSuccess?: (result: RapportDetailResponseDto) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RapportGradeRequest }) =>
      gradeRapport(id, data),
    onSuccess: (result, { id }) => {
      queryClient.invalidateQueries({ queryKey: rapportKeys.scoped() });
      queryClient.invalidateQueries({ queryKey: rapportKeys.detail(id) });
      toast.success(`Rapport noté : ${result.grade}/20.`);
      onSuccess?.(result);
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la notation." }),
  });
};

// =========================================
// Admin
// =========================================

export const useAdminDeleteRapport = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminDeleteRapport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rapportKeys.all });
      toast.success("Rapport supprimé.");
      onSuccess?.();
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la suppression." }),
  });
};