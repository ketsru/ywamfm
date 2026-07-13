// @/modules/blog/components/articleColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Article, ARTICLE_TYPE_LABELS } from "@/lib/types/communications/newsletter/blog.types";
import { ArticleActionsCell } from "./blogActionCell";

interface ColumnOptions {
  onEdit?:          (a: Article) => void;
  onTogglePublish?: (id: string) => void;
  onDelete?:        (id: string) => void;
}

export const articleColumns = (opts: ColumnOptions): ColumnDef<Article>[] => [
  {
    id: "image",
    header: "",
    cell: ({ row }) => {
      const { imageUrl, imageAlt, title } = row.original;
      return imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt ?? title}
          className="h-9 w-9 rounded-lg object-cover border shrink-0"
        />
      ) : (
        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
          —
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">
        {ARTICLE_TYPE_LABELS[row.original.type]}
      </Badge>
    ),
  },
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.title}</span>
    ),
  },
  /*{
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">/{row.original.slug}</span>
    ),
  },*/
  {
    accessorKey: "isPublish",
    header: "Statut",
    cell: ({ row }) => (
      <Badge variant={row.original.isPublish ? "default" : "secondary"}>
        {row.original.isPublish ? "Publié" : "Brouillon"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString("fr-FR")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ArticleActionsCell
        article={row.original}
        onEdit={opts.onEdit}
        onTogglePublish={opts.onTogglePublish}
        onDelete={opts.onDelete}
      />
    ),
  },
];