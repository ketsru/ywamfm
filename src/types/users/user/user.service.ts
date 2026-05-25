import { get, patch, del } from "@/lib/api/core/apifetch";
import { UserResponseDto, UpdateRoleResponseDto } from "./user.types";
import { RoleKey } from "./role/role.types";

const BASE       = "/api/v1/users";
const BASE_ADMIN = "/api/v1/admin/users";

export const UserService = {
  // ── Admin ──────────────────────────────────────────────────────────────────

  getAll: (params?: PageRequest) =>
    get<PageResponseDto<UserResponseDto>>(BASE_ADMIN, params),

  getById: (id: string) =>
    get<UserResponseDto>(`${BASE_ADMIN}/${id}`),

  activate: (id: string) =>
    patch<void, void>(`${BASE_ADMIN}/${id}/activate`),

  deactivate: (id: string) =>
    patch<void, void>(`${BASE_ADMIN}/${id}/deactivate`),

  delete: (id: string) =>
    del<void>(`${BASE_ADMIN}/${id}`),

  // ── Front-office ───────────────────────────────────────────────────────────

  getMe: () =>
    get<UserResponseDto>(`${BASE}/me`),

  updateRole: (userId: string, roleKey: RoleKey) =>
    patch<{ roleKey: RoleKey }, UpdateRoleResponseDto>(
      `${BASE}/${userId}/role`,
      { roleKey }
    ),
};