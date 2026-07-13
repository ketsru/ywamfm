// @/modules/plannings/components/columnDef.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { PlanningActionsCell } from "./planningActionCell"
import { Planning } from "@/lib/types/courses/plannings/planning.types"

interface ColumnsProps {
  onEdit?:   (p: Planning) => void
  onDelete?: (id: string) => void
}

export function columns({ onEdit, onDelete }: ColumnsProps): ColumnDef<Planning>[] {
  return [
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
      accessorKey: "promotionName",
      header: "Promotion",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("promotionName")}</div>
      ),
    },
    {
      accessorKey: "semaine",
      header: "Semaine",
      cell: ({ row }) => (
        <div className="font-medium">#{row.getValue("semaine")}</div>
      ),
    },
    {
      accessorKey: "themeName",
      header: "Thème",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("themeName")}</div>
      ),
    },
    {
      accessorKey: "preacherFullName",
      header: "Orateur",
      cell: ({ row }) => {
        const preacher = row.getValue<string | null>("preacherFullName")
        return (
          <div className="max-w-[300px] truncate text-muted-foreground">
            {preacher ?? "—"}
          </div>
        )
      },
    },
    {
      accessorKey: "bookTitle",
      header: "Livre",
      cell: ({ row }) => {
        const book = row.getValue<string | null>("bookTitle")
        return (
          <div className="max-w-[300px] truncate text-muted-foreground">
            {book ?? "—"}
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="font-extrabold"
        >
          Créé le
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("createdAt")).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Modifié le",
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("updatedAt")).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <PlanningActionsCell
          planning={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ]
}
