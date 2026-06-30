import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Course } from "@/lib/types/courses/course/course.types"

export const columns: ColumnDef<Course>[] = [
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
  /*{
    accessorKey: "departement_id",
    header: "Département",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("departement_id")}</div>
    ),
  },*/
  {
    accessorKey: "orateur_id",
    header: "Orateur",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("orateur_id")}</div>
    ),
  },
  {
    accessorKey: "theme_id",
    header: "Thème",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("theme_id")}</div>
    ),
  },
  {
    accessorKey: "school_id",
    header: "École",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("school_id")}</div>
    ),
  },
  {
    accessorKey: "promotion_id",
    header: "Promotion",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("promotion_id")}</div>
    ),
  },
  {
    accessorKey: "created_at",
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
      <div>{new Date(row.getValue("created_at")).toLocaleDateString()}</div>
    ),
  },
]
