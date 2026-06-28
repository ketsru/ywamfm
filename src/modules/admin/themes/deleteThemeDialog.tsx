// deleteCategoryDialog.tsx
"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";


interface DeleteCategoryDialogProps {
  category: ThemeResponseDto;
}

export function DeleteThemeDialog({ category }: DeleteCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteCategoryById(category.id),
    onSuccess: () => {
      toast.success(`Catégorie "${category.name}" supprimée avec succès.`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpen(false);
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
    },
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => setOpen(true)}
            aria-label="Supprimer la catégorie"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Supprimer la catégorie</p>
        </TooltipContent>
      </Tooltip>

      <ConfirmDeleteDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => mutate()}
        title="Supprimer la catégorie ?"
        description={`Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ? Cette action est irréversible.`}
        itemName={category.name}
        loading={isPending}
      />
    </>
  );
}

function deleteCategoryById(id: any): Promise<unknown> {
    throw new Error("Function not implemented.");
}
