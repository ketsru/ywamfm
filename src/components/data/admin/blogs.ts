import { Article } from '@/types/admin/blog'

export const articles: Article[] = [
  {
    id: 'story-1',
    type: 'story',
    title: 'A Nation Transformed through the Gospel',
    excerpt:
      'But as the team packed up to leave, a sudden panic swept over Ali. The Lightstream was gone.',
    image: {
      src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'A Nation Transformed',
    },
    actionLabel: 'Read more',
    slug: 'a-nation-transformed',
  },
  {
    id: 'podcast-4',
    type: 'podcast',
    title: 'Holy Ambition and God-Sized Dreams',
    excerpt:
      "In this season's final episode, we dive deep into what it means to go after God-sized dreams and live with supernatural faith.",
    image: {
      src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Holy Ambition Podcast',
    },
    episode: 'EPISODE 04',
    actionLabel: 'Watch now',
    slug: 'holy-ambition-ep04',
  },
  {
    id: 'story-2',
    type: 'story',
    title: 'How It All Started',
    excerpt: 'Renew traces its roots deep into the Amazon jungle...',
    image: {
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'How It All Started',
    },
    actionLabel: 'Read more',
    slug: 'how-it-all-started',
  },
]
