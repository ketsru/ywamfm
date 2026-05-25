// @/lib/types/iam/profiles/profile.types.ts

export interface ProfileRequestDto {
  phone?: string | null;
  address?: string | null;
  country?: string | null; // eg: "TG" or "Togo"
  city?: string | null;
  userId?: string; // UUID
}

export interface ProfileResponseDto {
  id: string;
  userId: string;

  phone?: string | null;
  address?: string | null;
  country?: string | null;
  city?: string | null;
}

export interface Profile extends ProfileResponseDto {}