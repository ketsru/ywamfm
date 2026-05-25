// ============================================================
// preacher.mapper.ts
// ============================================================
//
// Pas d'image ni de byte[] pour Preacher : le mapper est plus
// simple que pour Department / Book.
// ============================================================

import { Preacher, PreacherRequest } from "./preacher.types";

// ── Réponse API → type frontend ───────────────────────────────

export function mapApiToPreacher(raw: Record<string, unknown>): Preacher {
  return {
    id: raw.id as string,
    name: raw.name as string,
    email: raw.email as string,
    origin: raw.origin as string,
    telephone: raw.telephone as string,
    speciality: raw.speciality as string,
    createdAt: raw.createdAt as string,
    updatedAt: raw.updatedAt as string,
  };
}

export function mapApiToPreacherList(
  rawList: Record<string, unknown>[]
): Preacher[] {
  return rawList.map(mapApiToPreacher);
}

// ── Type frontend → requête API ───────────────────────────────

export function mapToPreacherApiRequest(
  data: Partial<Preacher> & {
    name: string;
    email: string;
    origin: string;
    telephone: string;
    speciality: string;
  }
): PreacherRequest {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    origin: data.origin.trim(),
    telephone: data.telephone.trim(),
    speciality: data.speciality.trim(),
  };
}