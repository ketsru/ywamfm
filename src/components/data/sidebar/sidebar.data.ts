
import { SidebarSection } from "@/lib/types/sidebar/items"
import {
  LayoutDashboard,
  User2,
  CreditCard,
  KeyRound,
  SquareAsterisk,
  UserRound,
  Key,
  UserSquare2,
  Cable,
  BookOpenCheck,
  LucideHome,
  History,
} from "lucide-react"

export const adminMenu: SidebarSection[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    id: "service_managment",
    label: "Gestion services",
    items: [
      {
        id: "department",
        label: "Les départements",
        href: "/departments",
        icon: User2,
      },
      {
        id: "theme",
        label: "Les thèmes",
        href: "/themes",
        icon: CreditCard,
      },
      {
        id: "orateur",
        label: "Les orateurs",
        href: "/orateurs",
        icon: Key
      },
      {
        id: "livre",
        label: "Les livres",
        href: "/livres",
        icon: Key
      },
    ],
  },

  // ================== Gestion d'une école ===========
  {
    id: "school_managment",
    label: "Gestion d'école",
    items: [
      {
        id: "create_school",
        label: "Enregistrer une école",
        href: "/schools",
        icon: BookOpenCheck,
      },
      {
        id: "create_outreach",
        label: "Phases pratiques",
        href: "/outreaches",
        icon: Cable,
      },
    ],
  },

  // ============== Gestion des cours ===============
  {
    id: "course_managment",
    label: "Partie cours",
    items: [
      {
        id: "course",
        label: "Mes cours",
        href: "/course",
        icon: User2,
      },
      {
        id: "journal",
        label: "Mon journal",
        href: "/journal",
        icon: History,
      },
      {
        id: "devoirs",
        label: "Homeworks",
        href: "/homeworks",
        icon:LucideHome,
      },
      {
        id: "create_summary",
        label: "Rapport de livre",
        href: "/summary",
        icon: BookOpenCheck,
      },
    ],
  },

  // ============ Gestion des accès ================
  {
    id: "user_managment",
    label: "Gestion des accès",
    items: [
      {
        id: "users",
        label: "Utilisateurs",
        icon: UserSquare2,
        href: "/users",
      },
      {
        id: "role-permissions",
        label: "Rôles et permissions",
        icon: KeyRound,
        href: "/role-permissions",
      },
    ],
  },

  {
    id: "supplement_managment",
    label: "Gestion des suppléments",
    items: [
      {
        id: "testimonies",
        label: "Les témoignages",
        icon: SquareAsterisk,
        href: "/testimonies",
      },
      {
        id: "newsletters",
        label: "Les newsletters",
        icon: UserRound,
        href: "/newsletters",
      },
    ],
  },
]
