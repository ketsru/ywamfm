"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { promotionMocks } from "@/components/data/admin/promotion"
import { journalMock } from "@/components/data/students/journal"
import { etudiantMock } from "@/components/data/students/etudiant"
import { publishSchoolMock } from "@/components/data/admin/publish_school"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, History, PlayCircle } from "lucide-react"

export default function JournalDashboard() {
  const router = useRouter()

  const [selectedPromotionId, setSelectedPromotionId] = useState(
    promotionMocks[0]?.id
  )

  const selectedPromotion = promotionMocks.find(
    (p) => p.id === selectedPromotionId
  )

  // Étudiants appartenant à la promotion sélectionnée
  const studentsInPromotion = etudiantMock.filter((etudiant) => {
    const school = publishSchoolMock.find(
      (ps) => ps.id === etudiant.publish_school_id
    )
    return school?.promotion_id === selectedPromotionId
  })

  const studentIdsInPromotion = studentsInPromotion.map((s) => s.id)

  // Filtrer les journaux pour les étudiants de la promotion
  const filteredJournals = journalMock.filter((journal) =>
    studentIdsInPromotion.includes(journal.etudiant_id)
  )

  // Limiter les données visibles dans la liste
  const journalsPreview = filteredJournals.map((journal) => ({
    id: journal.id,
    theme_semaine: journal.theme_semaine,
    grandes_revelations: journal.grandes_revelations,
    nom_orateur: journal.nom_orateur,
    origine_orateur: journal.origine_orateur,
  }))

  return (
    <section className="space-y-6 mt-2 mb-10">
      {/* Banner */}
      <div className="rounded-t-md shadow-xs h-56 bg-[url('/assets/images/0af7741991985e2b530c8f62135c3eea.jpg')] bg-cover bg-center bg-no-repeat" />

      {/* Header */}
      <div className="lg:flex justify-between items-center">
        <h2 className="md:text-3xl text-xl font-extrabold flex gap-2 items-center lg:mb-0 mb-4">
          <History size={22} />
          Mon journal
        </h2>

        {/* Promotion dropdown */}
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
                className="cursor-pointer"
              >
                {promotion.nom}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Journaux */}
      {journalsPreview.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucun journal disponible pour cette promotion.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journalsPreview.map((journal) => (
            <article
              key={journal.id}
              className="rounded-lg border bg-background p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold line-clamp-2">
                {journal.theme_semaine}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {journal.grandes_revelations}
              </p>

              <div className="mt-4 text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">Orateur :</span>{" "}
                  {journal.nom_orateur} ({journal.origine_orateur})
                </p>
              </div>

              <div className="mt-5">
                <Button
                  className="w-full flex items-center gap-2"
                  onClick={() => router.push(`/std/journal/${journal.id}`)}
                >
                  <PlayCircle size={16} />
                  Voir détails
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
