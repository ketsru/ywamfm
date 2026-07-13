// @/lib/types/iam/roles/role.types.ts

import { PermissionKey } from "../permissions/permisionKey";

export enum RoleKey {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  STAFF = "STAFF",
  MANAGER = "MANAGER",
  SECRETARY = "SECRETARY",
  USER = "USER",
}

export interface Role {
  id: string;
  key: RoleKey;
  name: string;
  description?: string | null;
  active: boolean;
  permissions?: PermissionKey[];
}

export interface RoleRequestDto {
  key: string;
  name: string;
  description: string;
  active?: boolean | null;
  permissions?: PermissionKey[];
}

export interface RoleUpdateRequestDto {
  name: string;
  description: string;
}

export interface PermissionsAssignRequestDto {
  permissions: PermissionKey[];
}

export interface RoleResponseDto {
  id: string;
  key: RoleKey;
  name: string;
  description: string | null;
  active: boolean;
  permissions: PermissionKey[];
}

export interface RolePage {
  content: RoleResponseDto[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}