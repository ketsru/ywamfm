import { Role, RoleResponseDto } from "./role.types";

export const mapRoleDtoToModel = (dto: RoleResponseDto): Role => ({
  id: dto.id,
  key: dto.key,
  name: dto.name,
  description: dto.description ?? null,
  active: dto.active,
  permissions: dto.permissions ?? [],
});