// @/lib/types/iam/users/user.types.ts

import { PermissionKey } from "../permissions/permisionKey";

// Entity and Acces Management status for users
export enum AccountStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING_VALIDATION = "PENDING_VALIDATION",
}

export interface User {
  id: string;
  email: string;

  firstName: string;
  lastName: string;

  avatarUrl?: string | null;

  status: AccountStatus;
  verified: boolean;

  emailConfirmedAt?: string | null;
  lastLoginAt?: string | null;

  deletionRequested: boolean;
  scheduledDeletionDate?: string | null;

  roleId: string;
  roleName: string;
  roleKey?: string;

  createdAt: string;
  updatedAt: string;

  profile?: ProfileResponseDto | null;

  permissions?: PermissionKey[];

  profileCompleted?: boolean | null;
}

// DTO for creating/updating a user, aligned with backend UserRequestDto
export interface UserRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: File | null;
  roleId: string;
}

// DTO for receiving user data from the backend
export interface UserResponseDto {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  avatarUrl: string | null;

  status: AccountStatus;
  verified: boolean;

  emailConfirmedAt?: string | null;
  lastLoginAt?: string | null;

  deletionRequested: boolean;
  scheduledDeletionDate?: string | null;

  roleId: string;
  roleName: string;
  roleKey?: string;
  permissions?: PermissionKey[]; // ← ajout

  createdAt: string;
  updatedAt: string;

  profile?: ProfileResponseDto | null;

  profileCompleted?: boolean | null;
}

export interface UpdateRoleResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken?: string;
}