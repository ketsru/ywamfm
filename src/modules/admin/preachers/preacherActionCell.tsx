// @/modules/preachers/components/preacherActionCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Preacher } from "@/types/admin/preacher/preacher.types";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  preacher:  Preacher;
  onEdit?:   (p: Preacher) => void;
  onDelete?: (id: string) => void;
}

export function PreacherActionsCell({ preacher, onEdit, onDelete }: Props) {
  const actions: ActionItem<Preacher>[] = [
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
        title:       () => "Supprimer ce prédicateur ?",
        itemName:    (p) => p.name,
        description: (p) =>
          `Le prédicateur "${p.name}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={preacher} actions={actions} menuWidth="w-48" />;
}