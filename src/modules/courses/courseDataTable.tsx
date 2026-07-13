// @/modules/courses/components/CourseDataTable.tsx
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { CourseFormDialog } from "./courseFormDIalog";
import { usePromotionsQuery } from "@/lib/types/admin/promotion/promotion.hooks";
import { CourseListItem } from "@/lib/types/courses/course/course.types";
import { courseKeys, useCoursesQuery, useDeleteCourse } from "@/lib/types/courses/course/course.hook";
import { usePlanningsQuery } from "@/lib/types/courses/plannings/planning.hook";
import { columns } from "./columnDef";

export function CourseDataTable() {
  const queryClient = useQueryClient();

  const [formOpen, setFormOpen]           = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseListItem | undefined>();
  const [deleteOpen, setDeleteOpen]       = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<CourseListItem | undefined>();

  const { data, isLoading, isError } = useCoursesQuery();
  const { data: promotionsData }     = usePromotionsQuery();
  const { data: planningsData }      = usePlanningsQuery();
  const { mutate: doDelete, isPending: isDeleting } = useDeleteCourse();

  const courses = data?.content ?? [];

  const handleEdit = (c: CourseListItem) => {
    setSelectedCourse(c);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedCourse(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setCourseToDelete(courses.find((c) => c.id === id));
    setDeleteOpen(true);
  };

  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des cours…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des cours.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={columns({
          onEdit:   handleEdit,
          onDelete: handleDeleteRequest,
        })}
        data={courses}
        filterColumn="titre"  // "name" n'existe pas sur CourseListItem, "titre" est le bon champ texte
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau cours
          </Button>
        }
      />

      <CourseFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedCourse(undefined);
        }}
        course={selectedCourse}
        promotions={promotionsData ?? []}
        plannings={planningsData?.content ?? []}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: courseKeys.lists() })}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => courseToDelete && doDelete(courseToDelete.id, {
          onSuccess: () => {
            toast.success("Cours supprimé.");
            setDeleteOpen(false);
          },
          onError: (err) => handleApiError(err),
        })}
        itemName={courseToDelete?.titre ?? "ce cours"}
        loading={isDeleting}
      />
    </>
  );
}