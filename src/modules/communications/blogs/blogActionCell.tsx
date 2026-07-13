// @/modules/blog/components/ArticleActionsCell.tsx
"use client";

import { Article } from "@/lib/types/communications/newsletter/blog.types";
import { EntityActionsCell, type ActionItem } from "@/modules/shared/entityActionCell";
import { Pencil, Trash2, EyeOff, Eye } from "lucide-react";

interface Props {
  article:          Article;
  onEdit?:          (a: Article) => void;
  onTogglePublish?: (id: string) => void;
  onDelete?:        (id: string) => void;
}

export function ArticleActionsCell({ article, onEdit, onTogglePublish, onDelete }: Props) {
  const actions: ActionItem<Article>[] = [
    {
      label:    "Modifier",
      icon:     <Pencil className="mr-2 h-4 w-4" />,
      onSelect: (a) => onEdit?.(a),
    },
    {
      label:    article.isPublish ? "Dépublier" : "Publier",
      icon:     article.isPublish
                  ? <EyeOff className="mr-2 h-4 w-4" />
                  : <Eye    className="mr-2 h-4 w-4" />,
      onSelect: (a) => onTogglePublish?.(a.id),
    },
    {
      label:       "Supprimer",
      icon:        <Trash2 className="mr-2 h-4 w-4" />,
      separator:   true,
      destructive: true,
      onSelect:    (a) => onDelete?.(a.id),
      confirm: {
        title:       () => "Supprimer cet article ?",
        itemName:    (a) => a.title,
        description: (a) =>
          `L'article "${a.title}" sera supprimé définitivement. Cette action est irréversible.`,
      },
    },
  ];

  return <EntityActionsCell entity={article} actions={actions} menuWidth="w-48" />;
}