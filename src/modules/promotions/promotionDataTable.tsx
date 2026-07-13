// @/modules/promotions/components/PromotionDataTable.tsx
"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Promotion } from "@/lib/types/admin/promotion/promotion.types";
import { getAllSchools } from "@/lib/types/admin/school/school.service";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { PromotionFormDialog } from "./promotionFormDialog";
import {
    promotionKeys,
    usePromotionsQuery,
    useDeletePromotion,
    useUpdatePromotion,
 } from "@/lib/types/admin/promotion/promotion.hooks";
import { columns } from "./columnDef";


export function PromotionDataTable() {
  const queryClient = useQueryClient();

  // ── Dialog state ──────────────────────────────────────────
  const [formOpen, setFormOpen]                   = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | undefined>();
  const [deleteOpen, setDeleteOpen]               = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState<Promotion | undefined>();

  // ── Query : promotions ────────────────────────────────────
  const { data, isLoading, isError } = usePromotionsQuery();

  // ── Query : écoles (pour le select du formulaire) ───────────
  const { data: schoolsPage } = useQuery({
    queryKey: ["admin", "schools", "all"],
    queryFn: () => getAllSchools(undefined, { page: 0, size: 100 }),
  });

  const schools = schoolsPage?.content ?? [];

  // ── Mutations ─────────────────────────────────────────────
  const { mutate: toggleActive } = useUpdatePromotion();
  const { mutate: doDelete, isPending: isDeleting } = useDeletePromotion();

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (p: Promotion) => {
    setSelectedPromotion(p);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedPromotion(undefined);
    setFormOpen(true);
  };

  const handleToggleActive = (id: string, value: boolean) => {
    const promotion = data?.find((p) => p.id === id);
    if (!promotion) return;

    toggleActive(
      {
        id,
        data: {
          schoolId:    promotion.schoolId,
          name:        promotion.name,
          speciality:  promotion.speciality,
          description: promotion.description,
          isActive:    value,
        },
      },
      { onError: (err) => handleApiError(err) }
    );
  };

  const handleDeleteRequest = (id: string) => {
    setPromotionToDelete(data?.find((p) => p.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des promotions…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des promotions.
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
        data={data ?? []}
        filterColumn="name"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle promotion
          </Button>
        }
      />

      <PromotionFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedPromotion(undefined);
        }}
        promotion={selectedPromotion}
        schools={schools.map((s) => ({ id: s.id, name: s.name }))}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: promotionKeys.lists() })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => promotionToDelete && doDelete(promotionToDelete.id, {
          onSuccess: () => {
            toast.success("Promotion supprimée.");
            setDeleteOpen(false);
          },
          onError: (err) => handleApiError(err),
        })}
        itemName={promotionToDelete?.name}
        loading={isDeleting}
      />
    </>
  );
}