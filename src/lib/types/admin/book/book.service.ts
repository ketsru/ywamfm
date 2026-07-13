// ============================================================
// book.service.ts
// ============================================================

import { get, postFormData, putFormData, del, patchFormData } from "@/lib/api/core/apifetch";
import { buildMultipartFormData } from "@/lib/api/core/form-data.util";
import { BookApiDto, BookRequest, BookFilters } from "./book.types";

const ENDPOINT = "/api/v1/books";

// ── CREATE (multipart obligatoire : data + image optionnelle) ───────────────
export const createBook = (data: BookRequest): Promise<BookApiDto> =>
  postFormData<BookApiDto>(ENDPOINT, buildMultipartFormData(data));

// ── READ ONE ───────────────────────────────────────────────────────────────
export const getBookById = (id: string): Promise<BookApiDto> =>
  get<BookApiDto>(`${ENDPOINT}/${id}`);

// ── READ ALL (avec filtres optionnels) ─────────────────────────────────────
export const getAllBooks = (filters?: BookFilters): Promise<BookApiDto[]> =>
  get<BookApiDto[]>(ENDPOINT, {
    ...(filters?.title?.trim()    && { title:      filters.title.trim() }),
    ...(filters?.author?.trim()   && { author:     filters.author.trim() }),
    ...(filters?.language?.trim() && { language:   filters.language.trim() }),
    ...(filters?.activeOnly       && { activeOnly: true }),
  });

// ── SEARCH par titre (endpoint dédié /search) ──────────────────────────────
export const searchBooksByTitle = (title: string): Promise<BookApiDto[]> =>
  get<BookApiDto[]>(`${ENDPOINT}/search`, { title: title.trim() });

// ── UPDATE (données + image en un seul appel) ──────────────────────────────
export const updateBook = (id: string, data: BookRequest): Promise<BookApiDto> =>
  putFormData<BookApiDto>(`${ENDPOINT}/${id}`, buildMultipartFormData(data));

// ── UPDATE IMAGE SEULE ─────────────────────────────────────────────────────
// endpoint dédié : PATCH /{id}/image, image obligatoire (pas de "data")
export const updateBookImage = (id: string, image: File): Promise<BookApiDto> => {
  const formData = new FormData();
  formData.append("image", image);
  return patchFormData<BookApiDto>(`${ENDPOINT}/${id}/image`, formData);
};

// ── DELETE ────────────────────────────────────────────────────────────────
export const deleteBook = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);
