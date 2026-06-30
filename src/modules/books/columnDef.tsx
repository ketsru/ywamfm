// @/modules/books/components/bookColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/lib/types/admin/book/book.types";
import { BookActionsCell } from "./bookActionCell";

interface ColumnOptions {
  onEdit?:         (b: Book) => void;
  onToggleActive?: (id: string, value: boolean) => void;
  onDelete?:       (id: string) => void;
}

export const bookColumns = (opts: ColumnOptions): ColumnDef<Book>[] => [
  {
    id: "cover",
    header: "",
    cell: ({ row }) => {
      const { image, title } = row.original;
      return image ? (
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt={title}
          className="h-12 w-9 rounded object-cover border shrink-0"
        />
      ) : (
        <div className="h-12 w-9 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
          —
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{row.original.title}</p>
        <p className="text-xs text-muted-foreground truncate">{row.original.author}</p>
      </div>
    ),
  },
  {
    accessorKey: "language",
    header: "Langue",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.language}</span>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Statut",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"}>
        {row.original.isActive ? "Actif" : "Inactif"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString("fr-FR")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <BookActionsCell
        book={row.original}
        onEdit={opts.onEdit}
        onToggleActive={opts.onToggleActive}
        onDelete={opts.onDelete}
      />
    ),
  },
];