import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"
import { RegisterOutreach, OUTREACH_CATEGORY_LABELS, OUTREACH_STATUS_LABELS } from "@/lib/types/admin/outreach/outreach.types"

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
    accessorKey: "departmentName",
    header: "Département",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("departmentName")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Catégorie",
    cell: ({ row }) => (
      <div className="font-medium">
        {OUTREACH_CATEGORY_LABELS[row.getValue("category") as keyof typeof OUTREACH_CATEGORY_LABELS]}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <div className="font-medium">
        {OUTREACH_STATUS_LABELS[row.getValue("status") as keyof typeof OUTREACH_STATUS_LABELS]}
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
]
