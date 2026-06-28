
import { LucideIcon } from "lucide-react"

export type SidebarItem = {
  id: string
  label: string
  href?: string
  icon?: LucideIcon

  children?: SidebarItem[]

  /** UX */
  badge?: string
  disabled?: boolean
  external?: boolean

  /** Sécurité / logique */
  //roles?: ("ADMIN" | "USER" | "DEVELOPER")[]
  //permissions?: string[]
}


export type SidebarSection = {
  id: string
  label?: string
  items: SidebarItem[]
}
