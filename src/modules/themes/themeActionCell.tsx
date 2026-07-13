// @/modules/themes/components/ThemeActionsCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  theme:     ThemeResponseDto;
  onEdit?:   (t: ThemeResponseDto) => void;
  onDelete?: (id: string) => void;
}

export function ThemeActionsCell({ theme, onEdit, onDelete }: Props) {
  const actions: ActionItem<ThemeResponseDto>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (t) => onEdit?.(t),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (t) => onDelete?.(t.id),
      confirm: {
        title:       () => "Supprimer ce thème ?",
        itemName:    (t) => t.name,
        description: (t) =>
          `Le thème "${t.name}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={theme} actions={actions} menuWidth="w-48" />;
}