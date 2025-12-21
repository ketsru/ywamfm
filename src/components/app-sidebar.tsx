"use client"

import Link from "next/link"
import { ChevronDown, ChevronUp, User2 } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { adminMenu } from "@/components/data/sidebar/sidebar_data"
import { WithTooltip } from "./sidebar/withTooltip"
import { SidebarItem, SidebarSection } from "@/types/sidebar/items"

export default function AdminSidebar() {
  const { open } = useSidebar()
  const collapsed = !open

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {adminMenu.map((section: SidebarSection) => (
          <SidebarGroup key={section.id}>

            {/* SECTION LABEL */}
            {section.label && !collapsed && (
              <SidebarGroupLabel className="px-2 text-xs uppercase font-bold">
                {section.label}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item: SidebarItem) => (
                  <SidebarMenuItem key={item.id}>

                    {/* ===== ITEM AVEC SOUS-MENU ===== */}
                    {item.children ? (
                      <Collapsible className="group/collapsible">
                        <WithTooltip
                          label={item.label}
                          collapsed={collapsed}
                        >
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="flex w-full items-center justify-between">
                              <div className="flex items-center gap-2">
                                {item.icon && (
                                  <item.icon className="h-5 w-5" />
                                )}
                                {!collapsed && (
                                  <span>{item.label}</span>
                                )}
                              </div>

                              {!collapsed && (
                                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                        </WithTooltip>

                        {!collapsed && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map(sub => (
                                <SidebarMenuSubItem key={sub.id}>
                                  <Link
                                    href={sub.href!}
                                    className="flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                                  >
                                    {sub.label}
                                  </Link>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </Collapsible>
                    ) : (
                      /* ===== ITEM SIMPLE ===== */
                      <WithTooltip
                        label={item.label}
                        collapsed={collapsed}
                      >
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.href!}
                            className="flex items-center gap-2"
                          >
                            {item.icon && (
                              <item.icon className="h-5 w-5" />
                            )}
                            {!collapsed && (
                              <span>{item.label}</span>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </WithTooltip>
                    )}
                  </SidebarMenuItem>
                ))}

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        </SidebarContent>

      {/*  FOOTER */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!collapsed && "Compte"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <DropdownMenu>
              <WithTooltip
                label="Centre d'aide"
                collapsed={collapsed}
              >
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <User2 className="h-5 w-5" />
                      {!collapsed && (
                        <span className="text-sm">
                          Centre d’aide
                        </span>
                      )}
                    </div>

                    {!collapsed && (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </WithTooltip>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/help">Documentation</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profil</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
