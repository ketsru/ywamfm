import { SidebarSection } from "@/lib/types/sidebar/menu"
import { PermissionKey } from "@/lib/types/access/permissions/permisionKey"
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
  BookOpen,
} from "lucide-react"

export const sidebarMenu: SidebarSection[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        href: "/dashboard",
        icon: LayoutDashboard,
        // pas de permission requise — accessible à tout utilisateur connecté
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
        requiredPermissions: [PermissionKey.DEPARTMENT_VIEW],
      },
      {
        id: "theme",
        label: "Les thèmes",
        href: "/themes",
        icon: CreditCard,
        requiredPermissions: [PermissionKey.THEME_VIEW],
      },
      {
        id: "orateur",
        label: "Les orateurs",
        href: "/orateurs",
        icon: Key,
        requiredPermissions: [PermissionKey.PREACHER_VIEW],
      },
      {
        id: "livre",
        label: "Les livres",
        href: "/livres",
        icon: Key,
        requiredPermissions: [PermissionKey.BOOK_VIEW],
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
        requiredPermissions: [PermissionKey.SCHOOL_VIEW],
      },
      {
        id: "promotions-managment",
        label: "Gestion des promotions",
        href: "/promotions",
        icon: BookOpen,
        requiredPermissions: [PermissionKey.PROMOTION_VIEW],
      },
      {
        id: "plannings-managment",
        label: "Gestion des plannings",
        href: "/plannings",
        icon: BookOpenCheck,
        // ⚠️ Aucune clé PLANNING_* dans le seeder — je suppose que "planning"
        // est couvert par SCHEDULE_VIEW. À confirmer/ajuster.
        requiredPermissions: [PermissionKey.SCHEDULE_VIEW],
      },
      {
        id: "create_outreach",
        label: "Phases pratiques",
        href: "/outreaches",
        icon: Cable,
        requiredPermissions: [PermissionKey.OUTREACH_VIEW],
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
        requiredPermissions: [PermissionKey.COURSE_VIEW],
      },
      {
        id: "journal",
        label: "Mon journal",
        href: "/journal",
        icon: History,
        // ⚠️ Aucune clé dédiée — probablement une vue personnelle
        // (self-service), donc pas de gate spécifique ici.
      },
      {
        id: "devoirs",
        label: "Homeworks",
        href: "/homeworks",
        icon: LucideHome,
        requiredPermissions: [PermissionKey.ASSIGNMENT_VIEW],
      },
      {
        id: "create_summary",
        label: "Rapport de livre",
        href: "/summary",
        icon: BookOpenCheck,
        // ⚠️ Pas de clé RAPPORT_*/REPORT_* dédiée aux rapports de lecture
        // vue étudiant — REPORT_VIEW existe mais semble plutôt destiné aux
        // rapports staff/manager (REPORT_VIEW/EXPORT/DELETE assignés à
        // STAFF/SECRETARY/MANAGER, pas STUDENT). Un étudiant qui soumet son
        // propre rapport de lecture s'appuie plutôt sur ASSIGNMENT_SUBMIT.
        requiredPermissions: [PermissionKey.ASSIGNMENT_SUBMIT, PermissionKey.REPORT_VIEW],
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
        requiredPermissions: [PermissionKey.USER_VIEW],
      },
      {
        id: "role-permissions",
        label: "Rôles et permissions",
        icon: KeyRound,
        href: "/role-permissions",
        requiredPermissions: [PermissionKey.ROLE_VIEW, PermissionKey.PERMISSION_VIEW],
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
        // ⚠️ Aucune PermissionKey TESTIMONY_* dans le seeder — non gaté
        // pour l'instant. Voir remarque plus bas.
      },
      {
        id: "newsletters",
        label: "Les newsletters",
        icon: UserRound,
        href: "/newsletters",
        // ⚠️ Idem — pas de NEWSLETTER_* dans le seeder.
      },
    ],
  },
]