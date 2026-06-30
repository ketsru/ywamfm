// mock-roles.ts

import { PermissionKey } from "@/lib/types/access/permissions/permisionKey"
import { 
    Role,
    RoleKey,
    RoleResponseDto,
    RolePage,
 } from "@/lib/types/access/role/role.types"


export const mockRoles: Role[] = [
  {
    id: "role-001",
    key: RoleKey.ADMIN,
    name: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités de la plateforme.",
    active: true,
    permissions: Object.values(PermissionKey), // toutes les permissions
  },
  {
    id: "role-002",
    key: RoleKey.USER,
    name: "Utilisateur",
    description: "Compte standard avec accès limité à son propre profil.",
    active: true,
    permissions: [
      PermissionKey.USER_VIEW_SELF,
      PermissionKey.USER_UPDATE_SELF,
      PermissionKey.USER_ENABLE_2FA,
      PermissionKey.USER_DISABLE_2FA,
      PermissionKey.USER_MANAGE_SESSIONS,
      PermissionKey.NOTIFICATION_VIEW,
    ],
  },
  {
    id: "role-003",
    key: RoleKey.TRAINING_CENTER,
    name: "Centre de formation",
    description: "Gère les cours, les étudiants, les emplois du temps et les notes.",
    active: true,
    permissions: [
      PermissionKey.COURSE_VIEW,
      PermissionKey.COURSE_CREATE,
      PermissionKey.COURSE_UPDATE,
      PermissionKey.COURSE_DELETE,
      PermissionKey.STUDENT_VIEW,
      PermissionKey.STUDENT_CREATE,
      PermissionKey.STUDENT_UPDATE,
      PermissionKey.STAFF_VIEW,
      PermissionKey.SCHEDULE_VIEW,
      PermissionKey.SCHEDULE_CREATE,
      PermissionKey.SCHEDULE_UPDATE,
      PermissionKey.ASSIGNMENT_VIEW,
      PermissionKey.ASSIGNMENT_CREATE,
      PermissionKey.ASSIGNMENT_GRADE,
      PermissionKey.GRADE_VIEW,
      PermissionKey.GRADE_CREATE,
      PermissionKey.GRADE_UPDATE,
      PermissionKey.ANNOUNCEMENT_VIEW,
      PermissionKey.ANNOUNCEMENT_CREATE,
    ],
  },
  {
    id: "role-004",
    key: RoleKey.BTP_PROVIDER,
    name: "Prestataire BTP",
    description: "Propose des services de construction et de bâtiment.",
    active: true,
    permissions: [
      PermissionKey.USER_VIEW_SELF,
      PermissionKey.USER_UPDATE_SELF,
      PermissionKey.DOCUMENT_VIEW,
      PermissionKey.DOCUMENT_CREATE,
      PermissionKey.NOTIFICATION_VIEW,
    ],
  },
  {
    id: "role-005",
    key: RoleKey.SERVICE_SEEKER,
    name: "Demandeur de service",
    description: "Recherche et sollicite des prestataires pour ses projets.",
    active: true,
    permissions: [
      PermissionKey.USER_VIEW_SELF,
      PermissionKey.USER_UPDATE_SELF,
      PermissionKey.DOCUMENT_VIEW,
      PermissionKey.NOTIFICATION_VIEW,
    ],
  },
  {
    id: "role-006",
    key: RoleKey.MATERIAL_SUPPLIER,
    name: "Fournisseur de matériel",
    description: "Vend et gère du matériel destiné aux chantiers.",
    active: false,
    permissions: [
      PermissionKey.USER_VIEW_SELF,
      PermissionKey.USER_UPDATE_SELF,
      PermissionKey.DOCUMENT_VIEW,
      PermissionKey.DOCUMENT_CREATE,
    ],
  },
]

// Exemple de RoleResponseDto (un seul rôle)
export const mockRoleResponse: RoleResponseDto = {
  id: mockRoles[0].id,
  key: mockRoles[0].key,
  name: mockRoles[0].name,
  description: mockRoles[0].description ?? null,
  active: mockRoles[0].active,
  permissions: mockRoles[0].permissions ?? [],
}

// Exemple de liste paginée RolePage
export const mockRolePage: RolePage = {
  content: mockRoles.map((role) => ({
    id: role.id,
    key: role.key,
    name: role.name,
    description: role.description ?? null,
    active: role.active,
    permissions: role.permissions ?? [],
  })),
  page: 0,
  size: 10,
  totalElements: mockRoles.length,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
}