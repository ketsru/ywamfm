
export const ArticleType = {
  STORY:   "story",
  PODCAST: "podcast",
} as const;
export type ArticleType = (typeof ArticleType)[keyof typeof ArticleType];

export const ARTICLE_TYPE_LABELS: Record<ArticleType, string> = {
  story:   "Histoire",
  podcast: "Podcast",
};

export interface Article {
  id: string;
  type: ArticleType;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  actionLabel: string;
  slug: string;
  isPublish: boolean;
  episode?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleRequest {
  type: ArticleType;
  title: string;
  excerpt: string;
  imageAlt?: string | null;
  actionLabel: string;
  slug: string;
  isPublish: boolean;
  episode?: string | null;
  image?: File | null;
}

export interface ArticleFilters {
  type?: ArticleType;
}