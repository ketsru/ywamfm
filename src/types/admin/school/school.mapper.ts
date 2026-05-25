// ============================================================
// register-school.mapper.ts
// ============================================================

import {
  RegisterSchool,
  RegisterSchoolRequest,
  SchoolCategory,
  SchoolStatus,
  SchoolType,
} from "./school.types";

// ── Réponse API → type frontend ───────────────────────────────

export function mapApiToSchool(raw: Record<string, unknown>): RegisterSchool {
  return {
    id: raw.id as string,
    departmentId: raw.departmentId as string,
    departmentName: (raw.departmentName as string) ?? "",
    name: raw.name as string,
    type: raw.type as SchoolType,
    category: raw.category as SchoolCategory,
    price: raw.price != null ? (raw.price as number) : null,
    status: raw.status as SchoolStatus,
    duration: raw.duration as number,
    createdAt: raw.createdAt as string,
    updatedAt: raw.updatedAt as string,
  };
}

export function mapApiToSchoolList(
  rawList: Record<string, unknown>[]
): RegisterSchool[] {
  return rawList.map(mapApiToSchool);
}

// ── Type frontend → requête API ───────────────────────────────

export function mapToSchoolApiRequest(
  data: Partial<RegisterSchool> & {
    departmentId: string;
    name: string;
    type: SchoolType;
    category: SchoolCategory;
    status: SchoolStatus;
    duration: number;
  }
): RegisterSchoolRequest {
  return {
    departmentId: data.departmentId,
    name: data.name.trim(),
    type: data.type,
    category: data.category,
    price: data.price ?? null,
    status: data.status,
    duration: data.duration,
  };
}