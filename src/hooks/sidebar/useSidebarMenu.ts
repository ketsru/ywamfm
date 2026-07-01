import { SidebarItem, SidebarSection } from "@/lib/types/sidebar/menu"
import { usePathname } from "next/navigation"

export function useSidebarMenu(sections: SidebarSection[]) {
  const pathname = usePathname()

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname.startsWith(href)
  }

  const mapItems = (items: SidebarItem[]): SidebarItem[] => {
    return items.map(item => {
      const active = isActive(item.href)

      const children = item.children ? mapItems(item.children) : undefined

      const isChildActive = children?.some(child => child.isActive)

      return {
        ...item,
        isActive: active || isChildActive,
        children,
      }
    })
  }

  return sections.map(section => ({
    ...section,
    items: mapItems(section.items),
  }))
}