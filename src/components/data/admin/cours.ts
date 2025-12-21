import { Course } from "@/types/admin/course"

export const coursMock: Course[] = [
  /* =========================
     PROMO DEV WEB 2025
  ========================== */
  {
    id: "cours-html-css",
    promotion_id: "promo-2025-dev-web",
    planing_id: "planing-001",

    departement_id: "dept-informatique",
    orateur_id: "orateur-john-doe",
    theme_id: "theme-frontend",
    school_id: "school-dev-online",

    titre: "Introduction au HTML & CSS",
    link: "https://example.com/html-css",
    contenu_texte:
      "Bases du HTML5, structuration des pages et mise en forme avec CSS3.",

    created_at: "2025-02-01T09:00:00Z",
    updated_at: "2025-02-01T09:00:00Z",
  },
  {
    id: "cours-js",
    promotion_id: "promo-2025-dev-web",
    planing_id: "planing-002",

    departement_id: "dept-informatique",
    orateur_id: "orateur-john-doe",
    theme_id: "theme-frontend",
    school_id: "school-dev-online",

    titre: "JavaScript Fondamentaux",
    link: "https://example.com/javascript",
    contenu_texte:
      "Variables, fonctions, conditions, boucles et manipulation du DOM.",

    created_at: "2025-02-05T09:00:00Z",
    updated_at: "2025-02-05T09:00:00Z",
  },
  {
    id: "cours-react",
    promotion_id: "promo-2025-dev-web",
    planing_id: "planing-003",

    departement_id: "dept-informatique",
    orateur_id: "orateur-jane-smith",
    theme_id: "theme-frontend",
    school_id: "school-dev-online",

    titre: "React & Écosystème",
    link: "https://example.com/react",
    contenu_texte:
      "Composants, hooks, state management et bonnes pratiques React.",

    created_at: "2025-02-10T09:00:00Z",
    updated_at: "2025-02-10T09:00:00Z",
  },

  /* =========================
     PROMO DEV MOBILE 2025
  ========================== */
  {
    id: "cours-mobile-fundamentals",
    promotion_id: "promo-2025-dev-mobile",
    planing_id: "planing-010",

    departement_id: "dept-informatique",
    orateur_id: "orateur-alex-mb",
    theme_id: "theme-mobile",
    school_id: "school-dev-online",

    titre: "Fondamentaux du développement mobile",
    link: null,
    contenu_texte:
      "Introduction aux concepts du développement mobile Android et iOS.",

    created_at: "2025-03-01T09:00:00Z",
    updated_at: "2025-03-01T09:00:00Z",
  },
  {
    id: "cours-react-native",
    promotion_id: "promo-2025-dev-mobile",
    planing_id: "planing-011",

    departement_id: "dept-informatique",
    orateur_id: "orateur-alex-mb",
    theme_id: "theme-mobile",
    school_id: "school-dev-online",

    titre: "Applications mobiles avec React Native",
    link: "https://example.com/react-native",
    contenu_texte:
      "Création d’applications mobiles cross-platform avec React Native.",

    created_at: "2025-03-05T09:00:00Z",
    updated_at: "2025-03-05T09:00:00Z",
  },

  /* =========================
     PROMO DATA & IA 2025
  ========================== */
  {
    id: "cours-python-data",
    promotion_id: "promo-2025-data-ai",
    planing_id: "planing-020",

    departement_id: "dept-informatique",
    orateur_id: "orateur-sarah-data",
    theme_id: "theme-data",
    school_id: "school-dev-online",

    titre: "Python pour la Data Science",
    link: "https://example.com/python-data",
    contenu_texte:
      "Bases de Python appliquées à l’analyse de données et aux statistiques.",

    created_at: "2025-03-15T09:00:00Z",
    updated_at: "2025-03-15T09:00:00Z",
  },
  {
    id: "cours-ml",
    promotion_id: "promo-2025-data-ai",
    planing_id: "planing-021",

    departement_id: "dept-informatique",
    orateur_id: "orateur-sarah-data",
    theme_id: "theme-ai",
    school_id: "school-dev-online",

    titre: "Introduction au Machine Learning",
    link: null,
    contenu_texte:
      "Algorithmes supervisés, non supervisés et premières implémentations.",

    created_at: "2025-03-20T09:00:00Z",
    updated_at: "2025-03-20T09:00:00Z",
  },

  /* =========================
     PROMO CYBERSÉCURITÉ 2025
  ========================== */
  {
    id: "cours-cyber-basics",
    promotion_id: "promo-2025-cybersecurity",
    planing_id: "planing-030",

    departement_id: "dept-informatique",
    orateur_id: "orateur-mike-sec",
    theme_id: "theme-security",
    school_id: "school-dev-online",

    titre: "Fondamentaux de la Cybersécurité",
    link: null,
    contenu_texte:
      "Introduction aux menaces, vulnérabilités et principes de sécurité.",

    created_at: "2025-04-01T09:00:00Z",
    updated_at: "2025-04-01T09:00:00Z",
  },
  {
    id: "cours-network-security",
    promotion_id: "promo-2025-cybersecurity",
    planing_id: "planing-031",

    departement_id: "dept-informatique",
    orateur_id: "orateur-mike-sec",
    theme_id: "theme-security",
    school_id: "school-dev-online",

    titre: "Sécurité des réseaux",
    link: "https://example.com/network-security",
    contenu_texte:
      "Pare-feu, VPN, attaques réseau et bonnes pratiques de protection.",

    created_at: "2025-04-05T09:00:00Z",
    updated_at: "2025-04-05T09:00:00Z",
  },
]
