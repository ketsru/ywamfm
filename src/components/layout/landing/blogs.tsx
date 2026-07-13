"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getPublishedArticles } from "@/lib/types/communications/newsletter/blog.service";
import { ArticleType } from "@/lib/types/communications/newsletter/blog.types";
import ArticleCard from "../pages/blogs/articleCard";

export default function BlogSection() {
  const [selectedType] = useState<ArticleType | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", "public", "articles", selectedType],
    queryFn: () =>
      getPublishedArticles(
        selectedType ? { type: selectedType } : undefined,
        { page: 0, size: 50 }
      ),
  });

  const latestArticles = (data?.content ?? []).slice(0, 3);

  return (
    <div className="relative z-10 bg-brand-vert-fonce py-10 md:py-12">
      <div className="mx-4 rounded-3xl bg-black/25 py-12 backdrop-blur-sm md:mx-8 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full border border-white/20 bg-white/15 px-6 py-2">
              <span className="text-sm font-medium text-white">
                Nos nouvelles
              </span>
            </div>
          </div>

          <div className="mb-6 text-center">
            <h2 className="mx-auto max-w-4xl text-2xl font-light leading-tight text-white md:text-3xl lg:text-5xl">
              Derniers{" "}
              <span className="font-accent italic text-brand-vert-clair">
                podcasts
              </span>{" "}
              et{" "}
              <span className="font-accent italic text-brand-vert-clair">
                récits
              </span>
            </h2>
          </div>

          <div className="py-8 md:py-16">
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
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {latestArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/blogs"
              className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-brand-vert-fonce transition-colors hover:bg-brand-vert-clair"
            >
              Voir plus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}