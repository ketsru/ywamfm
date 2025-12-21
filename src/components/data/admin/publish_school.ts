import { PublishSchool } from "@/types/admin/publish_school"

export const publishSchoolMock: PublishSchool[] = [
  {
    id: "publish-school-001",

    activite_id: "activite-formation-web",
    promotion_id: "promo-2025-dev-web",

    debut: "2025-03-01",
    fin: "2025-06-30",

    lieu: "Campus en ligne - Platform Dev Online",
    description:
      "Formation intensive de développement web fullstack, incluant HTML, CSS, JavaScript, React et backend Laravel.",
    image: "/assets/images/dev-web-2025.jpg",

    status: "En attente",

    created_at: "2025-02-01T09:00:00Z",
    updated_at: "2025-02-01T09:00:00Z",
  },
  {
    id: "publish-school-002",

    activite_id: "activite-formation-web",
    promotion_id: "promo-2025-dev-web",

    debut: "2025-07-01",
    fin: "2025-10-31",

    lieu: "Campus Présentiel - Lomé, Togo",
    description:
      "Promotion présentielle pour la formation complète en développement web moderne, avec projets pratiques et mentorat personnalisé.",
    image: "/assets/images/dev-web-2025-campus.jpg",

    status: "En attente",

    created_at: "2025-05-01T09:00:00Z",
    updated_at: "2025-05-01T09:00:00Z",
  },
]
