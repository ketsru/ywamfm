import { Promotion } from "@/types/admin/promotion"

export const promotionMocks: Promotion[] = [
  {
    id: "promo-2025-dev-web",
    activite_id: "activite-formation-web",

    nom: "Promotion Développement Web 2025",
    specialite: "Développement Fullstack",
    description:
      "Promotion dédiée à la formation complète en développement web moderne (Frontend, Backend, DevOps).",

    created_at: "2025-01-10T08:00:00Z",
    updated_at: "2025-01-10T08:00:00Z",
  },

  {
    id: "promo-2025-dev-mobile",
    activite_id: "activite-formation-mobile",

    nom: "Promotion Développement Mobile 2025",
    specialite: "Applications Mobiles",
    description:
      "Formation axée sur le développement d'applications mobiles Android et iOS avec des technologies modernes.",

    created_at: "2025-02-05T09:30:00Z",
    updated_at: "2025-02-05T09:30:00Z",
  },

  {
    id: "promo-2025-data-ai",
    activite_id: "activite-formation-data-ai",

    nom: "Promotion Data & Intelligence Artificielle 2025",
    specialite: "Data Science & IA",
    description:
      "Promotion spécialisée dans l'analyse de données, le machine learning et l'intelligence artificielle appliquée.",

    created_at: "2025-03-01T10:00:00Z",
    updated_at: "2025-03-01T10:00:00Z",
  },

  {
    id: "promo-2025-cybersecurity",
    activite_id: "activite-formation-cybersecurite",

    nom: "Promotion Cybersécurité 2025",
    specialite: "Sécurité Informatique",
    description:
      "Formation orientée vers la protection des systèmes informatiques, réseaux, données et la gestion des risques cyber.",

    created_at: "2025-04-12T08:45:00Z",
    updated_at: "2025-04-12T08:45:00Z",
  },
]
