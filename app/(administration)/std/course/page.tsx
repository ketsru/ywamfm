"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { coursMock } from "@/components/data/admin/cours"
import { promotionMocks } from "@/components/data/admin/promotion"
import { ChevronDown, LeafyGreen, PlayCircle, ArrowUpRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CoursePage() {
  //const router = useRouter()
  const [selectedPromotionId, setSelectedPromotionId] = useState(
    promotionMocks[0]?.id
  )
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  const selectedPromotion = promotionMocks.find(
    (p) => p.id === selectedPromotionId
  )

  const filteredCourses = coursMock.filter(
    (cours) => cours.promotion_id === selectedPromotionId
  )

  const cours = coursMock.find((c) => c.id === selectedCourseId)

  // Si un cours est sélectionné, afficher le détail
  if (cours) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-2">
          <LeafyGreen size={22} />
          <h1 className="text-2xl font-extrabold">{cours.titre}</h1>
        </div>

        {cours.contenu_texte && (
          <p className="text-sm text-muted-foreground">{cours.contenu_texte}</p>
        )}

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          disabled={!cours.link}
          onClick={() => cours.link && window.open(cours.link, "_blank")}
        >
          Ouvrir le cours <ArrowUpRight size={16} />
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">Orateur :</span> {cours.orateur_id}
          </div>
          <div>
            <span className="font-medium">Thème :</span> {cours.theme_id}
          </div>
          <div>
            <span className="font-medium">Promotion :</span> {cours.promotion_id}
          </div>
          <div>
            <span className="font-medium">École :</span> {cours.school_id}
          </div>
          <div>
            <span className="font-medium">Département :</span> {cours.departement_id}
          </div>
          <div>
            <span className="font-medium">Planning :</span> {cours.planing_id}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setSelectedCourseId(null)}
          className="mt-4"
        >
          Retour à la liste
        </Button>
      </div>
    )
  }

  // Sinon afficher la liste des cours
  return (
    <section className="space-y-6 mt-2 mb-10">
      <div className="rounded-t-md shadow-xs h-56 bg-[url('/assets/images/0af7741991985e2b530c8f62135c3eea.jpg')] bg-cover bg-center bg-no-repeat" />

      <div className="lg:flex justify-between items-center">
        <h2 className="md:text-3xl text-xl font-extrabold flex gap-2 items-center lg:mb-0 mb-4">
          <LeafyGreen size={22} />
          Mes cours
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {selectedPromotion?.nom ?? "Sélectionner une promotion"}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {promotionMocks.map((promotion) => (
              <DropdownMenuItem
                key={promotion.id}
                onClick={() => setSelectedPromotionId(promotion.id)}
              >
                {promotion.nom}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucun cours disponible pour cette promotion.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((cours) => (
            <article
              key={cours.id}
              className="rounded-lg border bg-background p-5 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedCourseId(cours.id)}
            >
              <h3 className="text-lg font-semibold line-clamp-2">{cours.titre}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {cours.contenu_texte}
              </p>

              <div className="mt-4 text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">Thème :</span> {cours.theme_id}
                </p>
                <p>
                  <span className="font-medium">Orateur :</span> {cours.orateur_id}
                </p>
              </div>

              <div className="mt-5">
                <Button className="w-full flex items-center gap-2">
                  <PlayCircle size={16} /> Accéder au cours
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
