
// register_school.ts

export type SchoolType = "En présentielle" | "En ligne"
export type SchoolCategory = "Payante" | "Gratuite"
export type SchoolStatus = "En attente" | "En cours" | "Annulée" | "Terminée"

export interface RegisterSchool {
  id: string
  departement_id: string
  nom: string
  type: SchoolType
  categorie: SchoolCategory
  prix?: number | null
  status: SchoolStatus
  duree: number
  created_at: string
  updated_at: string
}
