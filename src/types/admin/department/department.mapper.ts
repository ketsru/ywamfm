// ============================================================
// department.mapper.ts
// ============================================================
//
// Responsabilité : transformer les données brutes de l'API
// (snake_case, byte[], dates ISO) vers les types frontend,
// et inversement (FormData / state → DepartmentRequest).
// ============================================================

import { Department, DepartmentRequest } from "./department.types";

// ── Réponse API → type frontend ───────────────────────────────

/**
 * Mappe un objet brut retourné par le backend vers le type `Department`.
 * Le backend sérialise le champ `image` (byte[]) en base64.
 * On préfixe avec le data-URI si nécessaire pour l'affichage <img>.
 */
export function mapApiToDepartment(raw: Record<string, unknown>): Department {
  const imageRaw = raw.image as string | null | undefined;

  return {
    id: raw.id as string,
    name: raw.name as string,
    description: (raw.description as string | null) ?? null,
    image: toImageDataUri(imageRaw),
    isActive: raw.isActive as boolean,
    createdAt: raw.createdAt as string,
    updatedAt: raw.updatedAt as string,
  };
}

/**
 * Mappe un tableau de réponses brutes.
 */
export function mapApiToDepartmentList(
  rawList: Record<string, unknown>[]
): Department[] {
  return rawList.map(mapApiToDepartment);
}

// ── Type frontend → requête API ───────────────────────────────

/**
 * Prépare un `DepartmentRequest` à envoyer au backend.
 * Si l'image est un data-URI (ex: "data:image/png;base64,…"), on extrait
 * uniquement la partie base64 pure avant envoi.
 */
export function mapToApiRequest(
  data: Partial<Department> & { name: string }
): DepartmentRequest {
  return {
    name: data.name.trim(),
    description: data.description?.trim() ?? null,
    image: data.image ? stripDataUriPrefix(data.image) : null,
    isActive: data.isActive ?? true,
  };
}

// ── Helpers image ─────────────────────────────────────────────

/**
 * Convertit une chaîne base64 (ou data-URI) en data-URI affichable.
 * Si la chaîne est déjà un data-URI valide, elle est retournée telle quelle.
 */
export function toImageDataUri(
  base64: string | null | undefined,
  mimeType = "image/jpeg"
): string {
  if (!base64) return "";
  if (base64.startsWith("data:")) return base64;
  return `data:${mimeType};base64,${base64}`;
}

/**
 * Retire le préfixe "data:<mime>;base64," d'un data-URI.
 * Retourne la chaîne inchangée si ce n'est pas un data-URI.
 */
export function stripDataUriPrefix(dataUri: string): string {
  const match = dataUri.match(/^data:[^;]+;base64,(.+)$/);
  return match ? match[1] : dataUri;
}

/**
 * Lit un `File` (upload navigateur) et le convertit en data-URI base64.
 */
export function fileToBase64DataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Lecture du fichier échouée"));
    reader.readAsDataURL(file);
  });
}