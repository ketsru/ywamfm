
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { getDepartmentNameById } from "@/components/data/admin/department"
import { RegisterSchool } from "@/types/admin/register_school"

export const columns: ColumnDef<RegisterSchool>[] = [
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
        accessorKey: "departement_id",
        header: "Département",
        cell: ({ row }) => {
            const departementId = row.getValue<string>("departement_id")
            const departmentName = getDepartmentNameById(departementId)

            return (
            <div className="font-medium">
                {departmentName}
            </div>
            )
        },
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate text-muted-foreground">
                {row.getValue("type")}
            </div>
        ),
    },
    {
        accessorKey: "categorie",
        header: "Categorie",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("categorie")}</div>
        ),
    },
    {
        accessorKey: "prix",
        header: "Prix",
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate text-muted-foreground">
                {row.getValue("prix")}
            </div>
        ),
    },
    {
        accessorKey: "duree",
        header: "Durée",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("duree")}</div>
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
