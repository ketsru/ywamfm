export interface Course {
  id: string

  // Relations (FK)
  departement_id: string
  orateur_id: string
  theme_id: string
  school_id: string
  promotion_id: string
  planing_id: string

  // Données métier
  titre: string
  link?: string | null
  contenu_texte?: string | null

  created_at: string
  updated_at: string
}
