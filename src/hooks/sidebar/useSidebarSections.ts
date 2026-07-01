// @/hooks/useSidebarSections.ts
import { PermissionKey } from "@/lib/types/access/permissions/permisionKey";
import { RoleKey } from "@/lib/types/access/role/role.types";
import { SidebarItem, SidebarSection } from "@/lib/types/sidebar/menu";
import { useMemo } from "react";

interface Options {
  userRoles: RoleKey[];
  userPermissions: PermissionKey[];
}

const hasRole = (required?: RoleKey[], userRoles?: RoleKey[]): boolean =>
  !required?.length || required.some((r) => userRoles?.includes(r));

const hasPermission = (required?: PermissionKey[], userPermissions?: PermissionKey[]): boolean =>
  !required?.length || required.some((p) => userPermissions?.includes(p));

const filterItem = (
  item: SidebarItem,
  userRoles: RoleKey[],
  userPermissions: PermissionKey[]
): SidebarItem | null => {
  if (!hasRole(item.requiredRoles, userRoles)) return null;
  if (!hasPermission(item.requiredPermissions, userPermissions)) return null;

  if (item.children?.length) {
    const filteredChildren = item.children
      .map((child) => filterItem(child, userRoles, userPermissions))
      .filter(Boolean) as SidebarItem[];

    if (!filteredChildren.length) return null;
    return { ...item, children: filteredChildren };
  }

  return item;
};

export const useSidebarSections = (
  sections: SidebarSection[],
  { userRoles, userPermissions }: Options
): SidebarSection[] =>
  useMemo(() => {
    console.log("=== useSidebarSections ===");
    console.log("userRoles:", userRoles);
    console.log("userPermissions:", userPermissions);

    return sections
      .filter((section) => {
        const pass = hasRole(section.requiredRoles, userRoles);
        console.log(`section [${section.id}] requiredRoles:`, section.requiredRoles, "→", pass);
        return pass;
      })
      .map((section) => ({
        ...section,
        items: section.items
          .map((item) => filterItem(item, userRoles, userPermissions))
          .filter(Boolean) as SidebarItem[],
      }))
      .filter((section) => section.items.length > 0);
  }, [sections, userRoles, userPermissions]);