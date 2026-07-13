// @/modules/plannings/components/PlanningDataTable.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { columns } from "./columnDef";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { Planning } from "@/lib/types/courses/plannings/planning.types";
import { deletePlanning, getAllPlannings } from "@/lib/types/courses/plannings/planning.service";
import { PlanningFormDialog } from "./planningFormDialog";
import { usePromotionsQuery } from "@/lib/types/admin/promotion/promotion.hooks";
import { useBooksQuery } from "@/lib/types/admin/book/book.hook";
import { usePreachersQuery } from "@/lib/types/admin/preacher/preacher.hook";
import { useThemesQuery } from "@/lib/types/admin/theme/theme.hook";


export function PlanningDataTable() {
  const queryClient = useQueryClient();

  // ── Pagination state ──────────────────────────────────────
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  // ── Dialog state : édition ──────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPlanning, setSelectedPlanning] = useState<Planning | undefined>();

  // ── Dialog state : suppression ───────────────────────────────
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [planningToDelete, setPlanningToDelete] = useState<Planning | undefined>();

  // ── Query : plannings ────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ["school", "plannings", page, size],
    queryFn: () => getAllPlannings(undefined, { page, size }),
  });

  const plannings = data?.content ?? [];

  // ── Queries : options des selects du formulaire ────────────────
  const { data: promotions = [] } = usePromotionsQuery();
  const { data: themes     = [] } = useThemesQuery();
  const { data: preachers  = [] } = usePreachersQuery();
  const { data: books      = [] } = useBooksQuery();

  // ── Mutations ─────────────────────────────────────────────
  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deletePlanning(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school", "plannings"] });
      toast.success("Planning supprimé.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (p: Planning) => {
    setSelectedPlanning(p);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedPlanning(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setPlanningToDelete(plannings.find((p) => p.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des plannings…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des plannings.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={columns({
          onEdit:   handleEdit,
          onDelete: handleDeleteRequest,
        })}
        data={plannings}
        filterColumn="name"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau planning
          </Button>
        }
      />

      <PlanningFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedPlanning(undefined);
        }}
        planning={selectedPlanning}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["school", "plannings"] })}
        promotions={promotions.map((p) => ({ id: p.id, name: p.name }))}
        themes={themes.map((t) => ({ id: t.id, name: t.name }))}
        preachers={preachers.map((p) => ({
          id: p.id,
          fullName: `${p.firstName} ${p.lastName}`,
        }))}
        books={books.map((b) => ({ id: b.id, title: b.title }))}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => planningToDelete && doDelete(planningToDelete.id)}
        itemName={planningToDelete?.name}
        loading={isDeleting}
      />
    </>
  );
}