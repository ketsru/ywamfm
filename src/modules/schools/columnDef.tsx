// @/modules/schools/components/columnDef.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { RegisterSchool, SCHOOL_TYPE_LABELS, SCHOOL_CATEGORY_LABELS, SCHOOL_STATUS_LABELS } from "@/lib/types/admin/school/school.types"
import { RegisterSchoolActionsCell } from "./schoolActionCell";

interface ColumnsProps {
  onEdit?:   (s: RegisterSchool) => void;
  onDelete?: (id: string) => void;
  onPublish?: (s: RegisterSchool) => void;
}

export function columns({ onEdit, onDelete, onPublish }: ColumnsProps): ColumnDef<RegisterSchool>[] {
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
      accessorKey: "departmentName",
      header: "Département",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("departmentName")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate text-muted-foreground">
          {SCHOOL_TYPE_LABELS[row.getValue("type") as keyof typeof SCHOOL_TYPE_LABELS]}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Catégorie",
      cell: ({ row }) => (
        <div className="font-medium">
          {SCHOOL_CATEGORY_LABELS[row.getValue("category") as keyof typeof SCHOOL_CATEGORY_LABELS]}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Prix",
      cell: ({ row }) => {
        const price = row.getValue<number>("price")
        return (
          <div className="max-w-[300px] truncate text-muted-foreground">
            {price ? `${price} €` : "—"}
          </div>
        )
      },
    },
    {
      accessorKey: "duration",
      header: "Durée (jours)",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("duration")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
        <div className="font-medium">
          {SCHOOL_STATUS_LABELS[row.getValue("status") as keyof typeof SCHOOL_STATUS_LABELS]}
        </div>
      ),
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
      id: "actions",
      cell: ({ row }) => (
        <RegisterSchoolActionsCell
          school={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          onPublish={onPublish}
        />
      ),
    },
  ]
}