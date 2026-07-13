"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { columns } from "./columnDef";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { RapportResponseDto } from "@/lib/types/courses/rapport/rapport.types";
import { RapportFormDialog } from "./rapportFormDialog";
import { RapportGradeDialog } from "./rapportGradeDialog";
import {
  useAllRapports,
  useAdminDeleteRapport,
  rapportKeys,
} from "@/lib/types/courses/rapport/rapport.hooks";
import { useSchoolsQuery } from "@/lib/types/admin/school/school.hook";

export function RapportDataTable() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [size]          = useState(10);

  const [formOpen, setFormOpen]               = useState(false);
  const [selectedRapport, setSelectedRapport] = useState<RapportResponseDto | undefined>();
  const [deleteOpen, setDeleteOpen]           = useState(false);
  const [rapportToDelete, setRapportToDelete] = useState<RapportResponseDto | undefined>();
  const [gradeOpen, setGradeOpen]             = useState(false);
  const [rapportToGrade, setRapportToGrade]   = useState<RapportResponseDto | undefined>();

  const { data, isLoading, isError } = useAllRapports(undefined, { page, size });
  const rapports = data?.content ?? [];

  // useSchoolsQuery retourne RegisterSchool[] directement (pas de pagination)
  const { data: schools = [] } = useSchoolsQuery();
  const schoolOptions = schools.map((s) => ({ id: s.id, name: s.name }));

  const { mutate: doDelete, isPending: isDeleting } = useAdminDeleteRapport(() => {
    setDeleteOpen(false);
  });

  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des rapports…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des rapports.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={columns({
          onEdit:   (r) => { setSelectedRapport(r); setFormOpen(true); },
          onDelete: (id) => {
            setRapportToDelete(rapports.find((r) => r.id === id));
            setDeleteOpen(true);
          },
          onGrade:  (r) => { setRapportToGrade(r); setGradeOpen(true); },
        })}
        data={rapports}
        filterColumn="nomLivre"
        actions={
          <Button size="sm" onClick={() => { setSelectedRapport(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau rapport
          </Button>
        }
      />

      <RapportFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedRapport(undefined);
        }}
        rapport={selectedRapport}
        schools={schoolOptions}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: rapportKeys.all })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => rapportToDelete && doDelete(rapportToDelete.id)}
        itemName={
          rapportToDelete
            ? `${rapportToDelete.nomLivre} — ${rapportToDelete.auteur}`
            : undefined
        }
        loading={isDeleting}
      />

      <RapportGradeDialog
        open={gradeOpen}
        onOpenChange={(open) => {
          setGradeOpen(open);
          if (!open) setRapportToGrade(undefined);
        }}
        rapport={rapportToGrade}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: rapportKeys.all })}
      />
    </>
  );
}