// @/lib/types/iam/users/user.service.ts

import { get, put, patch, del, post, putFormData } from "@/lib/api/core/apifetch";
import { UserResponseDto, UserUpdateSelfRequest } from "./user.types";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import { RoleKey } from "../../access/role/role.types";
import {
  CreateManagedAccountRequest,
  CreateManagedAccountResponse,
} from "../../access/auth/auth.types";

const BASE = "/api/v1/users";

// ⚠️ Absent de auth.types.ts fourni — à créer côté back/front si pas déjà
// défini ailleurs. Forme supposée d'après le contrôleur (pas de roleKey,
// le rôle se change via l'endpoint dédié /{id}/role).
export interface UpdateManagedUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export const UserService = {
  // ── Self-service (/me) ────────────────────────────────────────────────

  getMe: () =>
    get<UserResponseDto>(`${BASE}/me`),

  updateMe: (data: UserUpdateSelfRequest) =>
    put<UserUpdateSelfRequest, UserResponseDto>(`${BASE}/me`, data),

  updateMyAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    return putFormData<UserResponseDto>(`${BASE}/me/avatar`, formData);
  },

  // ── Administration (comptes tiers) ──────────────────────────────────────

  getAll: (params?: PageRequest) =>
    get<PageResponseDto<UserResponseDto>>(BASE, params),

  getById: (id: string) =>
    get<UserResponseDto>(`${BASE}/${id}`),

  // Le back renvoie UserResponseDto (voir controller), pas CreateManagedAccountResponse —
  // je garde UserResponseDto en sortie pour cohérence avec le reste du service.
  createManagedAccount: (data: CreateManagedAccountRequest) =>
    post<CreateManagedAccountRequest, UserResponseDto>(`${BASE}/managed`, data),

  updateManagedAccount: (id: string, data: UpdateManagedUserRequest) =>
    put<UpdateManagedUserRequest, UserResponseDto>(`${BASE}/${id}`, data),

  updateRole: (userId: string, roleKey: RoleKey) =>
    put<void, UserResponseDto>(
      `${BASE}/${userId}/role?roleKey=${encodeURIComponent(roleKey)}`,
      undefined
    ),

  activate: (id: string) =>
    patch<void, void>(`${BASE}/${id}/activate`),

  deactivate: (id: string) =>
    patch<void, void>(`${BASE}/${id}/deactivate`),

  delete: (id: string) =>
    del<void>(`${BASE}/${id}`),
};