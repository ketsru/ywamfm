import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Eye, Pen, Trash2 } from "lucide-react"
import { Livre } from "@/types/admin/livre"
import Image from "next/image"

export const columns: ColumnDef<Livre>[] = [
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
    accessorKey: "auteur",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="font-extrabold"
      >
        Auteur
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("auteur")}</div>,
  },
  {
    accessorKey: "langue",
    header: "Langue",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("langue")}</span>
    ),
  },
  {
    accessorKey: "resume",
    header: "Résumé",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate text-muted-foreground">
        {row.getValue("resume") || "—"}
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) =>
      row.getValue("image") ? (
        <Image
          src={row.getValue("image")}
          alt="Livre"
          width={100}
          height={100}
          className="h-10 w-10 rounded-md object-cover"
        />
      ) : (
        <span className="text-muted-foreground">Aucune</span>
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const livre = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Voir
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Pen className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
