// ============================================================
// promotion.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import {
  Promotion,
  PromotionRequest,
  PromotionFilters,
  PromotionBySchoolFilters,
} from "./promotion.types";

const ENDPOINT = "/api/v1/promotions";

// ── CREATE ────────────────────────────────────────────────────
export const createPromotion = (data: PromotionRequest): Promise<Promotion> =>
  post<PromotionRequest, Promotion>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getPromotionById = (id: string): Promise<Promotion> =>
  get<Promotion>(`${ENDPOINT}/${id}`);

// ── READ ALL (activeOnly optionnel) ───────────────────────────
export const getAllPromotions = (filters?: PromotionFilters): Promise<Promotion[]> =>
  get<Promotion[]>(ENDPOINT, {
    ...(filters?.activeOnly && { activeOnly: true }),
  });

// ── READ BY SCHOOL ────────────────────────────────────────────
export const getPromotionsBySchool = (
  schoolId: string,
  filters?: PromotionBySchoolFilters
): Promise<Promotion[]> =>
  get<Promotion[]>(`${ENDPOINT}/school/${schoolId}`, {
    ...(filters?.activeOnly && { activeOnly: true }),
  });

// ── UPDATE ────────────────────────────────────────────────────
export const updatePromotion = (id: string, data: PromotionRequest): Promise<Promotion> =>
  put<PromotionRequest, Promotion>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deletePromotion = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);