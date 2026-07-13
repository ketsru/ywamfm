import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import {
  RegisterOutreach,
  OutreachCategory,
  OutreachStatus,
  OUTREACH_CATEGORY_LABELS,
  OUTREACH_STATUS_LABELS,
} from "@/lib/types/admin/outreach/outreach.types"
import { RegisterOutreachActionsCell } from "./outreachActionCell"

interface ColumnsProps {
  onEdit?:   (o: RegisterOutreach) => void;
  onDelete?: (id: string) => void;
}

const categoryVariant: Record<OutreachCategory, "default" | "secondary" | "outline"> = {
  ECOLE:       "default",
  INDEPENDANT: "secondary",
}

const statusVariant: Record<OutreachStatus, "default" | "secondary" | "destructive" | "outline"> = {
  EN_ATTENTE: "secondary",
  ANNULEE:    "destructive",
  TERMINEE:   "outline",
}

export function columns({ onEdit, onDelete }: ColumnsProps): ColumnDef<RegisterOutreach>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
        <div className="text-muted-foreground">{row.getValue("departmentName")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Catégorie",
      cell: ({ row }) => {
        const cat = row.getValue("category") as OutreachCategory
        return (
          <Badge variant={categoryVariant[cat] ?? "outline"}>
            {OUTREACH_CATEGORY_LABELS[cat]}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as OutreachStatus
        return (
          <Badge variant={statusVariant[status] ?? "outline"}>
            {OUTREACH_STATUS_LABELS[status]}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-extrabold"
        >
          Créé le
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm">
          {new Date(row.getValue("createdAt")).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <RegisterOutreachActionsCell
          outreach={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ]
}