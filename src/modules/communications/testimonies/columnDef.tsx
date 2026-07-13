// @/modules/testimonies/components/testimonyColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TestimonyActionsCell } from "./testimonyActionCell";
import { Testimony } from "@/lib/types/communications/testimonies/testimony.types";

interface ColumnOptions {
  onApprove?: (id: string) => void;
  onReject?:  (id: string) => void;
  onDelete?:  (id: string) => void;
}

export const testimonyColumns = (opts: ColumnOptions): ColumnDef<Testimony>[] => [
  {
    id: "userImage",
    header: "",
    cell: ({ row }) => {
      const { userImage, userName } = row.original;
      return userImage ? (
        <img
          src={userImage}
          alt={userName}
          className="h-9 w-9 rounded-full object-cover border shrink-0"
        />
      ) : (
        <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
          {userName?.[0]?.toUpperCase() ?? "?"}
        </div>
      );
    },
  },
  {
    accessorKey: "userName",
    header: "Auteur",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.userName}</span>
    ),
  },
  {
    accessorKey: "domaine",
    header: "Domaine",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.domaine}</span>
    ),
  },
  {
    accessorKey: "content",
    header: "Témoignage",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground line-clamp-2 max-w-[300px]">
        {row.original.content}
      </span>
    ),
  },
  {
    accessorKey: "isApproved",
    header: "Statut",
    cell: ({ row }) => (
      <Badge variant={row.original.isApproved ? "default" : "secondary"}>
        {row.original.isApproved ? "Approuvé" : "En attente"}
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
      <TestimonyActionsCell
        testimony={row.original}
        onApprove={opts.onApprove}
        onReject={opts.onReject}
        onDelete={opts.onDelete}
      />
    ),
  },
];