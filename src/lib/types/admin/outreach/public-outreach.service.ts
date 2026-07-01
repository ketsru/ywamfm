// ============================================================
// public-outreach.service.ts
// ============================================================
// Vitrine publique — aucune authentification requise.
// N'expose que les missions terrain actuellement actives (statut ACTIVE).

import { get } from "@/lib/api/core/apifetch";
import { RegisterOutreach } from "./outreach.types";

const ENDPOINT = "/api/v1/outreaches/public";

// ── LISTE DES MISSIONS ACTIVES ──────────────────────────────────
export const listActivePublicOutreaches = (): Promise<RegisterOutreach[]> =>
  get<RegisterOutreach[]>(ENDPOINT);

// ── DÉTAIL D'UNE MISSION ACTIVE ─────────────────────────────────
export const getActivePublicOutreachById = (id: string): Promise<RegisterOutreach> =>
  get<RegisterOutreach>(`${ENDPOINT}/${id}`);