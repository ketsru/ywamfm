export type PublishSchoolStatus =
  | "En attente"
  | "Annulée"
  | "Terminée"

export interface PublishSchool {
  id: string

  activite_id: string
  promotion_id: string

  debut: string
  fin: string

  lieu: string
  description?: string | null
  image?: string | null

  status: PublishSchoolStatus

  created_at: string
  updated_at: string
}
