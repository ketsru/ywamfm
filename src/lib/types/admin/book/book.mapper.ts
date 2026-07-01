// ============================================================
// book.mapper.ts
// ============================================================

import { Book, BookRequest, BookApiDto } from "./book.types";

// ── Réponse API → type frontend ───────────────────────────────

export function mapApiToBook(raw: BookApiDto): Book {
  return {
    id: raw.id,
    title: raw.title,
    author: raw.author,
    summary: raw.summary ?? null,
    language: raw.language,
    image: toImageDataUri(raw.image),
    content: raw.content ?? null,
    isActive: raw.isActive,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export function mapApiToBookList(rawList: BookApiDto[]): Book[] {
  return rawList.map(mapApiToBook);
}

// ── Type frontend → requête API ───────────────────────────────

export function mapToBookApiRequest(
  data: Partial<Book> & { title: string; author: string; language: string; image: string }
): BookRequest {
  return {
    title: data.title.trim(),
    author: data.author.trim(),
    summary: data.summary?.trim() ?? null,
    language: data.language.trim(),
    image: stripDataUriPrefix(data.image),
    content: data.content?.trim() ?? null,
    isActive: data.isActive ?? true,
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