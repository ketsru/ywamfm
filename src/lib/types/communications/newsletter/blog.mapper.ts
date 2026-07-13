import { Article } from "./blog.types";

export const formatArticleDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("fr-FR", {
    day:   "2-digit",
    month: "long",
    year:  "numeric",
  });

export const toArticleSummary = (article: Article) => ({
  id:          article.id,
  type:        article.type,
  title:       article.title,
  excerpt:     article.excerpt,
  imageUrl:    article.imageUrl ?? null,
  imageAlt:    article.imageAlt ?? article.title,
  actionLabel: article.actionLabel,
  slug:        article.slug,
  isPublish:   article.isPublish,
  episode:     article.episode ?? null,
  createdAt:   formatArticleDate(article.createdAt),
});

export type ArticleSummary = ReturnType<typeof toArticleSummary>;