// src/modules/roles/roleActionCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Role } from "@/lib/types/access/role/role.types";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

interface Props {
  role:            Role;
  onEdit?:         (r: Role) => void;
  onToggleActive?: (id: string, value: boolean) => void;
  onDelete?:       (id: string) => void;
}

export function RoleActionsCell({ role, onEdit, onToggleActive, onDelete }: Props) {
  const actions: ActionItem<Role>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (r) => onEdit?.(r),
    },
    {
      label:    role.active ? "Désactiver" : "Activer",
      icon:     role.active
                  ? <ToggleLeft  className="mr-2 h-4 w-4" />
                  : <ToggleRight className="mr-2 h-4 w-4" />,
      onSelect: (r) => onToggleActive?.(r.id, !r.active),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (r) => onDelete?.(r.id),
      confirm: {
        title:       () => "Supprimer ce rôle ?",
        itemName:    (r) => r.name,
        description: (r) =>
          `Le rôle "${r.name}" sera supprimé définitivement. Les utilisateurs qui l'ont ne pourront plus l'utiliser. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={role} actions={actions} menuWidth="w-48" />;
}