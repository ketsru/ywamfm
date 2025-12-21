
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Orateur } from "@/types/admin/orateur"

export const columns: ColumnDef<Orateur>[] = [
    {
        accessorKey: "nom",
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
        <div className="font-medium">{row.getValue("nom")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("email")}</div>
        ),
    },

    {
        accessorKey: "telephone",
        header: "Téléphone",
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate text-muted-foreground">
                {row.getValue("telephone")}
            </div>
        ),
    },
    {
        accessorKey: "origine",
        header: "Origine",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("origine")}</div>
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
            <div>
                {new Date(row.getValue("created_at")).toLocaleDateString()}
            </div>
        ),
    },
]
