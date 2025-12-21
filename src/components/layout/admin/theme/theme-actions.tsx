"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Eye, Pen, Trash2Icon, MoreHorizontal } from "lucide-react"
import { Theme } from "@/types/admin/theme"

export function ThemeActionsCell({ theme }: { theme: Theme }) {
  const [openEdit, setOpenEdit] = useState(false)

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => console.log("view", theme)}>
            <Eye className="mr-2 h-4 w-4" />
            Voir
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            <Pen className="mr-2 h-4 w-4" />
            Modifier
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => console.log("delete", theme)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sheet d’édition 
      <EditCategorySheet
        category={category}
        open={openEdit}
        onOpenChange={setOpenEdit}
      />*/}
    </div>
  )
}
