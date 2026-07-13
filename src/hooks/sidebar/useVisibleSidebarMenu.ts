// @/lib/hooks/useVisibleSidebarMenu.ts
"use client";

import { useMemo } from "react";
import { SidebarMenuItem, SidebarSection } from "@/lib/types/sidebar/menu";
import { PermissionKey } from "@/lib/types/access/permissions/permisionKey";
import { useCurrentUser } from "../useCurrentUser";

function hasAnyPermission(
  userPermissions: PermissionKey[] | undefined,
  required?: PermissionKey[]
): boolean {
  if (!required || required.length === 0) return true; // pas de gate = visible à tous
  if (!userPermissions || userPermissions.length === 0) return false;
  return required.some((perm) => userPermissions.includes(perm));
}

export function useVisibleSidebarMenu(fullMenu: SidebarSection[]): SidebarSection[] {
  const { user } = useCurrentUser();
  const userPermissions = user?.permissions;

  return useMemo(() => {
    return fullMenu
      .map((section) => {
        const visibleItems = section.items.filter((item: SidebarMenuItem) =>
          hasAnyPermission(userPermissions, item.requiredPermissions)
        );
        return { ...section, items: visibleItems };
      })
      .filter((section) => section.items.length > 0); // masque les sections vides
  }, [fullMenu, userPermissions]);
}