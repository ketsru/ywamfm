// components/layout/pages/blogs/articleCard.tsx
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArticleType, Article } from "@/lib/types/communications/newsletter/blog.types";

// ── Config ───────────────────────────────────────────────────

const TYPE_BADGE_CONFIG: Record<ArticleType, { label: string; className: string }> = {
  [ArticleType.STORY]:   { label: "Story",   className: "bg-teal-500" },
  [ArticleType.PODCAST]: { label: "Podcast", className: "bg-green-500" },
};

// ── Component ────────────────────────────────────────────────

export interface ArticleCardProps {
  article: Article;
  className?: string;
}

function ArticleCardImpl({ article, className }: ArticleCardProps) {
  const { type, title, excerpt, actionLabel, imageUrl, imageAlt, slug, episode } = article;
  const badge = TYPE_BADGE_CONFIG[type];
  const href = `/blogs/${slug}`;

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={href}
        className="relative mb-4 block aspect-video overflow-hidden rounded-2xl bg-teal-900/40"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-teal-900/60" />
        )}

        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm",
            badge.className
          )}
        >
          {badge.label}
        </span>

        {type === ArticleType.PODCAST && episode && (
          <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-sm">
            {episode}
          </span>
        )}
      </Link>

      <Link href={href}>
        <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-green-400">
          {title}
        </h3>
      </Link>

      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-300">
        {excerpt}
      </p>

      <Link
        href={href}
        className="inline-flex w-fit items-center text-sm font-medium text-teal-300 underline underline-offset-2 transition-all hover:text-white hover:no-underline"
      >
        {actionLabel}
      </Link>
    </article>
  );
}

export const ArticleCard = React.memo(ArticleCardImpl);
export default ArticleCard;