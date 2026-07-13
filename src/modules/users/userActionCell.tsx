// @/modules/users/userActionCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { User, AccountStatus } from "@/lib/types/users/user/user.types";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

interface Props {
  user:            User;
  onEdit?:         (u: User) => void;
  onToggleActive?: (id: string, value: boolean) => void;
  onDelete?:       (id: string) => void;
}

export function UserActionsCell({ user, onEdit, onToggleActive, onDelete }: Props) {
  const isActive = user.status === AccountStatus.ACTIVE;

  const actions: ActionItem<User>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (u) => onEdit?.(u),
    },
    {
      label:    isActive ? "Désactiver" : "Activer",
      icon:     isActive
                  ? <ToggleLeft  className="mr-2 h-4 w-4" />
                  : <ToggleRight className="mr-2 h-4 w-4" />,
      onSelect: (u) => onToggleActive?.(u.id, !isActive),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (u) => onDelete?.(u.id),
      confirm: {
        title:       () => "Supprimer cet utilisateur ?",
        itemName:    (u) => `${u.firstName} ${u.lastName}`,
        description: (u) =>
          `Le compte de "${u.firstName} ${u.lastName}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={user} actions={actions} menuWidth="w-48" />;
}