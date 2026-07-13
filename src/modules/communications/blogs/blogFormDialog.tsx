// @/modules/blog/components/ArticleFormDialog.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ArticleForm } from "@/components/layout/forms/metier/articleForm";
import { ValidationError } from "@/lib/api/core/http-errors";
import { updateArticle, createArticle } from "@/lib/types/communications/newsletter/blog.service";
import { Article, ArticleRequest } from "@/lib/types/communications/newsletter/blog.types";

interface ArticleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: Article;
  onSuccess?: (article: Article) => void;
}

export function ArticleFormDialog({
  open,
  onOpenChange,
  article,
  onSuccess,
}: ArticleFormDialogProps) {
  const isEdit = !!article;

  const [formData, setFormData]         = React.useState<ArticleRequest | null>(null);
  const [formIsValid, setFormIsValid]   = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError]               = React.useState<string | undefined>();

  React.useEffect(() => {
    if (open) {
      setFormData(null);
      setFormIsValid(false);
      setError(undefined);
    }
  }, [open]);

  const handleFormChange = React.useCallback((data: ArticleRequest, isValid: boolean) => {
    setFormData(data);
    setFormIsValid(isValid);
  }, []);

  const handleConfirm = async () => {
    if (!formData || !formIsValid) {
      setError("Veuillez corriger les champs invalides avant de continuer.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(undefined);

      const result = isEdit
        ? await updateArticle(article.id, formData)
        : await createArticle(formData);

      toast.success(isEdit ? "Article mis à jour." : "Article créé.");
      onSuccess?.(result);
      onOpenChange(false);
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.errors[0]?.error ?? "Erreur de validation.");
      } else {
        handleApiError(err, { fallbackMessage: "Une erreur est survenue." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CrudDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Modifier l'article" : "Nouvel article"}
      description={isEdit
        ? "Modifiez les informations de l'article."
        : "Renseignez les informations du nouvel article."
      }
      size="lg"
      showFooter
      confirmLabel={isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer l'article"}
      cancelLabel="Annuler"
      onConfirm={handleConfirm}
      preventOutsideClose={isSubmitting}
    >
      <ArticleForm
        defaultValues={article}
        onChange={handleFormChange}
        error={error}
      />
    </CrudDialog>
  );
}