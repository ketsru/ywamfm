// @/modules/courses/components/columnDef.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { CourseListItem } from "@/lib/types/courses/course/course.types"
import { CourseActionsCell } from "./courseActionCell";

interface ColumnsProps {
  onEdit?:   (c: CourseListItem) => void;
  onDelete?: (id: string) => void;
}

export function columns({ onEdit, onDelete }: ColumnsProps): ColumnDef<CourseListItem>[] {
  return [
    {
      accessorKey: "titre",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="font-extrabold"
        >
          Titre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("titre")}</div>
      ),
    },
    {
      accessorKey: "promotionName",
      header: "Promotion",
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("promotionName")}</div>
      ),
    },
    {
      accessorKey: "planningName",
      header: "Planning",
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("planningName")}</div>
      ),
    },
    {
      accessorKey: "link",
      header: "Lien",
      cell: ({ row }) => {
        const link = row.getValue<string | null | undefined>("link");
        return link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 truncate max-w-[200px] inline-block"
          >
            {link}
          </a>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },
    {
      accessorKey: "hasContenuTexte",
      header: "Contenu",
      cell: ({ row }) => {
        const hasContenu = row.getValue<boolean>("hasContenuTexte");
        return (
          <Badge variant={hasContenu ? "default" : "secondary"}>
            {hasContenu ? "Disponible" : "Absent"}
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
        <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <CourseActionsCell
          course={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ]
}