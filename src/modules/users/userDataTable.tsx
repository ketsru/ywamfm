"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { User } from "@/lib/types/users/user/user.types";
import { columns } from "./columnDef";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { UserFormDialog } from "./userFormDialog";
import { UserService } from "@/lib/types/users/user/user.service";

export function UserDataTable() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const [formOpen, setFormOpen]     = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | undefined>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["iam", "users", page, size],
    queryFn: () => UserService.getAll({ page, size }),
  });

  const users = data?.content ?? [];

  const invalidateUsers = () =>
    queryClient.invalidateQueries({ queryKey: ["iam", "users"] });

  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => UserService.delete(id),
    onSuccess: () => {
      invalidateUsers();
      toast.success("Utilisateur supprimé.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  const { mutate: toggleActive } = useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) =>
      value ? UserService.activate(id) : UserService.deactivate(id),
    onSuccess: () => {
      invalidateUsers();
      toast.success("Statut mis à jour.");
    },
    onError: (err) => handleApiError(err),
  });

  const handleEdit = (u: User) => {
    setSelectedUser(u);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setUserToDelete(users.find((u) => u.id === id));
    setDeleteOpen(true);
  };

  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des utilisateurs…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des utilisateurs.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={columns({
          onEdit:         handleEdit,
          onToggleActive: (id, value) => toggleActive({ id, value }),
          onDelete:       handleDeleteRequest,
        })}
        data={users}
        filterColumn="email"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un utilisateur
          </Button>
        }
      />

      <UserFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedUser(undefined);
        }}
        user={selectedUser}
        onSuccess={invalidateUsers}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => userToDelete && doDelete(userToDelete.id)}
        itemName={userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : undefined}
        loading={isDeleting}
      />
    </>
  );
}