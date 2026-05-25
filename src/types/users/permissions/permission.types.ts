// @/lib/types/iam/permissions/permission.types.ts

import { PermissionKey } from "./permisionKey";


// ------------- Permissions types -------------
export interface Permission {
    id: string;
    key: PermissionKey;
    label: string;
    active: boolean;
}

export interface PermissionRequestDto {
    label: string;
    active?: boolean;
}

export interface PermissionResponseDto {
    id: string;
    key: PermissionKey;
    label: string;
    active: boolean;
}

// ------------- Permission grants types for users ------------- 

export enum GrantSource {
    SUBSCRIPTION = "SUBSCRIPTION",
    MANUAL = "MANUAL",
    PROMOTION = "PROMOTION",
}

export interface UserPermissionGrant {
    id: string;

    userId: string;   
    permissionId: string;

    permissionKey: PermissionKey;

    sourceType: GrantSource;
    sourceId?: string | null;

    grantedAt: string;   
    expiresAt?: string | null;
    revokedAt?: string | null;

    active: boolean;
}

export interface GrantRequestDto {
    userId: string;      
    permissionKey: PermissionKey;
    sourceType: GrantSource;
    sourceId?: string | null;
    expiresAt?: string | null;
}

export interface GrantResponseDto {
    id: string;

    userId: string;
    permissionId: string;

    permissionKey: PermissionKey;

    sourceType: GrantSource;
    sourceId?: string | null;

    grantedAt: string;
    expiresAt?: string | null;
    revokedAt?: string | null;

    active: boolean;
}

