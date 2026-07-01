

// ============================================================
// planning.service.ts
// ============================================================
// Basé sur une convention d'URL supposée — PlanningController
// n'a pas été fourni. À confirmer avant utilisation.

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import { Planning, PlanningRequest } from "./planning.types";

const ENDPOINT = "/api/v1/plannings";

export const createPlanning = (data: PlanningRequest): Promise<Planning> =>
  post<PlanningRequest, Planning>(ENDPOINT, data);

export const getPlanningById = (id: string): Promise<Planning> =>
  get<Planning>(`${ENDPOINT}/${id}`);

export const getAllPlannings = (
  promotionId?: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<Planning>> =>
  get<PageResponseDto<Planning>>(ENDPOINT, {
    ...(promotionId && { promotionId }),
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

export const updatePlanning = (id: string, data: PlanningRequest): Promise<Planning> =>
  put<PlanningRequest, Planning>(`${ENDPOINT}/${id}`, data);

export const deletePlanning = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);