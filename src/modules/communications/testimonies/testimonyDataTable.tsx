// @/modules/testimonies/components/TestimonyDataTable.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { testimonyColumns } from "./columnDef";
import { TestimonyFormDialog } from "./testimonyFormDialog";
import { getAllTestimonies, approveTestimony, rejectTestimony, adminDeleteTestimony } from "@/lib/types/communications/testimonies/testimony.service";
import { Testimony } from "@/lib/types/communications/testimonies/testimony.types";

export function TestimonyDataTable() {
  const queryClient = useQueryClient();

  // ── Pagination state ──────────────────────────────────────
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  // ── Dialog state : suppression ───────────────────────────────
  const [deleteOpen, setDeleteOpen]                 = useState(false);
  const [testimonyToDelete, setTestimonyToDelete]   = useState<Testimony | undefined>();

  // ── Query ─────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonies", "admin", page, size],
    queryFn: () => getAllTestimonies({ page, size }),
  });

  const testimonies = data?.content ?? [];

  // ── Mutations ─────────────────────────────────────────────
  const invalidateTestimonies = () =>
    queryClient.invalidateQueries({ queryKey: ["testimonies", "admin"] });

  const { mutate: doApprove } = useMutation({
    mutationFn: (id: string) => approveTestimony(id),
    onSuccess: () => {
      invalidateTestimonies();
      toast.success("Témoignage approuvé.");
    },
    onError: (err) => handleApiError(err),
  });

  const { mutate: doReject } = useMutation({
    mutationFn: (id: string) => rejectTestimony(id),
    onSuccess: () => {
      invalidateTestimonies();
      toast.success("Témoignage rejeté.");
    },
    onError: (err) => handleApiError(err),
  });

  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => adminDeleteTestimony(id),
    onSuccess: () => {
      invalidateTestimonies();
      toast.success("Témoignage supprimé.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleDeleteRequest = (id: string) => {
    setTestimonyToDelete(testimonies.find((t) => t.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des témoignages…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des témoignages.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={testimonyColumns({
          onApprove: doApprove,
          onReject:  doReject,
          onDelete:  handleDeleteRequest,
        })}
        data={testimonies}
        filterColumn="userName"
        actions={
          <TestimonyFormDialog
            triggerLabel="Nouveau témoignage"
            onSuccess={invalidateTestimonies}
          />
        }
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => testimonyToDelete && doDelete(testimonyToDelete.id)}
        itemName={testimonyToDelete?.userName}
        loading={isDeleting}
      />
    </>
  );
}