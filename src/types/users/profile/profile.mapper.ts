import { Profile, ProfileResponseDto } from "./profile.types";

export const mapProfileDtoToModel = (dto: ProfileResponseDto): Profile => ({
  id: dto.id,
  userId: dto.userId,

  phone: dto.phone ?? null,
  address: dto.address ?? null,
  country: dto.country ?? null,
  city: dto.city ?? null,
});