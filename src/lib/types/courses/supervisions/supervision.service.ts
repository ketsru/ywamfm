// ============================================================
// supervision.service.ts
// ============================================================

import { get, post, del } from "@/lib/api/core/apifetch";
import { SupervisionResponseDto, SupervisionAssignRequest } from "./supervision.types";

const ENDPOINT = "/api/v1/supervisions";

// ── Assigner une supervision ──────────────────────────────────
export const assignSupervision = (
  data: SupervisionAssignRequest
): Promise<SupervisionResponseDto> =>
  post<SupervisionAssignRequest, SupervisionResponseDto>(ENDPOINT, data);

// ── Révoquer une supervision ──────────────────────────────────
export const revokeSupervision = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);

// ── Supervisions d'un étudiant donné ──────────────────────────
export const getSupervisionsByStudent = (
  studentId: string
): Promise<SupervisionResponseDto[]> =>
  get<SupervisionResponseDto[]>(`${ENDPOINT}/student/${studentId}`);

// ── Mes étudiants supervisés (superviseur courant) ─────────────
export const getMySupervisedStudents = (): Promise<SupervisionResponseDto[]> =>
  get<SupervisionResponseDto[]>(`${ENDPOINT}/me`);

// ── Supervisions d'une promotion donnée ───────────────────────
export const getSupervisionsByPromotion = (
  promotionId: string
): Promise<SupervisionResponseDto[]> =>
  get<SupervisionResponseDto[]>(`${ENDPOINT}/promotion/${promotionId}`);