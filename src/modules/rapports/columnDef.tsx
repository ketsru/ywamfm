// @/modules/rapports/components/columnDef.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { RapportResponseDto } from "@/lib/types/courses/rapport/rapport.types"
import { RapportActionsCell } from "./rapportActionCell"
import { formatRapportDate, formatGrade, getRapportGradeStatus } from "@/lib/types/courses/rapport/rapport.mapper"

interface ColumnsProps {
  onEdit?:   (r: RapportResponseDto) => void;
  onDelete?: (id: string) => void;
  onGrade?:  (r: RapportResponseDto) => void;
}

export function columns({ onEdit, onDelete, onGrade }: ColumnsProps): ColumnDef<RapportResponseDto>[] {
  return [
    {
      accessorKey: "nomLivre",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="font-extrabold">
          Livre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("nomLivre")}</div>
          <div className="text-xs text-muted-foreground">{row.original.auteur}</div>
        </div>
      ),
    },
    {
      accessorKey: "studentFullName",
      header: "Étudiant",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("studentFullName")}</div>
          <div className="text-xs text-muted-foreground">{row.original.studentEmail}</div>
        </div>
      ),
    },
    {
      accessorKey: "schoolName",
      header: "École",
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("schoolName")}</div>
      ),
    },
    {
      id: "gradeStatus",
      header: "Notation",
      cell: ({ row }) => {
        const status = getRapportGradeStatus(row.original)
        return status === "graded" ? (
          <Badge variant="default">{formatGrade((row.original as any).grade)}</Badge>
        ) : (
          <Badge variant="secondary">En attente</Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="font-extrabold">
          Créé le
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {formatRapportDate(row.getValue("createdAt"))}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <RapportActionsCell
          rapport={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          onGrade={onGrade}
        />
      ),
    },
  ]
}