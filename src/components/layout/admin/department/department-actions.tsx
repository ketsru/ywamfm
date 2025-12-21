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
import { Eye, Pen, Trash2Icon, MoreVertical } from "lucide-react"
import { Department } from "@/types/admin/department"

export function DepartmentActionsCell({ department }: { department: Department }) {
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
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => console.log("view", department)}>
            <Eye className="mr-2 h-4 w-4" />
            Voir
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            <Pen className="mr-2 h-4 w-4" />
            Modifier
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => console.log("delete", department)}
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
