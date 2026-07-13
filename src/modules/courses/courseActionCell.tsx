// @/modules/courses/components/CourseActionsCell.tsx
"use client";

import { CourseListItem } from "@/lib/types/courses/course/course.types";
import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  course:    CourseListItem;
  onEdit?:   (c: CourseListItem) => void;
  onDelete?: (id: string) => void;
}

export function CourseActionsCell({ course, onEdit, onDelete }: Props) {
  const actions: ActionItem<CourseListItem>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (c) => onEdit?.(c),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (c) => onDelete?.(c.id),
      confirm: {
        title:       () => "Supprimer ce cours ?",
        itemName:    (c) => c.titre,
        description: (c) =>
          `Le cours "${c.titre}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={course} actions={actions} menuWidth="w-48" />;
}