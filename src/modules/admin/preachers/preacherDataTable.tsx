// @/modules/preachers/components/PreacherDataTable.tsx
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Preacher } from "@/types/admin/preacher/preacher.types";
import { deletePreacher } from "@/types/admin/preacher/preacher.service";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { PreacherFormDialog } from "./preacherFormDialog";
import { preacherKeys, useDeletePreacher, usePreachersQuery } from "@/types/admin/preacher/preacher.hook";
import { preacherColumns } from "./columnDef";

export function PreacherDataTable() {
  const queryClient = useQueryClient();

  // ── Dialog state ──────────────────────────────────────────
  const [formOpen, setFormOpen]                 = useState(false);
  const [selectedPreacher, setSelectedPreacher] = useState<Preacher | undefined>();
  const [deleteOpen, setDeleteOpen]             = useState(false);
  const [preacherToDelete, setPreacherToDelete] = useState<Preacher | undefined>();

  // ── Query ─────────────────────────────────────────────────
  const { data, isLoading, isError } = usePreachersQuery();

  // ── Mutation ──────────────────────────────────────────────
  const { mutate: doDelete, isPending: isDeleting } = useDeletePreacher();

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (p: Preacher) => {
    setSelectedPreacher(p);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedPreacher(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setPreacherToDelete(data?.find((p) => p.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des prédicateurs…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des prédicateurs.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={preacherColumns({
          onEdit:   handleEdit,
          onDelete: handleDeleteRequest,
        })}
        data={data ?? []}
        filterColumn="name"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau prédicateur
          </Button>
        }
      />

      <PreacherFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedPreacher(undefined);
        }}
        preacher={selectedPreacher}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: preacherKeys.lists() })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => preacherToDelete && doDelete(preacherToDelete.id, {
          onSuccess: () => {
            toast.success("Prédicateur supprimé.");
            setDeleteOpen(false);
          },
          onError: (err) => handleApiError(err),
        })}
        itemName={preacherToDelete?.name}
        loading={isDeleting}
      />
    </>
  );
}