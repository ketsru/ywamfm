// @/modules/testimonies/components/TestimonyActionsCell.tsx
"use client";

import { Testimony } from "@/lib/types/communications/testimonies/testimony.types";
import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Check, X, Trash2 } from "lucide-react";

interface Props {
  testimony:  Testimony;
  onApprove?: (id: string) => void;
  onReject?:  (id: string) => void;
  onDelete?:  (id: string) => void;
}

export function TestimonyActionsCell({ testimony, onApprove, onReject, onDelete }: Props) {
  const actions: ActionItem<Testimony>[] = [
    testimony.isApproved
      ? {
          label:    "Rejeter",
          icon:     <X className="mr-2 h-4 w-4" />,
          onSelect: (t) => onReject?.(t.id),
        }
      : {
          label:    "Approuver",
          icon:     <Check className="mr-2 h-4 w-4" />,
          onSelect: (t) => onApprove?.(t.id),
        },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (t) => onDelete?.(t.id),
      confirm: {
        title:       () => "Supprimer ce témoignage ?",
        itemName:    (t) => t.userName,
        description: (t) =>
          `Le témoignage de "${t.userName}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={testimony} actions={actions} menuWidth="w-48" />;
}