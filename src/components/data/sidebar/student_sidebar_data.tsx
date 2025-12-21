
import { SidebarSection } from "@/types/sidebar/items"
import {
  LayoutDashboard,
  User2,
  UserSquare2,
  Book,
  BookOpenCheck,
  History,
  LucideHome,
} from "lucide-react"

export const studentMenu: SidebarSection[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        href: "/std/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    id: "course_managment",
    label: "Partie cours",
    items: [
      {
        id: "course",
        label: "Mes cours",
        href: "/std/course",
        icon: User2,
      },
      {
        id: "journal",
        label: "Mon journal",
        href: "/std/journal",
        icon: History
      },
      {
        id: "devoirs",
        label: "Mes devoirs",
        href: "/std/homeworks",
        icon:LucideHome
      },
    ],
  },
  {
    id: "book_managment",
    label: "Partie livre",
    items: [
        {
        id: "read_book",
        label: "Les livres",
        href: "/std/books",
        icon: Book
      },
      {
        id: "create_summary",
        label: "Rapport de livre",
        href: "/std/summary",
        icon: BookOpenCheck,
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
