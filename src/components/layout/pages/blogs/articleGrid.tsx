// components/layout/pages/blogs/articleGrid.tsx
"use client";

import * as React from "react";
import { FileX } from "lucide-react";
import ArticleCard from "./articleCard";
import { Article, ArticleType } from "@/lib/types/communications/newsletter/blog.types";

export interface ArticleGridProps {
  articles: Article[];
  searchTerm?: string | null;
  selectedType?: ArticleType | null;
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <FileX className="mb-4 h-10 w-10 text-teal-300/60" />
      <h3 className="text-lg font-semibold text-white">Aucun article trouvé</h3>
      <p className="mt-2 text-sm text-gray-300">
        {hasFilters ? "Essayez de modifier vos filtres." : "Aucun article n'est disponible pour le moment."}
      </p>
    </div>
  );
}

export default function ArticleGrid({ articles, searchTerm, selectedType }: ArticleGridProps) {
  const filteredArticles = React.useMemo(() => {
    const term = searchTerm?.trim().toLowerCase();

    return articles.filter((article) => {
      if (selectedType && article.type !== selectedType) return false;

      if (term) {
        return (
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term)
        );
      }

      return true;
    });
  }, [articles, searchTerm, selectedType]);

  if (!filteredArticles.length) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState hasFilters={!!searchTerm?.trim() || !!selectedType} />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
      {filteredArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  );
}