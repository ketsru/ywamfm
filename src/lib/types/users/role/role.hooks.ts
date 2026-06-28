import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleService } from "./role.service";
import { RoleKey, RoleRequestDto } from "./role.types";
import { PageRequest } from "@/lib/api/api.types";

const KEYS = {
  all: ["roles"] as const,
  list: (params?: PageRequest) => ["roles", "list", params] as const,
  detail: (id: string) => ["roles", id] as const,
};

// ─── Queries ─────────────────────────────────────────────────────────────────

export const useRoles = (params?: PageRequest) =>
  useQuery({
    queryKey: KEYS.list(params),
    queryFn: async () => {
      const page = await RoleService.getAll(params);
      return page.content;
    },
  });

export const useRole = (roleId: string) =>
  useQuery({
    queryKey: KEYS.detail(roleId),
    queryFn: () => RoleService.getById(roleId),
    enabled: !!roleId,
  });

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: RoleRequestDto) => RoleService.create(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: KEYS.all }),
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roleId, body }: { roleId: string; body: RoleRequestDto }) =>
      RoleService.update(roleId, body),
    onSuccess: (_, { roleId }) => {
      queryClient.invalidateQueries({ queryKey: KEYS.detail(roleId) });
      queryClient.invalidateQueries({ queryKey: KEYS.all });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roleId: string) => RoleService.delete(roleId),
    onSuccess: (_, roleId) => {
      queryClient.invalidateQueries({ queryKey: KEYS.all });
      queryClient.removeQueries({ queryKey: KEYS.detail(roleId) }); // supprime le cache du détail
    },
  });
};

export const useChangeUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, roleKey }: { userId: string; roleKey: RoleKey }) =>
      RoleService.changeUserRole(userId, roleKey),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["users", userId] }); // si tu as un cache user
    },
  });
};

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roleId, permissionIds }: { roleId: string; permissionIds: string[] }) =>
      RoleService.updatePermissions(roleId, permissionIds),
    onSuccess: (_, { roleId }) => {
      queryClient.invalidateQueries({ queryKey: KEYS.detail(roleId) });
      queryClient.invalidateQueries({ queryKey: KEYS.all });
    },
  });
};