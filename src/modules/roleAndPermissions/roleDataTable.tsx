"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Role } from "@/lib/types/access/role/role.types";
import { RoleService } from "@/lib/types/access/role/role.service";
import { columns } from "./columnDef";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { RoleFormDialog } from "./roleFormDialog";

export function RoleDataTable() {
  const queryClient = useQueryClient();

  // ── Pagination state ──────────────────────────────────────
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  // ── Dialog state : création/édition ──────────────────────────
  const [formOpen, setFormOpen]     = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  // ── Dialog state : suppression ───────────────────────────────
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | undefined>();

  // ── Query ─────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ["access", "roles", page, size],
    queryFn: () => RoleService.getAll({ page, size }),
  });

  const roles = data?.content ?? [];

  // ── Mutations ─────────────────────────────────────────────
  const invalidateRoles = () =>
    queryClient.invalidateQueries({ queryKey: ["access", "roles"] });

  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => RoleService.delete(id),
    onSuccess: () => {
      invalidateRoles();
      toast.success("Rôle supprimé.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  const { mutate: toggleActive } = useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) =>
      value ? RoleService.activate(id) : RoleService.deactivate(id),
    onSuccess: () => {
      invalidateRoles();
      toast.success("Statut du rôle mis à jour.");
    },
    onError: (err) => handleApiError(err),
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (r: Role) => {
    setSelectedRole(r);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedRole(undefined);
    setFormOpen(true);
  };

  const handleToggleActive = (id: string, value: boolean) => {
    toggleActive({ id, value });
  };

  const handleDeleteRequest = (id: string) => {
    setRoleToDelete(roles.find((r) => r.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des rôles…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des rôles.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={columns({
          onEdit:         handleEdit,
          onToggleActive: handleToggleActive,
          onDelete:       handleDeleteRequest,
        })}
        data={roles}
        filterColumn="name"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un rôle
          </Button>
        }
      />

      <RoleFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedRole(undefined);
        }}
        role={selectedRole}
        onSuccess={invalidateRoles}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => roleToDelete && doDelete(roleToDelete.id)}
        itemName={roleToDelete?.name}
        loading={isDeleting}
      />
    </>
  );
}