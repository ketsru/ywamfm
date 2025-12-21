import { Journal } from "@/types/student/journal"

export const journalMock: Journal[] = [
  {
    id: "journal-001",
    etudiant_id: "etudiant-001",

    nom_orateur: "Jean Dupont",
    origine_orateur: "France",
    fruit_orateur: "Clarté dans l'explication, motivation et inspiration",

    theme_semaine: "Introduction au HTML & CSS",
    grandes_revelations:
      "Comprendre l'importance de la structuration des pages et du responsive design.",

    impact:
      "Je suis plus confiant pour créer mes premières pages web et structurer correctement le contenu.",
    demarche:
      "J'ai commencé à créer une mini page de portfolio pour mettre en pratique les notions apprises.",
    changement:
      "Je prends désormais le temps de planifier la structure de mes pages avant de coder.",
    croissance:
      "Amélioration de mes compétences en design et compréhension du DOM.",

    observation_semaine:
      "Les exemples pratiques ont beaucoup aidé à comprendre les concepts.",
    reaction_semaine:
      "Motivation élevée et envie de continuer les exercices proposés.",
    experience:
      "Expérience positive, le cours était interactif et facile à suivre.",

    vecu_semaine:
      "J'ai passé 10 heures cette semaine à coder mes premières pages web.",

    lu: false,

    created_at: "2025-02-02T10:00:00Z",
    updated_at: "2025-02-02T10:00:00Z",
  },
  {
    id: "journal-002",
    etudiant_id: "etudiant-001",

    nom_orateur: "Jane Smith",
    origine_orateur: "Canada",
    fruit_orateur: "Patience, méthode et exemples concrets",

    theme_semaine: "JavaScript Fondamentaux",
    grandes_revelations:
      "Découverte de la manipulation du DOM et des concepts de variables, boucles et fonctions.",

    impact:
      "Je peux désormais créer des interactions simples sur mes pages web.",
    demarche:
      "J'ai commencé à écrire des scripts pour valider des formulaires et animer des éléments HTML.",
    changement:
      "J'aborde le JavaScript de manière structurée, plutôt que de coder au hasard.",
    croissance:
      "Mes compétences en logique et programmation ont clairement progressé.",

    observation_semaine:
      "Les exercices pratiques m'ont permis de mieux comprendre la syntaxe JS.",
    reaction_semaine:
      "Je suis enthousiaste à l'idée de continuer et d'approfondir mes connaissances.",
    experience:
      "Cours bien structuré et enrichissant, très motivant.",

    vecu_semaine:
      "Cette semaine, j'ai passé 12 heures à coder et tester des fonctions JS.",

    lu: false,

    created_at: "2025-02-09T10:00:00Z",
    updated_at: "2025-02-09T10:00:00Z",
  },
]
