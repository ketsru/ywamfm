// editCategoryDialog.tsx
"use client";

import { useState } from "react";
import { SquarePen } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ThemeForm } from "@/components/layout/forms/metier/themeForm";

interface EditCategoryDialogProps {
  category: ThemeResponseDto;
}

export function EditThemeDialog({ category }: EditCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    setOpen(false);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <SquarePen className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Modifier la catégorie</p>
        </TooltipContent>
      </Tooltip>

      <CrudDialog
        title="Modifier la catégorie"
        description="Mettre à jour les informations de la catégorie."
        open={open}
        onOpenChange={setOpen}
      >
        <ThemeForm formId={""} onSubmit={function (data: { name: string; description?: string | null | undefined; }): void {
                          throw new Error("Function not implemented.");
                      } } />
      </CrudDialog>
    </>
  );
}