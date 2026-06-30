import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Journal } from "@/lib/types/courses/journal/journal.types"

export const columns: ColumnDef<Journal>[] = [
    {
        accessorKey: "nom_orateur",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="font-extrabold"
            >
                Orateur
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("nom_orateur")}</div>,
    },
    {
        accessorKey: "origine_orateur",
        header: "Origine",
        cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("origine_orateur")}</div>,
    },
    {
        accessorKey: "theme_semaine",
        header: "Thème de la semaine",
        cell: ({ row }) => <div className="font-medium">{row.getValue("theme_semaine")}</div>,
    },
    {
        accessorKey: "impact",
        header: "Impact",
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate text-muted-foreground">
                {row.getValue("impact")}
            </div>
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
