// components/layout/pages/blogs/blogsPageContent.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ArticleGrid from "./articleGrid";
import BlogsHero from "./blogHero";
import { getPublishedArticles } from "@/lib/types/communications/newsletter/blog.service";
import { ArticleType } from "@/lib/types/communications/newsletter/blog.types";

export default function BlogsPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<ArticleType | null>(null);

  // Le filtre "type" est envoyé au back (via ArticleFilters), la recherche
  // texte reste côté client (aucun paramètre "search" côté service).
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", "public", "articles", selectedType],
    queryFn: () =>
      getPublishedArticles(
        selectedType ? { type: selectedType } : undefined,
        { page: 0, size: 50 } // vitrine publique — pas de pagination visible ici
      ),
  });

  const articles = data?.content ?? [];

  return (
    <div className="relative">
      <BlogsHero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <div className="relative z-10 bg-teal-800 py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-20 text-white/80">
              <Loader2 className="h-5 w-5 animate-spin" />
              Chargement des articles…
            </div>
          ) : isError ? (
            <div className="py-20 text-center text-red-300">
              Erreur lors du chargement des articles.
            </div>
          ) : (
            <ArticleGrid
              articles={articles}
              searchTerm={searchTerm}
              selectedType={selectedType}
            />
          )}
        </div>
      </div>
    </div>
  );
}