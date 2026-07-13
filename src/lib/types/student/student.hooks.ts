// ============================================================
// student.hooks.ts
// ============================================================

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { PageRequest } from "@/lib/api/core/api.types";
import {
  enroll,
  getMyEnrollments,
  updateMyEnrollment,
  list,
  getById,
  getByStatus,
  getBySchool,
  getByPromotion,
  search,
  updateStatus,
  assignPromotion,
} from "./student.service";
import {
  StudentRequestDto,
  StudentStatus,
  StudentStatusUpdateDto,
} from "./student.types";

// ── Query keys ───────────────────────────────────────────────

export const studentKeys = {
  all: ["students"] as const,
  me: () => [...studentKeys.all, "me"] as const,
  lists: () => [...studentKeys.all, "list"] as const,
  list: (pageRequest?: PageRequest) =>
    [...studentKeys.lists(), pageRequest ?? {}] as const,
  detail: (id: string) => [...studentKeys.all, "detail", id] as const,
  byStatus: (status: StudentStatus, pageRequest?: PageRequest) =>
    [...studentKeys.all, "status", status, pageRequest ?? {}] as const,
  bySchool: (schoolId: string, pageRequest?: PageRequest) =>
    [...studentKeys.all, "school", schoolId, pageRequest ?? {}] as const,
  byPromotion: (promotionId: string, pageRequest?: PageRequest) =>
    [...studentKeys.all, "promotion", promotionId, pageRequest ?? {}] as const,
  search: (term: string, pageRequest?: PageRequest) =>
    [...studentKeys.all, "search", term, pageRequest ?? {}] as const,
};

// ── Self-service ─────────────────────────────────────────────

/** Inscriptions de l'utilisateur courant. */
export function useMyEnrollments() {
  return useQuery({
    queryKey: studentKeys.me(),
    queryFn: getMyEnrollments,
  });
}

/** Créer une inscription (bouton "Enroll Now"). */
export function useEnroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: StudentRequestDto) => enroll(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.me() });
    },
  });
}

/** Mettre à jour sa propre inscription. */
export function useUpdateMyEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studentId,
      request,
    }: {
      studentId: string;
      request: StudentRequestDto;
    }) => updateMyEnrollment(studentId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.me() });
    },
  });
}

// ── Lecture (admin / staff / ABAC) ────────────────────────────

/** Liste paginée scopée côté back selon le rôle de l'utilisateur courant. */
export function useStudents(pageRequest?: PageRequest) {
  return useQuery({
    queryKey: studentKeys.list(pageRequest),
    queryFn: () => list(pageRequest),
    placeholderData: keepPreviousData,
  });
}

/** Détail d'un étudiant. */
export function useStudent(id?: string | null) {
  return useQuery({
    queryKey: studentKeys.detail(id ?? ""),
    queryFn: () => getById(id as string),
    enabled: Boolean(id),
  });
}

/** Liste paginée filtrée par statut. */
export function useStudentsByStatus(
  status?: StudentStatus | null,
  pageRequest?: PageRequest
) {
  return useQuery({
    queryKey: studentKeys.byStatus(status as StudentStatus, pageRequest),
    queryFn: () => getByStatus(status as StudentStatus, pageRequest),
    enabled: Boolean(status),
    placeholderData: keepPreviousData,
  });
}

/** Liste paginée des étudiants d'une école. */
export function useStudentsBySchool(
  schoolId?: string | null,
  pageRequest?: PageRequest
) {
  return useQuery({
    queryKey: studentKeys.bySchool(schoolId ?? "", pageRequest),
    queryFn: () => getBySchool(schoolId as string, pageRequest),
    enabled: Boolean(schoolId),
    placeholderData: keepPreviousData,
  });
}

/** Liste paginée des étudiants d'une promotion. */
export function useStudentsByPromotion(
  promotionId?: string | null,
  pageRequest?: PageRequest
) {
  return useQuery({
    queryKey: studentKeys.byPromotion(promotionId ?? "", pageRequest),
    queryFn: () => getByPromotion(promotionId as string, pageRequest),
    enabled: Boolean(promotionId),
    placeholderData: keepPreviousData,
  });
}

/** Recherche paginée par terme libre. */
export function useStudentSearch(term?: string, pageRequest?: PageRequest) {
  const trimmed = term?.trim() ?? "";

  return useQuery({
    queryKey: studentKeys.search(trimmed, pageRequest),
    queryFn: () => search(trimmed, pageRequest),
    enabled: trimmed.length > 0,
    placeholderData: keepPreviousData,
  });
}

// ── Administration ───────────────────────────────────────────

/** Valider / refuser / clôturer une inscription. */
export function useUpdateStudentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;
      dto: StudentStatusUpdateDto;
    }) => updateStatus(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: studentKeys.detail(variables.id),
      });
    },
  });
}

/** Assigner un étudiant à une promotion. */
export function useAssignPromotion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      promotionId,
    }: {
      id: string;
      promotionId: string;
    }) => assignPromotion(id, promotionId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: studentKeys.detail(variables.id),
      });
    },
  });
}