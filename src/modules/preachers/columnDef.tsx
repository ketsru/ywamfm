// @/modules/preachers/components/preacherColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Preacher } from "@/lib/types/admin/preacher/preacher.types";
import { PreacherActionsCell } from "./preacherActionCell";

interface ColumnOptions {
  onEdit?:   (p: Preacher) => void;
  onDelete?: (id: string) => void;
}

export const preacherColumns = (opts: ColumnOptions): ColumnDef<Preacher>[] => [
  {
    id: "fullName",
    header: "Nom complet",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return (
        <span className="text-sm font-medium">
          {`${firstName} ${lastName}`}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "telephone",
    header: "Téléphone",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.telephone ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "speciality",
    header: "Spécialité",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.speciality ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "origin",
    header: "Origine",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.origin ?? "—"}
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <PreacherActionsCell
        preacher={row.original}
        onEdit={opts.onEdit}
        onDelete={opts.onDelete}
      />
    ),
  },
];