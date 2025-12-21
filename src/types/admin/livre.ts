
export interface Livre {
  id: string
  titre: string
  auteur: string
  resume?: string | null
  langue: string
  image: string
  content?: string | null
  created_at: string
  updated_at: string
}
