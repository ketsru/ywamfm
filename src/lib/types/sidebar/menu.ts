// @/lib/types/sidebar/menu.ts

import { LucideIcon } from "lucide-react";
import { PermissionKey } from "@/lib/types/access/permissions/permisionKey";

export interface SidebarMenuItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /**
   * Permissions requises pour voir cet item.
   * Absent/undefined = visible à tout utilisateur authentifié.
   * Si plusieurs clés sont fournies, l'item est visible si l'utilisateur
   * possède AU MOINS UNE d'entre elles (logique OR).
   */
  requiredPermissions?: PermissionKey[];
}

export interface SidebarSection {
  id: string;
  label?: string;
  items: SidebarMenuItem[];
  /**
   * Permissions requises pour voir la section entière, en plus du filtrage
   * par item. Utile si la section ne doit apparaître que si au moins un
   * item est visible — géré automatiquement par le hook de filtrage,
   * ce champ reste optionnel pour un gate explicite au niveau section.
   */
  requiredPermissions?: PermissionKey[];
}