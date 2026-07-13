// @/modules/themes/components/ThemeDataTable.tsx
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { ThemeFormDialog } from "./themeFormDialog";
import { themeKeys, useThemesQuery, useDeleteTheme } from "@/lib/types/admin/theme/theme.hook";
import { themeColumns } from "./columnDef";

export function ThemeDataTable() {
  const queryClient = useQueryClient();

  const [formOpen, setFormOpen]           = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeResponseDto | undefined>();
  const [deleteOpen, setDeleteOpen]       = useState(false);
  const [themeToDelete, setThemeToDelete] = useState<ThemeResponseDto | undefined>();

  const { data, isLoading, isError } = useThemesQuery();
  const { mutate: doDelete, isPending: isDeleting } = useDeleteTheme();

  const handleEdit = (t: ThemeResponseDto) => {
    setSelectedTheme(t);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedTheme(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setThemeToDelete(data?.find((t) => t.id === id));
    setDeleteOpen(true);
  };

  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des thèmes…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des thèmes.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={themeColumns({
          onEdit:   handleEdit,
          onDelete: handleDeleteRequest,
        })}
        data={data ?? []}
        filterColumn="name"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau thème
          </Button>
        }
      />

      <ThemeFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedTheme(undefined);
        }}
        theme={selectedTheme}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: themeKeys.lists() })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => themeToDelete && doDelete(themeToDelete.id, {
          onSuccess: () => {
            toast.success("Thème supprimé.");
            setDeleteOpen(false);
          },
          onError: (err) => handleApiError(err),
        })}
        itemName={themeToDelete?.name}
        loading={isDeleting}
      />
    </>
  );
}