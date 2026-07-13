// @/modules/schools/components/RegisterSchoolActionsCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { RegisterSchool } from "@/lib/types/admin/school/school.types";
import { Pencil, Trash2, Megaphone } from "lucide-react";

interface Props {
  school:    RegisterSchool;
  onEdit?:   (s: RegisterSchool) => void;
  onDelete?: (id: string) => void;
  onPublish?: (s: RegisterSchool) => void;
}

export function RegisterSchoolActionsCell({ school, onEdit, onDelete, onPublish }: Props) {
  const actions: ActionItem<RegisterSchool>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (s) => onEdit?.(s),
    },
    {
      label:    "Publier",
      icon:     <Megaphone className="mr-2 h-4 w-4" />,
      onSelect: (s) => onPublish?.(s),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (s) => onDelete?.(s.id),
      confirm: {
        title:       () => "Supprimer cette école ?",
        itemName:    (s) => s.name,
        description: (s) =>
          `L'école "${s.name}" sera supprimée définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={school} actions={actions} menuWidth="w-48" />;
}