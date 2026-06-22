// @/lib/types/iam/profiles/profile.types.ts

export type Sexe = "M" | "F" | "OTHER";

export type MaritalStatus =
  | "SINGLE"
  | "MARRIED"
  | "DIVORCED"
  | "WIDOWED"
  | "SEPARATED";

export interface ProfileRequestDto {
  // ── Contact ──────────────────────────────────────────────
  /** Indicatif pays, ex: "+228", "+33" */
  countryCode?: string | null;
  /** Numéro local sans indicatif, ex: "90123456" */
  phone?: string | null;
  address?: string | null;
  country?: string | null;
  city?: string | null;

  // ── Démographie ──────────────────────────────────────────
  sexe?: Sexe | null;
  maritalStatus?: MaritalStatus | null;
  /** Format ISO 8601: "YYYY-MM-DD" — doit être dans le passé */
  birthDate?: string | null;

  // ── Admin only ───────────────────────────────────────────
  /** Ignoré si l'appelant n'est pas ADMIN */
  userId?: string; // UUID
}

export interface ProfileResponseDto {
  id: string; // UUID
  userId: string; // UUID

  // ── Contact ──────────────────────────────────────────────
  countryCode?: string | null;
  phone?: string | null;
  /** Numéro complet reconstitué, ex: "+22890123456" */
  fullPhone?: string | null;
  address?: string | null;
  country?: string | null;
  city?: string | null;

  // ── Démographie ──────────────────────────────────────────
  sexe?: Sexe | null;
  maritalStatus?: MaritalStatus | null;
  /** Format ISO 8601: "YYYY-MM-DD" */
  birthDate?: string | null;
  /** Âge calculé côté serveur, jamais stocké */
  age?: number | null;
}

export interface Profile extends ProfileResponseDto {}