// @/modules/schools/components/SchoolDataTable.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { RegisterSchool } from "@/lib/types/admin/school/school.types";
import { columns } from "./columnDef";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { deleteSchool, getAllSchools } from "@/lib/types/admin/school/school.service";
import { getAllDepartments } from "@/lib/types/admin/department/department.service";
import { RegisterSchoolFormDialog } from "./schoolFormDialog";
import { PublishSchoolFormDialog } from "./publishSchoolFormDialog";

export function SchoolDataTable() {
  const queryClient = useQueryClient();

  // ── Pagination state ──────────────────────────────────────
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  // ── Dialog state : édition ──────────────────────────────────
  const [formOpen, setFormOpen]       = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<RegisterSchool | undefined>();

  // ── Dialog state : suppression ───────────────────────────────
  const [deleteOpen, setDeleteOpen]   = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<RegisterSchool | undefined>();

  // ── Dialog state : publication ────────────────────────────────
  const [publishOpen, setPublishOpen] = useState(false);
  const [schoolToPublish, setSchoolToPublish] = useState<RegisterSchool | undefined>();

  // ── Query : écoles ────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "schools", page, size],
    queryFn: () => getAllSchools(undefined, { page, size }),
  });

  const schools = data?.content ?? [];

  // ── Query : départements ────────────────────────────────────
  const { data: departments = [] } = useQuery({
    queryKey: ["admin", "departments", "all"],
    queryFn: () => getAllDepartments(),
  });

  // ── Mutations ─────────────────────────────────────────────
  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteSchool(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "schools"] });
      toast.success("École supprimée.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (s: RegisterSchool) => {
    setSelectedSchool(s);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedSchool(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setSchoolToDelete(schools.find((s) => s.id === id));
    setDeleteOpen(true);
  };

  const handlePublishRequest = (s: RegisterSchool) => {
    setSchoolToPublish(s);
    setPublishOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des écoles…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des écoles.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={columns({
          onEdit:    handleEdit,
          onDelete:  handleDeleteRequest,
          onPublish: handlePublishRequest,
        })}
        data={schools}
        filterColumn="name"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle école
          </Button>
        }
      />

      <RegisterSchoolFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedSchool(undefined);
        }}
        school={selectedSchool}
        departments={departments.map((d) => ({ id: d.id, name: d.name }))}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["admin", "schools"] })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => schoolToDelete && doDelete(schoolToDelete.id)}
        itemName={schoolToDelete?.name}
        loading={isDeleting}
      />

      <PublishSchoolFormDialog
        open={publishOpen}
        onOpenChange={(open) => {
          setPublishOpen(open);
          if (!open) setSchoolToPublish(undefined);
        }}
        school={schoolToPublish}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["admin", "publish-schools"] });
        }}
      />
    </>
  );
}