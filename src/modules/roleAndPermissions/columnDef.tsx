// src/modules/roles/columnDef.tsx

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Role, RoleKey } from "@/lib/types/access/role/role.types"


const ROLE_KEY_LABELS: Record<RoleKey, string> = {
  [RoleKey.ADMIN]: "Administrateur",
  [RoleKey.BTP_PROVIDER]: "Prestataire BTP",
  [RoleKey.SERVICE_SEEKER]: "Demandeur de service",
  [RoleKey.MATERIAL_SUPPLIER]: "Fournisseur de matériel",
  [RoleKey.TRAINING_CENTER]: "Centre de formation",
  [RoleKey.USER]: "Utilisateur",
}

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="font-extrabold"
      >
        Nom
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "key",
    header: "Clé",
    cell: ({ row }) => {
      const key = row.getValue("key") as RoleKey
      return (
        <Badge variant="outline" className="font-mono text-xs">
          {ROLE_KEY_LABELS[key] ?? key}
        </Badge>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | null
      return (
        <div className="max-w-[300px] truncate text-muted-foreground">
          {description ?? "—"}
        </div>
      )
    },
  },
  {
    id: "permissionsCount",
    accessorFn: (row) => row.permissions?.length ?? 0,
    header: "Permissions",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("permissionsCount")}
      </div>
    ),
  },
  {
    accessorKey: "active",
    header: "Statut",
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean
      return (
        <Badge variant={active ? "default" : "secondary"}>
          {active ? "Actif" : "Inactif"}
        </Badge>
      )
    },
  },
]