// ============================================================
// book.types.ts
// ============================================================

export interface Book {
  id: string; // UUID
  title: string;
  author: string;
  summary?: string | null;
  language: string;
  image: string; // base64 data-URI (converti depuis byte[] backend)
  content?: string | null;
  isActive: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface BookRequest {
  title: string;
  author: string;
  summary?: string | null;
  language: string;
  image: string; // base64 brut (sans préfixe data-URI)
  content?: string | null;
  isActive?: boolean;
}

export interface BookFilters {
  activeOnly?: boolean;
  title?: string;
  author?: string;
  language?: string;
}

export interface BookState {
  books: Book[];
  selectedBook: Book | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}