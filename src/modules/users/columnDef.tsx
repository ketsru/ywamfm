import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"
import { AccountStatus, User } from "@/lib/types/users/user/user.types"

const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  [AccountStatus.ACTIVE]: "Actif",
  [AccountStatus.SUSPENDED]: "Suspendu",
  [AccountStatus.PENDING_VALIDATION]: "En attente",
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "avatarUrl",
    header: "Avatar",
    cell: ({ row }) => {
      const avatarUrl = row.getValue("avatarUrl") as string | null
      return avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar utilisateur"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-muted" />
      )
    },
  },
  {
    id: "name",
    header: "Nom complet",
    cell: ({ row }) => (
        <div className="font-medium">
        {row.original.firstName} {row.original.lastName}
        </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "roleName",
    header: "Rôle",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("roleName")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <div className="font-medium">
        {ACCOUNT_STATUS_LABELS[row.getValue("status") as AccountStatus]}
      </div>
    ),
  },
  {
    accessorKey: "verified",
    header: "Vérifié",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("verified") ? "Oui" : "Non"}
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