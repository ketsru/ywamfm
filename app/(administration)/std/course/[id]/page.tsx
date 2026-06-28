"use client"

import { coursMock } from "@/components/data/admin/cours"
import { ArrowUpRight, LeafyGreen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DetailsCourseProps {
  courseId: string
}

export default function DetailsCourse({ courseId }: DetailsCourseProps) {
  const cours = coursMock.find((c) => c.id === courseId)

  if (!cours) {
    return (
      <div className="p-6 text-center text-red-600">
        Cours introuvable
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <LeafyGreen size={22} />
        <h1 className="text-2xl font-extrabold">{cours.titre}</h1>
      </div>

      {/* Description */}
      {cours.contenu_texte && (
        <p className="text-sm text-muted-foreground">{cours.contenu_texte}</p>
      )}

      {/* Lien du cours */}
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        disabled={!cours.link}
        onClick={() => {
          if (cours.link) window.open(cours.link, "_blank")
        }}
      >
        Ouvrir le cours <ArrowUpRight size={16} />
      </Button>

      {/* Métadonnées */}
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
    </div>
  )
}
