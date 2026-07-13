// @/modules/plannings/components/planningActionCell.tsx
"use client";

import { Planning } from "@/lib/types/courses/plannings/planning.types";
import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  planning: Planning;
  onEdit?:   (p: Planning) => void;
  onDelete?: (id: string) => void;
}

export function PlanningActionsCell({ planning, onEdit, onDelete }: Props) {
  const actions: ActionItem<Planning>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (p) => onEdit?.(p),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (p) => onDelete?.(p.id),
      confirm: {
        title:       () => "Supprimer ce planning ?",
        itemName:    (p) => p.name,
        description: (p) =>
          `Le planning "${p.name}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={planning} actions={actions} menuWidth="w-48" />;
}
