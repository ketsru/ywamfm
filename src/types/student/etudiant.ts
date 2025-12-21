
export type Sexe = "M" | "F"

export type MaritalStatus =
  | "single"
  | "married"
  | "divorced"
  | "widowed"


export interface Etudiant {
  id: string

  user_id: string
  activite_id: string
  publish_school_id: string
  provenance_id: string

  sexe: Sexe
  marital_status?: MaritalStatus | null

  nom: string
  prenom: string

  email: string
  country_code: string
  telephone: string

  date_naissance: string

  objectif: string
  attente: string

  created_at: string
  updated_at: string
}
