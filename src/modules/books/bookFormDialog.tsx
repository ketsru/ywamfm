// @/modules/books/components/BookFormDialog.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { ValidationError } from "@/lib/api/core/http-errors";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { Book, BookRequest } from "@/lib/types/admin/book/book.types";
import { createBook, updateBook } from "@/lib/types/admin/book/book.service";
import { BookForm } from "@/components/layout/forms/metier/bookForm";

interface BookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book?: Book;
  onSuccess?: (book: Book) => void;
}

export function BookFormDialog({ open, onOpenChange, book, onSuccess }: BookFormDialogProps) {
  const isEdit = !!book;

  const [formData,     setFormData]     = React.useState<BookRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error,        setError]        = React.useState<string | undefined>();

  React.useEffect(() => {
    if (open) { setFormData(null); setError(undefined); }
  }, [open]);

  const handleConfirm = async () => {
    if (!formData?.title?.trim())  { setError("Le titre est obligatoire.");  return; }
    if (!formData?.author?.trim()) { setError("L'auteur est obligatoire."); return; }
    if (!formData?.language?.trim()) { setError("La langue est obligatoire."); return; }

    try {
      setIsSubmitting(true);
      setError(undefined);

      const result = isEdit
        ? await updateBook(book.id, formData)
        : await createBook(formData);

      toast.success(isEdit ? "Livre mis à jour." : "Livre créé.");
      onSuccess?.(result);
      onOpenChange(false);
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.errors[0]?.error ?? "Erreur de validation.");
      } else {
        handleApiError(err, { fallbackMessage: "Une erreur est survenue." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CrudDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Modifier le livre" : "Nouveau livre"}
      description={isEdit
        ? "Modifiez les informations du livre."
        : "Renseignez les informations du nouveau livre."
      }
      size="lg"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <BookForm defaultValues={book} onChange={setFormData} error={error} />
    </CrudDialog>
  );
}