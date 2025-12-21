import { Etudiant } from "@/types/student/etudiant"

export const etudiantMock: Etudiant[] = [
  {
    id: "etudiant-001",

    user_id: "user-001",
    activite_id: "activite-formation-web",
    publish_school_id: "publish-school-001",
    provenance_id: "prov-001",

    sexe: "M",
    marital_status: "single",

    nom: "Atsu",
    prenom: "Komi",

    email: "komi.atsu@example.com",
    country_code: "+228",
    telephone: "90123456",

    date_naissance: "1998-06-12",

    objectif:
      "Acquérir des compétences solides en développement web afin de devenir développeur fullstack professionnel.",
    attente:
      "Maîtriser les technologies modernes, participer à des projets concrets et améliorer mon employabilité.",

    created_at: "2025-02-01T08:00:00Z",
    updated_at: "2025-02-01T08:00:00Z",
  },
]
