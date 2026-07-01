import { get, put, patch, del, postFormData } from "@/lib/api/core/apifetch";
import { UserResponseDto } from "./user.types";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import { RoleKey } from "../../access/role/role.types";
import { AuthDtos } from "../../access/auth/auth.types"; // ⚠️ adapte le chemin/nommage réel

const BASE = "/api/v1/users";

export const UserService = {
  // ── Self-service (/me) ────────────────────────────────────────────────────

  getMe: () =>
    get<UserResponseDto>(`${BASE}/me`),

  updateMe: (data: UserUpdateSelfRequest) =>
    put<UserUpdateSelfRequest, UserResponseDto>(`${BASE}/me`, data),

  updateMyAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    return postFormData<UserResponseDto>(`${BASE}/me/avatar`, formData);
  },

  // ── Administration (comptes tiers) ──────────────────────────────────────

  getAll: (params?: PageRequest) =>
    get<PageResponseDto<UserResponseDto>>(BASE, params),

  getById: (id: string) =>
    get<UserResponseDto>(`${BASE}/${id}`),

  createManagedAccount: (data: CreateManagedUserRequest) =>
    post<CreateManagedUserRequest, UserResponseDto>(`${BASE}/managed`, data),

  updateManagedAccount: (id: string, data: UpdateManagedUserRequest) =>
    put<UpdateManagedUserRequest, UserResponseDto>(`${BASE}/${id}`, data),

  updateRole: (userId: string, roleKey: RoleKey) =>
    put<void, UserResponseDto>(`${BASE}/${userId}/role`, undefined, {
      params: { roleKey },
    } as never), // ⚠️ voir remarque ci-dessous — `put` ne supporte pas `params` nativement

  activate: (id: string) =>
    patch<void, void>(`${BASE}/${id}/activate`),

  deactivate: (id: string) =>
    patch<void, void>(`${BASE}/${id}/deactivate`),

  delete: (id: string) =>
    del<void>(`${BASE}/${id}`),
};