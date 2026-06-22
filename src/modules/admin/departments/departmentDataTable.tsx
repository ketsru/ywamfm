// @/modules/departments/components/DepartmentDataTable.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Department } from "@/types/admin/department/department.types";
import { deleteDepartment, getAllDepartments, updateDepartment } from "@/types/admin/department/department.service";
import { departmentColumns } from "./columnDef";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { DepartmentFormDialog } from "./departmentFormDialog";

export function DepartmentDataTable() {
  const queryClient = useQueryClient();

  // ── Dialog state ──────────────────────────────────────────
  const [formOpen, setFormOpen]             = useState(false);
  const [selectedDept, setSelectedDept]     = useState<Department | undefined>();
  const [deleteOpen, setDeleteOpen]         = useState(false);
  const [deptToDelete, setDeptToDelete]     = useState<Department | undefined>();

  // ── Query ─────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery<Department[]>({
    queryKey: ["admin", "departments"],
    queryFn:  () => getAllDepartments(),
  });

  // ── Mutations ─────────────────────────────────────────────
  const { mutate: toggleActive } = useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) =>
      updateDepartment(id, { name: data?.find((d) => d.id === id)?.name ?? "", isActive: value }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "departments"] }),
    onError:   (err) => handleApiError(err),
  });

  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "departments"] });
      toast.success("Département supprimé.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (d: Department) => {
    setSelectedDept(d);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedDept(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setDeptToDelete(data?.find((d) => d.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des départements…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des départements.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={departmentColumns({
          onEdit:         handleEdit,
          onToggleActive: (id, value) => toggleActive({ id, value }),
          onDelete:       handleDeleteRequest,
        })}
        data={data ?? []}
        filterColumn="name"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau département
          </Button>
        }
      />

      <DepartmentFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedDept(undefined);
        }}
        department={selectedDept}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["admin", "departments"] })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => deptToDelete && doDelete(deptToDelete.id)}
        itemName={deptToDelete?.name}
        loading={isDeleting}
      />
    </>
  );
}