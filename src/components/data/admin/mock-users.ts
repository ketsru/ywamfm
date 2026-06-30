// mock-users.ts

import { PermissionKey } from "@/lib/types/access/permissions/permisionKey";
import { RoleKey } from "@/lib/types/access/role/role.types";
import { ProfileResponseDto } from "@/lib/types/users/profile/profile.types";
import { 
    User,
    UserResponseDto,
    UpdateRoleResponseDto,
    AccountStatus,
 } from "@/lib/types/users/user/user.types";


export const mockUsers: User[] = [
  {
    id: "11111111-2222-3333-4444-555555555555",
    email: "alice@example.com",
    firstName: "Alice",
    lastName: "Dupont",
    avatarUrl: "https://example.com/avatar/alice.png",
    status: AccountStatus.ACTIVE,
    verified: true,
    emailConfirmedAt: "2026-05-01T09:00:00.000Z",
    lastLoginAt: "2026-06-25T14:30:00.000Z",
    deletionRequested: false,
    scheduledDeletionDate: null,
    roleId: "role-001",
    roleName: "Administrateur",
    roleKey: RoleKey.ADMIN,
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-06-20T10:00:00.000Z",
    profile: {
      id: "profile-001",
      userId: "11111111-2222-3333-4444-555555555555",
      countryCode: "+228",
      phone: "90000000",
      fullPhone: "+22890000000",
      address: "Quartier Tokoin",
      country: "Togo",
      city: "Lomé",
      sexe: "F",
      maritalStatus: "SINGLE",
      birthDate: "1995-03-12",
      age: 31,
    } as ProfileResponseDto,
    permissions: [PermissionKey.USER_VIEW, PermissionKey.USER_UPDATE],
    profileCompleted: true,
  },
  {
    id: "66666666-7777-8888-9999-000000000000",
    email: "bob@example.com",
    firstName: "Bob",
    lastName: "Kossi",
    avatarUrl: null,
    status: AccountStatus.SUSPENDED,
    verified: false,
    emailConfirmedAt: null,
    lastLoginAt: "2026-06-10T11:00:00.000Z",
    deletionRequested: true,
    scheduledDeletionDate: "2026-07-15T00:00:00.000Z",
    roleId: "role-002",
    roleName: "Utilisateur",
    roleKey: RoleKey.USER,
    createdAt: "2026-05-05T09:30:00.000Z",
    updatedAt: "2026-06-15T12:00:00.000Z",
    profile: null,
    permissions: [PermissionKey.USER_VIEW_SELF],
    profileCompleted: false,
  },
  {
    id: "abcd1234-ef56-7890-abcd-1234567890ef",
    email: "charlie@example.com",
    firstName: "Charlie",
    lastName: "Mensah",
    avatarUrl: "https://example.com/avatar/charlie.png",
    status: AccountStatus.PENDING_VALIDATION,
    verified: false,
    emailConfirmedAt: null,
    lastLoginAt: null,
    deletionRequested: false,
    scheduledDeletionDate: null,
    roleId: "role-003",
    roleName: "Centre de formation",
    roleKey: RoleKey.TRAINING_CENTER,
    createdAt: "2026-06-01T07:00:00.000Z",
    updatedAt: "2026-06-28T09:00:00.000Z",
    profile: {
      id: "profile-003",
      userId: "abcd1234-ef56-7890-abcd-1234567890ef",
      countryCode: "+228",
      phone: "91111111",
      fullPhone: "+22891111111",
      address: "Quartier Bè",
      country: "Togo",
      city: "Lomé",
      sexe: "M",
      maritalStatus: "MARRIED",
      birthDate: "1988-11-02",
      age: 37,
    } as ProfileResponseDto,
    permissions: [PermissionKey.USER_VIEW, PermissionKey.USER_DELETE],
    profileCompleted: true,
  },
];

// Exemple de UserResponseDto
export const mockUserResponse: UserResponseDto = {
  ...mockUsers[0],
} as UserResponseDto;

// Exemple de UpdateRoleResponseDto
export const mockUpdateRoleResponse: UpdateRoleResponseDto = {
  user: mockUserResponse,
  accessToken: "mock-access-token-123",
  refreshToken: "mock-refresh-token-456",
};