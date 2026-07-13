// @/modules/departments/components/departmentColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Department } from "@/lib/types/admin/department/department.types";
import { DepartmentActionsCell } from "./departmentActionCell";

interface ColumnOptions {
  onEdit?:          (d: Department) => void;
  onToggleActive?:  (id: string, value: boolean) => void;
  onDelete?:        (id: string) => void;
}

export const departmentColumns = (opts: ColumnOptions): ColumnDef<Department>[] => [
  {
    id: "image",
    header: "",
    cell: ({ row }) => {
      const { imageUrl, name } = row.original;
      return imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-9 w-9 rounded-lg object-cover border shrink-0"
        />
      ) : (
        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
          —
        </div>
      );
    },
  },
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
      <DepartmentActionsCell
        department={row.original}
        onEdit={opts.onEdit}
        onToggleActive={opts.onToggleActive}
        onDelete={opts.onDelete}
      />
    ),
  },
];