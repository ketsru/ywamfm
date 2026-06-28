"use client"

import { useParams } from "next/navigation"
import { journalMock } from "@/components/data/students/journal"

export default function JournalDetails() {
  const params = useParams()
  const journalId = params?.id as string

  const journal = journalMock.find((j) => j.id === journalId)

  if (!journal) {
    return <p>Journal introuvable.</p>
  }

  return (
    <section className="space-y-4 p-5">
      <h2 className="text-2xl font-bold">{journal.theme_semaine}</h2>
      <p>
        <span className="font-medium">Orateur :</span> {journal.nom_orateur} (
        {journal.origine_orateur})
      </p>
      <p>
        <span className="font-medium">Fruit du cours :</span>{" "}
        {journal.fruit_orateur}
      </p>
      <p>
        <span className="font-medium">Grandes révélations :</span>{" "}
        {journal.grandes_revelations}
      </p>
      <p>
        <span className="font-medium">Impact :</span> {journal.impact}
      </p>
      <p>
        <span className="font-medium">Démarche :</span> {journal.demarche}
      </p>
      <p>
        <span className="font-medium">Changement :</span> {journal.changement}
      </p>
      <p>
        <span className="font-medium">Croissance :</span> {journal.croissance}
      </p>
      <p>
        <span className="font-medium">Observation :</span>{" "}
        {journal.observation_semaine}
      </p>
      <p>
        <span className="font-medium">Réaction :</span>{" "}
        {journal.reaction_semaine}
      </p>
      <p>
        <span className="font-medium">Expérience :</span> {journal.experience}
      </p>
      <p>
        <span className="font-medium">Vécu :</span> {journal.vecu_semaine}
      </p>
    </section>
  )
}
