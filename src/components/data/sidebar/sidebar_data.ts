
import { SidebarSection } from "@/types/sidebar/items"
import {
  LayoutDashboard,
  User2,
  CreditCard,
  Activity,
  Settings,
  Key,
  UserSquare2,
} from "lucide-react"

export const adminMenu: SidebarSection[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        href: "/admin/dashboard",
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
        href: "/admin/departments",
        icon: User2,
      },
      {
        id: "theme",
        label: "Les thèmes",
        href: "/admin/themes",
        icon: CreditCard,
      },
      {
        id: "orateur",
        label: "Les orateurs",
        href: "/admin/orateurs",
        icon: Key
      },
      {
        id: "livre",
        label: "Les livres",
        href: "/admin/livres",
        icon: Key
      },
    ],
  },
  {
    id: "school_managment",
    label: "Gestion d'école",
    items: [
      {
        id: "create_school",
        label: "Enregistrer une école",
        href: "/admin/register-school",
        icon: Activity,
      },
      {
        id: "create_outreach",
        label: "Phases pratiques",
        href: "/admin/register-outreach",
        icon: Activity,
      },
      {
        id: "more_managment",
        label: "Gestion supplémentaires",
        icon: Settings,
        children: [
          {
            id: "testimonies",
            label: "Les témoignages",
            href: "/admin/testimonies",
          },
          {
            id: "blog",
            label: "Les newsletters",
            href: "/admin/newsletters",
          },
        ],
      },
    ],
  },
  {
    id: "user_managment",
    label: "Gestion des utilisateurs",
    items: [
      {
        id: "users",
        label: "Utilisateurs",
        icon: UserSquare2,
        children: [
          {
            id: "students",
            label: "Les étudiants",
            href: "/admin/students",
          },
          {
            id: "staff",
            label: "Le personnel",
            href: "/admin/staff",
          },
          {
            id: "utilisateurs",
            label: "Les utilisateurs",
            href: "/admin/users",
          },
        ]
      },
    ],
  },
]
