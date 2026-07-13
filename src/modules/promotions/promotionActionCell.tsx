// @/modules/promotions/components/PromotionActionsCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Promotion } from "@/lib/types/admin/promotion/promotion.types";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

interface Props {
  promotion:       Promotion;
  onEdit?:         (p: Promotion) => void;
  onToggleActive?(id: string, value: boolean): void;
  onDelete?:       (id: string) => void;
}

export function PromotionActionsCell({ promotion, onEdit, onToggleActive, onDelete }: Props) {
  const actions: ActionItem<Promotion>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (p) => onEdit?.(p),
    },
    {
      label:    promotion.isActive ? "Désactiver" : "Activer",
      icon:     promotion.isActive
                  ? <ToggleLeft  className="mr-2 h-4 w-4" />
                  : <ToggleRight className="mr-2 h-4 w-4" />,
      onSelect: (p) => onToggleActive?.(p.id, !p.isActive),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (p) => onDelete?.(p.id),
      confirm: {
        title:       () => "Supprimer cette promotion ?",
        itemName:    (p) => p.name,
        description: (p) =>
          `La promotion "${p.name}" sera supprimée définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={promotion} actions={actions} menuWidth="w-48" />;
}