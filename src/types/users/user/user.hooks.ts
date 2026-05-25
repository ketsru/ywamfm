import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageRequest } from "@/lib/api/core/api.types";
import { UserService } from "./user.service";
import { mapUserDtoToModel } from "./user.mapper";
import { RoleKey } from "@/lib/types/iam/roles/role.types";

const KEYS = {
  all:    ["users"] as const,
  list:   (params?: PageRequest) => ["users", "list", params] as const,
  detail: (id: string)           => ["users", id] as const,
  me:     ["users", "me"]        as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useUsers = (params?: PageRequest) =>
  useQuery({
    queryKey: KEYS.list(params),
    queryFn:  () => UserService.getAll(params),
  });

export const useUser = (id: string) =>
  useQuery({
    queryKey: KEYS.detail(id),
    queryFn:  async () => mapUserDtoToModel(await UserService.getById(id)),
    enabled:  !!id,
  });

export const useMe = () =>
  useQuery({
    queryKey: KEYS.me,
    queryFn:  async () => mapUserDtoToModel(await UserService.getMe()),
  });

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useActivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => UserService.activate(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: KEYS.all }),
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => UserService.deactivate(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: KEYS.all }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => UserService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: KEYS.all }),
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, roleKey }: { userId: string; roleKey: RoleKey }) =>
      UserService.updateRole(userId, roleKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.me });
      queryClient.invalidateQueries({ queryKey: KEYS.all });
    },
  });
};