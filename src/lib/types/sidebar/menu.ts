// @/lib/types/sidebar/menu.ts

import { LucideIcon } from "lucide-react";
import { RoleKey } from "../access/role/role.types";
import { PermissionKey } from "../access/permissions/permisionKey";

export type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: SidebarItem[];

  /** UX */
  badge?: string;
  disabled?: boolean;
  external?: boolean;

  /** STATE */
  isActive?: boolean;

  /** ACCESS CONTROL */
  requiredRoles?: RoleKey[];
  requiredPermissions?: PermissionKey[];
};

export type SidebarSection = {
  id: string;
  label?: string;
  items: SidebarItem[];

  /** ACCESS CONTROL */
  requiredRoles?: RoleKey[];
  requiredPermissions?: PermissionKey[];
};