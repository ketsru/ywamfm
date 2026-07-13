"use client";

import { RapportResponseDto } from "@/lib/types/courses/rapport/rapport.types";
import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Pencil, Trash2, Star } from "lucide-react";

interface Props {
  rapport:   RapportResponseDto;
  onEdit?:   (r: RapportResponseDto) => void;
  onDelete?: (id: string) => void;
  onGrade?:  (r: RapportResponseDto) => void;
}

export function RapportActionsCell({ rapport, onEdit, onDelete, onGrade }: Props) {
  const actions: ActionItem<RapportResponseDto>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (r) => onEdit?.(r),
    },
    {
      label:    "Noter",
      icon:     <Star className="mr-2 h-4 w-4" />,
      onSelect: (r) => onGrade?.(r),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (r) => onDelete?.(r.id),
      confirm: {
        title:       () => "Supprimer ce rapport ?",
        itemName:    (r) => `${r.nomLivre} — ${r.auteur}`,
        description: (r) =>
          `Le rapport de "${r.studentFullName}" sur "${r.nomLivre}" sera supprimé définitivement.`,
      },
    },
  ];

  return <EntityActionsCell entity={rapport} actions={actions} menuWidth="w-48" />;
}