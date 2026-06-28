// ============================================================
// register-outreach.mapper.ts
// ============================================================

import {
  RegisterOutreach,
  RegisterOutreachRequest,
  OutreachCategory,
  OutreachStatus,
} from "./outreach.types";

// ── Réponse API → type frontend ───────────────────────────────

export function mapApiToOutreach(
  raw: Record<string, unknown>
): RegisterOutreach {
  return {
    id: raw.id as string,
    departmentId: raw.departmentId as string,
    departmentName: (raw.departmentName as string) ?? "",
    category: raw.category as OutreachCategory,
    image: toImageDataUri(raw.image as string | null | undefined),
    status: raw.status as OutreachStatus,
    createdAt: raw.createdAt as string,
    updatedAt: raw.updatedAt as string,
  };
}

export function mapApiToOutreachList(
  rawList: Record<string, unknown>[]
): RegisterOutreach[] {
  return rawList.map(mapApiToOutreach);
}

// ── Type frontend → requête API ───────────────────────────────

export function mapToOutreachApiRequest(
  data: Partial<RegisterOutreach> & {
    departmentId: string;
    category: OutreachCategory;
    image: string;
    status: OutreachStatus;
  }
): RegisterOutreachRequest {
  return {
    departmentId: data.departmentId,
    category: data.category,
    image: stripDataUriPrefix(data.image),
    status: data.status,
  };
}

// ── Helpers image ─────────────────────────────────────────────

export function toImageDataUri(
  base64: string | null | undefined,
  mimeType = "image/jpeg"
): string {
  if (!base64) return "";
  if (base64.startsWith("data:")) return base64;
  return `data:${mimeType};base64,${base64}`;
}

export function stripDataUriPrefix(dataUri: string): string {
  const match = dataUri.match(/^data:[^;]+;base64,(.+)$/);
  return match ? match[1] : dataUri;
}

export function fileToBase64DataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Lecture du fichier échouée"));
    reader.readAsDataURL(file);
  });
}