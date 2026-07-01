// ============================================================
// public-school.service.ts
// ============================================================
// Vitrine publique — aucune authentification requise.
// N'expose que les formations actuellement actives.

import { get } from "@/lib/api/core/apifetch";
import { PublishSchool } from "./publish-school.types";

const ENDPOINT = "/api/v1/schools/public";

// ── LISTE DES FORMATIONS ACTIVES ────────────────────────────────
export const listActivePublicSchools = (): Promise<PublishSchool[]> =>
  get<PublishSchool[]>(ENDPOINT);

// ── DÉTAIL D'UNE FORMATION ACTIVE ───────────────────────────────
export const getActivePublicSchoolById = (id: string): Promise<PublishSchool> =>
  get<PublishSchool>(`${ENDPOINT}/${id}`);