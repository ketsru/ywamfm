// ============================================================
// promotion.mapper.ts
// ============================================================

import { Promotion, PromotionRequest } from "./promotion.types";

// ── Réponse API → type frontend ───────────────────────────────

export function mapApiToPromotion(raw: Record<string, unknown>): Promotion {
  return {
    id: raw.id as string,
    schoolId: raw.schoolId as string,
    schoolName: (raw.schoolName as string) ?? "",
    name: raw.name as string,
    speciality: raw.speciality as string,
    description: (raw.description as string | null) ?? null,
    isActive: raw.isActive as boolean,
    createdAt: raw.createdAt as string,
    updatedAt: raw.updatedAt as string,
  };
}

export function mapApiToPromotionList(
  rawList: Record<string, unknown>[]
): Promotion[] {
  return rawList.map(mapApiToPromotion);
}

// ── Type frontend → requête API ───────────────────────────────

export function mapToPromotionApiRequest(
  data: Partial<Promotion> & {
    schoolId: string;
    name: string;
    speciality: string;
  }
): PromotionRequest {
  return {
    schoolId: data.schoolId,
    name: data.name.trim(),
    speciality: data.speciality.trim(),
    description: data.description?.trim() ?? null,
    isActive: data.isActive ?? true,
  };
}