// @/modules/departments/components/DepartmentActionsCell.tsx
"use client";

import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Department } from "@/types/admin/department/department.types";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

interface Props {
  department:    Department;
  onEdit?:       (d: Department) => void;
  onToggleActive?(id: string, value: boolean): void;
  onDelete?:     (id: string) => void;
}

export function DepartmentActionsCell({ department, onEdit, onToggleActive, onDelete }: Props) {
  const actions: ActionItem<Department>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (d) => onEdit?.(d),
    },
    {
      label:    department.isActive ? "Désactiver" : "Activer",
      icon:     department.isActive
                  ? <ToggleLeft  className="mr-2 h-4 w-4" />
                  : <ToggleRight className="mr-2 h-4 w-4" />,
      onSelect: (d) => onToggleActive?.(d.id, !d.isActive),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (d) => onDelete?.(d.id),
      confirm: {
        title:       () => "Supprimer ce département ?",
        itemName:    (d) => d.name,
        description: (d) =>
          `Le département "${d.name}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={department} actions={actions} menuWidth="w-48" />;
}