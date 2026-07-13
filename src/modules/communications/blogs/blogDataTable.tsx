// @/modules/blog/components/ArticleDataTable.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { ConfirmDeleteDialog } from "@/modules/shared/deleteConfirmationDialog";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { getAllArticles, toggleArticlePublish, deleteArticle } from "@/lib/types/communications/newsletter/blog.service";
import { Article } from "@/lib/types/communications/newsletter/blog.types";
import { ArticleFormDialog } from "./blogFormDialog";
import { articleColumns } from "./columnDef";

export function ArticleDataTable() {
  const queryClient = useQueryClient();

  // ── Pagination state ──────────────────────────────────────
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  // ── Dialog state ──────────────────────────────────────────
  const [formOpen, setFormOpen]               = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();
  const [deleteOpen, setDeleteOpen]           = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | undefined>();

  // ── Query ─────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", "articles", page, size],
    queryFn: () => getAllArticles(undefined, { page, size }),
  });

  const articles = data?.content ?? [];

  // ── Mutations ─────────────────────────────────────────────
  const invalidateArticles = () =>
    queryClient.invalidateQueries({ queryKey: ["blog", "articles"] });

  const { mutate: togglePublish } = useMutation({
    mutationFn: (id: string) => toggleArticlePublish(id),
    onSuccess: () => {
      invalidateArticles();
      toast.success("Statut de publication mis à jour.");
    },
    onError: (err) => handleApiError(err),
  });

  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteArticle(id),
    onSuccess: () => {
      invalidateArticles();
      toast.success("Article supprimé.");
      setDeleteOpen(false);
    },
    onError: (err) => handleApiError(err),
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleEdit = (a: Article) => {
    setSelectedArticle(a);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedArticle(undefined);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setArticleToDelete(articles.find((a) => a.id === id));
    setDeleteOpen(true);
  };

  // ── Render ────────────────────────────────────────────────
  if (isLoading) return (
    <div className="px-6 py-16 flex items-center justify-center text-muted-foreground text-sm gap-2">
      <Loader2 size={16} className="animate-spin" />
      Chargement des articles…
    </div>
  );

  if (isError) return (
    <div className="px-6 py-8 text-sm text-destructive">
      Erreur lors du chargement des articles.
    </div>
  );

  return (
    <>
      <SharedDataTable
        columns={articleColumns({
          onEdit:          handleEdit,
          onTogglePublish: togglePublish,
          onDelete:        handleDeleteRequest,
        })}
        data={articles}
        filterColumn="title"
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Button>
        }
      />

      <ArticleFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedArticle(undefined);
        }}
        article={selectedArticle}
        onSuccess={invalidateArticles}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => articleToDelete && doDelete(articleToDelete.id)}
        itemName={articleToDelete?.title}
        loading={isDeleting}
      />
    </>
  );
}