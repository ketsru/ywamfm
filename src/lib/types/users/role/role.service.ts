import { PageRequest } from "@/lib/api/api.types";
import { RoleResponseDto, RoleRequestDto, RoleKey, RolePage } from "./role.types";
import { apiFetch, del, get, post, put } from "@/lib/api/apifetch";

const BASE = "/api/v1/admin/roles";

export const RoleService = {

  // Correction : RolePage au lieu de RoleResponseDto[]
  getAll: (params?: PageRequest) =>
    get<RolePage>(BASE, params),

  // Tout le reste est inchangé
  getById: (roleId: string) =>
    get<RoleResponseDto>(`${BASE}/${roleId}`),

  create: (body: RoleRequestDto) =>
    post<RoleRequestDto, RoleResponseDto>(BASE, body),

  update: (roleId: string, body: RoleRequestDto) =>
    put<RoleRequestDto, RoleResponseDto>(`${BASE}/${roleId}`, body),

  delete: (roleId: string) =>
    del<void>(`${BASE}/${roleId}`),

  changeUserRole: (userId: string, roleKey: RoleKey) =>
    apiFetch<void>(`${BASE}/users/${userId}`, {
      method: "PATCH",
      params: { roleKey },
    }),

  updatePermissions: (roleId: string, permissionIds: string[]) =>
    put<string[], void>(`${BASE}/${roleId}/permissions`, permissionIds),
};