
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { getDepartmentNameById } from "@/components/data/admin/department"
import { RegisterOutreach } from "@/types/admin/register_outreach"
import Image from "next/image"

export const columns: ColumnDef<RegisterOutreach>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
        <Image
            src={row.getValue("image")}
            alt="Register outreach"
            width={100}
            height={100}
            className="h-10 w-10 rounded-md object-cover"
        />
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
