

type MissionCardProps = {
  title: string
  description: string
  href: string
  image: string
}

export const missionCards: MissionCardProps[] = [
    {
        title: "Formation",
        description: "Tools to help you share the Gospel",
        href: "/formation",
        image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Evangélisation",
        description: "Programs and innovative initiatives",
        href:"/evangelisation",
        image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Entraide",
        description: "Sharing God dids in the nations",
        href:"/entraide",
        image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80",
    },
]