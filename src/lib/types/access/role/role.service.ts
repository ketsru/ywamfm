
import {
  RoleResponseDto,
  RoleRequestDto,
  RolePage
} from "./role.types";

import { del, get, post, put, patch } from "@/lib/api/core/apifetch";
import { PermissionsAssignRequestDto, RoleUpdateRequestDto } from "./role.types";
import { PageRequest } from "@/lib/api/core/api.types";

const BASE = "/api/v1/roles";

export const RoleService = {
  // ── READ ALL (paginated) ───────────────────────────────────
  getAll: (params?: PageRequest) =>
    get<RolePage>(BASE, params),

  // ── READ ONE ──────────────────────────────────────────────
  getById: (roleId: string) =>
    get<RoleResponseDto>(`${BASE}/${roleId}`),

  // ── CREATE ────────────────────────────────────────────────
  create: (body: RoleRequestDto) =>
    post<RoleRequestDto, RoleResponseDto>(BASE, body),

  // ── UPDATE DETAILS ────────────────────────────────────────
  update: (roleId: string, body: RoleUpdateRequestDto) =>
    put<RoleUpdateRequestDto, RoleResponseDto>(`${BASE}/${roleId}`, body),

  // ── REPLACE PERMISSIONS ───────────────────────────────────
  replacePermissions: (roleId: string, body: PermissionsAssignRequestDto) =>
    put<PermissionsAssignRequestDto, RoleResponseDto>(`${BASE}/${roleId}/permissions`, body),

  // ── GRANT PERMISSION ──────────────────────────────────────
   grantPermission: (roleId: string, permissionKey: string) =>
    patch<void, RoleResponseDto>(`${BASE}/${roleId}/permissions/${permissionKey}`),


  // ── REVOKE PERMISSION ─────────────────────────────────────
  revokePermission: (roleId: string, permissionKey: string) =>
    del<RoleResponseDto>(`${BASE}/${roleId}/permissions/${permissionKey}`),

  // ── ACTIVATE ──────────────────────────────────────────────
  activate: (roleId: string) =>
    patch<void, RoleResponseDto>(`${BASE}/${roleId}/activate`),

  // ── DEACTIVATE ────────────────────────────────────────────
  deactivate: (roleId: string) =>
    patch<void, RoleResponseDto>(`${BASE}/${roleId}/deactivate`),

  // ── DELETE ────────────────────────────────────────────────
  delete: (roleId: string) =>
    del<void>(`${BASE}/${roleId}`),
};
