// ============================================================
// publish-school.mapper.ts
// ============================================================

import { PublishSchool, PublishSchoolRequest, PublishSchoolStatus } from "./publish-school.types";

// ── Réponse API → type frontend ───────────────────────────────

export function mapApiToPublishSchool(
  raw: Record<string, unknown>
): PublishSchool {
  return {
    id: raw.id as string,
    schoolId: raw.schoolId as string,
    schoolName: (raw.schoolName as string) ?? "",
    promotionId: raw.promotionId as string,
    promotionName: (raw.promotionName as string) ?? "",
    startDate: raw.startDate as string,
    endDate: raw.endDate as string,
    location: raw.location as string,
    description: (raw.description as string | null) ?? null,
    image: toImageDataUri(raw.image as string | null | undefined),
    status: raw.status as PublishSchoolStatus,
    createdAt: raw.createdAt as string,
    updatedAt: raw.updatedAt as string,
  };
}

export function mapApiToPublishSchoolList(
  rawList: Record<string, unknown>[]
): PublishSchool[] {
  return rawList.map(mapApiToPublishSchool);
}

// ── Type frontend → requête API ───────────────────────────────

export function mapToPublishSchoolApiRequest(
  data: Partial<PublishSchool> & {
    schoolId: string;
    promotionId: string;
    startDate: string;
    endDate: string;
    location: string;
    status: PublishSchoolStatus;
  }
): PublishSchoolRequest {
  return {
    schoolId: data.schoolId,
    promotionId: data.promotionId,
    startDate: data.startDate,
    endDate: data.endDate,
    location: data.location.trim(),
    description: data.description?.trim() ?? null,
    image: data.image ? stripDataUriPrefix(data.image) : null,
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