// @/modules/outreaches/components/RegisterOutreachActionsCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { RegisterOutreach, OUTREACH_CATEGORY_LABELS } from "@/lib/types/admin/outreach/outreach.types";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  outreach:  RegisterOutreach;
  onEdit?:   (o: RegisterOutreach) => void;
  onDelete?: (id: string) => void;
}

export function RegisterOutreachActionsCell({ outreach, onEdit, onDelete }: Props) {
  const actions: ActionItem<RegisterOutreach>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (o) => onEdit?.(o),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (o) => onDelete?.(o.id),
      confirm: {
        title:       () => "Supprimer cet outreach ?",
        itemName:    (o) => `${OUTREACH_CATEGORY_LABELS[o.category]} · ${o.departmentName}`,
        description: (o) =>
          `L'outreach "${OUTREACH_CATEGORY_LABELS[o.category]} · ${o.departmentName}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={outreach} actions={actions} menuWidth="w-48" />;
}