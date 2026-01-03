import { articles } from "@/components/data/admin/blogs"
import Footer from "@/components/layout/landing/footer"
import LandingPageHeader from "@/components/layout/landing/header"
import Image from "next/image"
import { notFound } from "next/navigation"

interface BlogDetailProps {
  params: {
    id: string
  }
}

export default function BlogDetail({ params }: BlogDetailProps) {
  const article = articles.find(a => a.id === params.id)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-teal-900 text-white">
      {/* Header */}
      <LandingPageHeader />

      {/* Hero */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center max-w-3xl px-4">
          <span className="text-sm uppercase tracking-wide text-green-400">
            badge
          </span>
          <h1 className="text-3xl md:text-5xl font-light mt-4">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-lg text-gray-300 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Contenu long (plus tard via API ou CMS) */}
        <div className="mt-8 text-gray-200 leading-loose space-y-4">
          <p>
            Ceci est un exemple de page de détail. Tu peux ici afficher le
            contenu complet de l’article, l’audio du podcast, la vidéo, etc.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
