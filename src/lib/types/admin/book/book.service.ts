// ============================================================
// book.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { BookApiDto, BookRequest, BookFilters } from "./book.types";

const ENDPOINT = "/api/v1/books";

// ── CREATE ────────────────────────────────────────────────────
export const createBook = (data: BookRequest): Promise<BookApiDto> =>
  post<BookRequest, BookApiDto>(ENDPOINT, data);

// ── READ ONE ──────────────────────────────────────────────────
export const getBookById = (id: string): Promise<BookApiDto> =>
  get<BookApiDto>(`${ENDPOINT}/${id}`);

// ── READ ALL (avec filtres) ───────────────────────────────────
export const getAllBooks = (filters?: BookFilters): Promise<BookApiDto[]> =>
  get<BookApiDto[]>(ENDPOINT, {
    ...(filters?.title?.trim()    && { title:      filters.title.trim() }),
    ...(filters?.author?.trim()   && { author:     filters.author.trim() }),
    ...(filters?.language?.trim() && { language:   filters.language.trim() }),
    ...(filters?.activeOnly       && { activeOnly: true }),
  });

// ── SEARCH par titre (endpoint dédié /search) ─────────────────
export const searchBooksByTitle = (title: string): Promise<BookApiDto[]> =>
  get<BookApiDto[]>(`${ENDPOINT}/search`, { title: title.trim() });

// ── UPDATE ────────────────────────────────────────────────────
export const updateBook = (id: string, data: BookRequest): Promise<BookApiDto> =>
  put<BookRequest, BookApiDto>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteBook = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);