// @/modules/themes/components/themeColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";
import { ThemeActionsCell } from "./themeActionCell";

interface ColumnOptions {
  onEdit?:         (t: ThemeResponseDto) => void;
  onDelete?:       (id: string) => void;
}

export const themeColumns = (opts: ColumnOptions): ColumnDef<ThemeResponseDto>[] => [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground line-clamp-2">
        {row.original.description ?? "—"}
      </span>
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
    accessorKey: "updatedAt",
    header: "Mis à jour le",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.updatedAt).toLocaleDateString("fr-FR")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ThemeActionsCell
        theme={row.original}
        onEdit={opts.onEdit}
        onDelete={opts.onDelete}
      />
    ),
  },
];
