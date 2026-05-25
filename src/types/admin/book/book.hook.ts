// ============================================================
// book.hooks.ts
// ============================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooksByTitle,
} from "./book.service";

import { mapApiToBook, mapApiToBookList } from "./book.mapper";
import { Book, BookFilters, BookRequest } from "./book.types";

// ── Clés de cache ─────────────────────────────────────────────
export const bookKeys = {
  all: ["books"] as const,
  lists: () => [...bookKeys.all, "list"] as const,
  list: (filters?: BookFilters) => [...bookKeys.lists(), filters ?? {}] as const,
  search: (title: string) => [...bookKeys.all, "search", title] as const,
  details: () => [...bookKeys.all, "detail"] as const,
  detail: (id: string) => [...bookKeys.details(), id] as const,
};

// ── READ ALL ──────────────────────────────────────────────────

/**
 * @example
 * useBooksQuery({ activeOnly: true })
 * useBooksQuery({ language: "français" })
 * useBooksQuery({ author: "paul" })
 */
export function useBooksQuery(
  filters?: BookFilters
): UseQueryResult<Book[], Error> {
  return useQuery({
    queryKey: bookKeys.list(filters),
    queryFn: async () => {
      const raw = await getAllBooks(filters);
      return mapApiToBookList(raw as unknown as Record<string, unknown>[]);
    },
  });
}

// ── SEARCH par titre (endpoint dédié) ─────────────────────────

export function useBookSearch(
  title: string
): UseQueryResult<Book[], Error> {
  return useQuery({
    queryKey: bookKeys.search(title),
    queryFn: async () => {
      const raw = await searchBooksByTitle(title);
      return mapApiToBookList(raw as unknown as Record<string, unknown>[]);
    },
    enabled: title.trim().length > 0,
  });
}

// ── READ ONE ──────────────────────────────────────────────────
export function useBookQuery(
  id: string | undefined
): UseQueryResult<Book, Error> {
  return useQuery({
    queryKey: bookKeys.detail(id ?? ""),
    queryFn: async () => {
      const raw = await getBookById(id!);
      return mapApiToBook(raw as unknown as Record<string, unknown>);
    },
    enabled: Boolean(id),
  });
}

// ── CREATE ────────────────────────────────────────────────────
export function useCreateBook(): UseMutationResult<Book, Error, BookRequest> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BookRequest) => {
      const raw = await createBook(data);
      return mapApiToBook(raw as unknown as Record<string, unknown>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
}

// ── UPDATE ────────────────────────────────────────────────────
export function useUpdateBook(): UseMutationResult<
  Book,
  Error,
  { id: string; data: BookRequest }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const raw = await updateBook(id, data);
      return mapApiToBook(raw as unknown as Record<string, unknown>);
    },
    onSuccess: (_updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookKeys.detail(id) });
    },
  });
}

// ── DELETE ────────────────────────────────────────────────────
export function useDeleteBook(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
}