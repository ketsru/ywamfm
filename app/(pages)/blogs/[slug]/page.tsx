// app/(pages)/blogs/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NotFoundError } from "@/lib/api/core/http-errors";
import { getArticleBySlug } from "@/lib/types/communications/newsletter/blog.service";
import { ARTICLE_TYPE_LABELS, ArticleType } from "@/lib/types/communications/newsletter/blog.types";

interface BlogDetailProps {
  // Next 15 : params est une Promise. `await` sur un objet déjà résolu
  // (Next 14) fonctionne aussi, donc ce code reste compatible des deux côtés.
  params: Promise<{ slug: string }>;
}

async function fetchArticle(slug: string) {
  try {
    return await getArticleBySlug(slug);
  } catch (err) {
    if (err instanceof NotFoundError) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-teal-900 text-white">
      {/* Hero */}
      <div className="relative min-h-[50vh] w-full overflow-hidden rounded-b-3xl">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt ?? article.title}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-teal-900/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <Link
          href="/blogs"
          className="absolute left-4 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux articles
        </Link>

        <div className="absolute inset-x-0 bottom-10 mx-auto max-w-3xl px-4 text-center">
          <span className="text-sm uppercase tracking-wide text-green-400">
            {ARTICLE_TYPE_LABELS[article.type]}
            {article.type === ArticleType.PODCAST && article.episode ? ` · ${article.episode}` : ""}
          </span>
          <h1 className="mt-4 text-3xl font-light leading-tight md:text-5xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-lg leading-relaxed text-gray-300">
          {article.excerpt}
        </p>

        <div className="mt-8 space-y-4 leading-loose text-gray-200">
          <p>
            Ceci est un exemple de page de détail. Tu peux ici afficher le
            contenu complet de l&apos;article, l&apos;audio du podcast, la vidéo, etc.
          </p>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-300 underline underline-offset-2 transition-all hover:text-white hover:no-underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voir tous les articles
          </Link>
        </div>
      </main>
    </div>
  );
}