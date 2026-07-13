// @/modules/outreaches/components/OutreachDataTable.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { RegisterOutreach } from "@/lib/types/admin/outreach/outreach.types";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { deleteOutreach, getAllOutreaches } from "@/lib/types/admin/outreach/outreach.service";
import { getAllDepartments } from "@/lib/types/admin/department/department.service";
import { RegisterOutreachFormDialog } from "./outreachFormDialog";
import { columns } from "./columnDef";

export function OutreachDataTable() {
  const queryClient = useQueryClient();

  // ── Pagination state ──────────────────────────────────────
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  // ── Dialog state ──────────────────────────────────────────
  const [formOpen, setFormOpen]           = useState(false);
  const [selectedOutreach, setSelectedOutreach] = useState<RegisterOutreach | undefined>();
  const [deleteOpen, setDeleteOpen]       = useState(false);
  const [outreachToDelete, setOutreachToDelete] = useState<RegisterOutreach | undefined>();

  // ── Query : outreaches ─────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "outreaches", page, size],
    queryFn: () => getAllOutreaches(undefined, { page, size }),
  });

  const outreaches = data?.content ?? [];

  // ── Query : départements (pour le select du formulaire) ─────
  const { data: departments = [] } = useQuery({
    queryKey: ["admin", "departments", "all"],
    queryFn: () => getAllDepartments(),
  });

  // ── Mutations ─────────────────────────────────────────────
  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteOutreach(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "outreaches"] });
      toast.success("Outreach supprimé.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (o: RegisterOutreach) => {
    setSelectedOutreach(o);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedOutreach(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setOutreachToDelete(outreaches.find((o) => o.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des outreaches…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des outreaches.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={columns({
          onEdit:   handleEdit,
          onDelete: handleDeleteRequest,
        })}
        data={outreaches}
        filterColumn="departmentName"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel outreach
          </Button>
        }
      />

      <RegisterOutreachFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedOutreach(undefined);
        }}
        outreach={selectedOutreach}
        departments={departments.map((d) => ({ id: d.id, name: d.name }))}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["admin", "outreaches"] })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => outreachToDelete && doDelete(outreachToDelete.id)}
        itemName={
          outreachToDelete
            ? `${outreachToDelete.departmentName}`
            : undefined
        }
        loading={isDeleting}
      />
    </>
  );
}