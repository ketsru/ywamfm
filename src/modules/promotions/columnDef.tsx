// @/modules/promotions/components/columnDef.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Promotion } from "@/lib/types/admin/promotion/promotion.types"
import { PromotionActionsCell } from "./promotionActionCell";

interface ColumnsProps {
  onEdit?:         (p: Promotion) => void;
  onToggleActive?: (id: string, value: boolean) => void;
  onDelete?:       (id: string) => void;
}

export function columns({ onEdit, onToggleActive, onDelete }: ColumnsProps): ColumnDef<Promotion>[] {
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
      accessorKey: "speciality",
      header: "Spécialité",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate text-muted-foreground">
          {row.getValue("speciality")}
        </div>
      ),
    },
    {
      accessorKey: "schoolName",
      header: "École",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("schoolName")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue<string | null | undefined>("description");
        return (
          <div className="max-w-[300px] truncate text-muted-foreground">
            {description || "—"}
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Statut",
      cell: ({ row }) => {
        const isActive = row.getValue<boolean>("isActive");
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
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
      id: "actions",
      cell: ({ row }) => (
        <PromotionActionsCell
          promotion={row.original}
          onEdit={onEdit}
          onToggleActive={onToggleActive}
          onDelete={onDelete}
        />
      ),
    },
  ]
}