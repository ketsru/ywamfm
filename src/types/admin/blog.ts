
export type ArticleType = 'story' | 'podcast'

export interface Article {
  id: string
  type: ArticleType

  title: string
  excerpt: string

  image: {
    src: string
    alt: string
  }

  episode?: string        // uniquement pour les podcasts
  actionLabel: string     // Read more / Watch now
  slug: string        
}
