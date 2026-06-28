// register_outreach.ts

export type OutreachCategory = "Ecole" | "Indépendant"
export type OutreachStatus = "En attente" | "Annulée" | "Terminée"

export interface RegisterOutreach {
  id: string
  departement_id: string
  categorie: OutreachCategory
  image: string
  status: OutreachStatus
  created_at: string
  updated_at: string
}
