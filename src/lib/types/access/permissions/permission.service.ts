// ============================================================
// permission.service.ts
// ============================================================

import { get, post, put, patch } from "@/lib/api/core/apifetch";
import {
  PermissionRequestDto,
  PermissionResponseDto,
  GrantRequestDto,
  GrantResponseDto,
} from "./permission.types";

const ENDPOINT = "/api/v1/permissions";

// ── READ ALL (paginated) ─────────────────────────────────────
export const getAllPermissions = (): Promise<PermissionResponseDto[]> =>
  get<PermissionResponseDto[]>(ENDPOINT);

// ── READ ACTIVE ──────────────────────────────────────────────
export const getActivePermissions = (): Promise<PermissionResponseDto[]> =>
  get<PermissionResponseDto[]>(`${ENDPOINT}/active`);

// ── READ ONE ─────────────────────────────────────────────────
export const getPermissionById = (id: string): Promise<PermissionResponseDto> =>
  get<PermissionResponseDto>(`${ENDPOINT}/${id}`);

// ── UPDATE LABEL ─────────────────────────────────────────────
export const updatePermissionLabel = (
  id: string,
  data: PermissionRequestDto
): Promise<PermissionResponseDto> =>
  put<PermissionRequestDto, PermissionResponseDto>(`${ENDPOINT}/${id}/label`, data);

// ── ACTIVATE ─────────────────────────────────────────────────
export const activatePermission = (id: string): Promise<PermissionResponseDto> =>
  patch<void, PermissionResponseDto>(`${ENDPOINT}/${id}/activate`);

// ── DEACTIVATE ───────────────────────────────────────────────
export const deactivatePermission = (id: string): Promise<PermissionResponseDto> =>
  patch<void, PermissionResponseDto>(`${ENDPOINT}/${id}/deactivate`);

// ── GRANTS (si tu exposes des endpoints pour assigner à un user) ─────────────
// Exemple : POST /api/v1/permissions/grants
export const grantPermissionToUser = (
  data: GrantRequestDto
): Promise<GrantResponseDto> =>
  post<GrantRequestDto, GrantResponseDto>(`${ENDPOINT}/grants`, data);

// Exemple : GET /api/v1/permissions/grants/{userId}
export const getUserGrants = (userId: string): Promise<GrantResponseDto[]> =>
  get<GrantResponseDto[]>(`${ENDPOINT}/grants/${userId}`);
