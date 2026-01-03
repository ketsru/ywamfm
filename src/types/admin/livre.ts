
export interface Livre {
  id: string
  titre: string
  auteur: string
  resume?: string | null
  langue: string
  image: string
  content?: string | null
  is_active: boolean  // Nouveau champ pour activer/désactiver
  created_at: string
  updated_at: string
}
