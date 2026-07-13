// @/lib/types/iam/users/user.types.ts

import { PermissionKey } from "../../access/permissions/permisionKey";
import { ProfileResponseDto } from "../profile/profile.types";

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

// Création/édition par un admin — pas d'avatar : createManagedAccount/updateManagedAccount
// sont consumes=JSON côté back, aucun champ multipart possible ici.
export interface UserRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  roleKey: string;
}

// Placeholder — à aligner sur le vrai UserUpdateSelfRequest.java
// (probablement pas de roleId ici, un utilisateur ne peut pas changer son propre rôle)
export interface UserUpdateSelfRequest {
  firstName: string;
  lastName: string;
}

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
  permissions?: PermissionKey[];
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