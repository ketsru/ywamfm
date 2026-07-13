// ============================================================
// staff-profile.hooks.ts
// ============================================================

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { PageRequest } from "@/lib/api/core/api.types";
import {
  create,
  getMyStaffProfiles,
  updateMyStaffProfile,
  list,
  getById,
  getByDepartment,
  getByType,
  search,
  updateParcoursDecision,
  updateYwamParcoursDecision,
  assignDepartment,
} from "./staff.service";
import { StaffProfileRequestDto, StaffType } from "./staff.types";

// ── Query keys ───────────────────────────────────────────────

export const staffProfileKeys = {
  all: ["staff-profiles"] as const,
  me: () => [...staffProfileKeys.all, "me"] as const,
  lists: () => [...staffProfileKeys.all, "list"] as const,
  list: (pageRequest?: PageRequest) =>
    [...staffProfileKeys.lists(), pageRequest ?? {}] as const,
  detail: (id: string) => [...staffProfileKeys.all, "detail", id] as const,
  byDepartment: (departmentId: string, pageRequest?: PageRequest) =>
    [...staffProfileKeys.all, "department", departmentId, pageRequest ?? {}] as const,
  byType: (type: StaffType, pageRequest?: PageRequest) =>
    [...staffProfileKeys.all, "type", type, pageRequest ?? {}] as const,
  search: (term: string, pageRequest?: PageRequest) =>
    [...staffProfileKeys.all, "search", term, pageRequest ?? {}] as const,
};

// ── Self-service ─────────────────────────────────────────────

/** Affectations (staff profiles) de l'utilisateur courant. */
export function useMyStaffProfiles() {
  return useQuery({
    queryKey: staffProfileKeys.me(),
    queryFn: getMyStaffProfiles,
  });
}

/** Créer une nouvelle affectation. */
export function useCreateStaffProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: StaffProfileRequestDto) => create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffProfileKeys.me() });
    },
  });
}

/** Met à jour sa propre affectation. */
export function useUpdateMyStaffProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: StaffProfileRequestDto;
    }) => updateMyStaffProfile(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffProfileKeys.me() });
    },
  });
}

// ── Lecture (admin / staff / ABAC) ────────────────────────────

/** Liste paginée scopée côté back selon le rôle de l'utilisateur courant. */
export function useStaffProfiles(pageRequest?: PageRequest) {
  return useQuery({
    queryKey: staffProfileKeys.list(pageRequest),
    queryFn: () => list(pageRequest),
    placeholderData: keepPreviousData,
  });
}

/** Détail d'un staff profile. */
export function useStaffProfile(id?: string | null) {
  return useQuery({
    queryKey: staffProfileKeys.detail(id ?? ""),
    queryFn: () => getById(id as string),
    enabled: Boolean(id),
  });
}

/** Liste paginée des staff profiles d'un département. */
export function useStaffProfilesByDepartment(
  departmentId?: string | null,
  pageRequest?: PageRequest
) {
  return useQuery({
    queryKey: staffProfileKeys.byDepartment(departmentId ?? "", pageRequest),
    queryFn: () => getByDepartment(departmentId as string, pageRequest),
    enabled: Boolean(departmentId),
    placeholderData: keepPreviousData,
  });
}

/** Liste paginée des staff profiles filtrés par type. */
export function useStaffProfilesByType(
  type?: StaffType | null,
  pageRequest?: PageRequest
) {
  return useQuery({
    queryKey: staffProfileKeys.byType(type as StaffType, pageRequest),
    queryFn: () => getByType(type as StaffType, pageRequest),
    enabled: Boolean(type),
    placeholderData: keepPreviousData,
  });
}

/** Recherche paginée par terme libre. */
export function useStaffProfileSearch(term?: string, pageRequest?: PageRequest) {
  const trimmed = term?.trim() ?? "";

  return useQuery({
    queryKey: staffProfileKeys.search(trimmed, pageRequest),
    queryFn: () => search(trimmed, pageRequest),
    enabled: trimmed.length > 0,
    placeholderData: keepPreviousData,
  });
}

// ── Administration ───────────────────────────────────────────

/** Valider/mettre à jour la décision du parcours local. */
export function useUpdateParcoursDecision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      decisionParcours,
      parcoursList,
    }: {
      id: string;
      decisionParcours: boolean;
      parcoursList?: string | null;
    }) => updateParcoursDecision(id, { decisionParcours, parcoursList }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: staffProfileKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: staffProfileKeys.detail(variables.id),
      });
    },
  });
}

/** Valider/mettre à jour la décision du parcours YWAM. */
export function useUpdateYwamParcoursDecision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ywamDecisionParcours,
      ywamParcoursList,
    }: {
      id: string;
      ywamDecisionParcours: boolean;
      ywamParcoursList?: string | null;
    }) =>
      updateYwamParcoursDecision(id, {
        ywamDecisionParcours,
        ywamParcoursList,
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: staffProfileKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: staffProfileKeys.detail(variables.id),
      });
    },
  });
}

/** Réaffecter un staff profile à un autre département. */
export function useAssignDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      departmentId,
    }: {
      id: string;
      departmentId: string;
    }) => assignDepartment(id, departmentId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: staffProfileKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: staffProfileKeys.detail(variables.id),
      });
    },
  });
}