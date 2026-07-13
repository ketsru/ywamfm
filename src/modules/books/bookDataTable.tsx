// @/modules/books/components/BookDataTable.tsx
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Book } from "@/lib/types/admin/book/book.types";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { BookFormDialog } from "./bookFormDialog";
import { bookKeys, useBooksQuery, useDeleteBook } from "@/lib/types/admin/book/book.hook";
import { bookColumns } from "./columnDef";

export function BookDataTable() {
  const queryClient = useQueryClient();

  const [formOpen, setFormOpen]         = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [deleteOpen, setDeleteOpen]     = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | undefined>();

  const { data, isLoading, isError } = useBooksQuery();
  //const { mutate: toggleActive } = useUpdateBook();
  const { mutate: doDelete, isPending: isDeleting } = useDeleteBook();

  const handleEdit = (b: Book) => {
    setSelectedBook(b);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedBook(undefined);
    setFormOpen(true);
  };

  const handleToggleActive = (id: string, value: boolean) => {
    const book = data?.find((b) => b.id === id);
    if (!book) return;

    // BookRequest.image est obligatoire (string base64 pur) — on renvoie l'image existante telle quelle
    toggleActive(
      {
        id,
        data: {
          title:    book.title,
          author:   book.author,
          summary:  book.summary,
          language: book.language,
          image:    book.image,
          content:  book.content,
          isActive: value,
        },
      },
      { onError: (err) => handleApiError(err) }
    );
  };

  const handleDeleteRequest = (id: string) => {
    setBookToDelete(data?.find((b) => b.id === id));
    setDeleteOpen(true);
  };

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
          onToggleActive: handleToggleActive,
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
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedBook(undefined);
        }}
        book={selectedBook}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: bookKeys.lists() })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => bookToDelete && doDelete(bookToDelete.id, {
          onSuccess: () => {
            toast.success("Livre supprimé.");
            setDeleteOpen(false);
          },
          onError: (err) => handleApiError(err),
        })}
        itemName={bookToDelete?.title}
        loading={isDeleting}
      />
    </>
  );
}

function toggleActive(arg0: { id: string; data: { title: string; author: string; summary: string | null | undefined; language: string; image: string; content: string | null | undefined; isActive: boolean; }; }, arg1: { onError: (err: any) => void; }) {
  throw new Error("Function not implemented.");
}
