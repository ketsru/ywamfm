// @/modules/books/components/BookDataTable.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { toast } from "sonner";
import { Book } from "@/types/admin/book/book.types";
import { deleteBook, getAllBooks, updateBook } from "@/types/admin/book/book.service";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { bookColumns } from "./columnDef";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { BookFormDialog } from "./bookFormDialog";

export function BookDataTable() {
  const queryClient = useQueryClient();

  const [formOpen,     setFormOpen]     = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [deleteOpen,   setDeleteOpen]   = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | undefined>();

  // ── Query ─────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery<Book[]>({
    queryKey: ["admin", "books"],
    queryFn:  () => getAllBooks(),
  });

  // ── Mutations ─────────────────────────────────────────────
  const { mutate: toggleActive } = useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) => {
      const book = data?.find((b) => b.id === id);
      if (!book) throw new Error("Livre introuvable.");
      return updateBook(id, {
        title:    book.title,
        author:   book.author,
        language: book.language,
        image:    book.image,
        isActive: value,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "books"] }),
    onError:   (err) => handleApiError(err),
  });

  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "books"] });
      toast.success("Livre supprimé.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (b: Book) => { setSelectedBook(b); setFormOpen(true); };
  const handleCreate = () => { setSelectedBook(undefined); setFormOpen(true); };
  const handleDeleteRequest = (id: string) => {
    setBookToDelete(data?.find((b) => b.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des livres…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des livres.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={bookColumns({
          onEdit:         handleEdit,
          onToggleActive: (id, value) => toggleActive({ id, value }),
          onDelete:       handleDeleteRequest,
        })}
        data={data ?? []}
        filterColumn="title"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau livre
          </Button>
        }
      />

      <BookFormDialog
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setSelectedBook(undefined); }}
        book={selectedBook}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["admin", "books"] })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => bookToDelete && doDelete(bookToDelete.id)}
        itemName={bookToDelete?.title}
        loading={isDeleting}
      />
    </>
  );
}