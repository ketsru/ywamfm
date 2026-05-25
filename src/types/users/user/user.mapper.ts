import { User, UserResponseDto } from "./user.types";

// user.mapper.ts
export const mapUserDtoToModel = (dto: UserResponseDto): User => ({
  id: dto.id,
  email: dto.email,
  firstName: dto.firstName,
  lastName: dto.lastName,
  avatarUrl: dto.avatarUrl ?? null,
  status: dto.status,
  verified: dto.verified,
  emailConfirmedAt: dto.emailConfirmedAt ?? null,
  lastLoginAt: dto.lastLoginAt ?? null,
  deletionRequested: dto.deletionRequested,
  scheduledDeletionDate: dto.scheduledDeletionDate ?? null,
  roleId: dto.roleId,
  roleName: dto.roleName,
  roleKey: dto.roleKey,
  permissions: dto.permissions ?? [], 
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
  profile: dto.profile ?? null,
});