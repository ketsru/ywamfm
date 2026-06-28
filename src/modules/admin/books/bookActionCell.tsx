// @/modules/books/components/BookActionsCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Book } from "@/lib/types/admin/book/book.types";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

interface Props {
  book:           Book;
  onEdit?:        (b: Book) => void;
  onToggleActive?(id: string, value: boolean): void;
  onDelete?:      (id: string) => void;
}

export function BookActionsCell({ book, onEdit, onToggleActive, onDelete }: Props) {
  const actions: ActionItem<Book>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (b) => onEdit?.(b),
    },
    {
      label:    book.isActive ? "Désactiver" : "Activer",
      icon:     book.isActive
                  ? <ToggleLeft  className="mr-2 h-4 w-4" />
                  : <ToggleRight className="mr-2 h-4 w-4" />,
      onSelect: (b) => onToggleActive?.(b.id, !b.isActive),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (b) => onDelete?.(b.id),
      confirm: {
        title:       () => "Supprimer ce livre ?",
        itemName:    (b) => b.title,
        description: (b) =>
          `Le livre "${b.title}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={book} actions={actions} menuWidth="w-48" />;
}