"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { studentMenu } from "@/components/data/sidebar/student_sidebar_data"
import { WithTooltip } from "./withTooltip"
import { SidebarItem, SidebarSection } from "@/types/sidebar/items"

export default function StudentSidebar() {
  const { open } = useSidebar()
  const collapsed = !open

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {studentMenu.map((section: SidebarSection) => (
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
                                    <div className="border rounded-md p-1.5">
                                        <item.icon className="h-5 w-5" />
                                    </div>
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
                            className="flex items-center gap-2 my-0 h-11"
                          >
                            {item.icon && (
                              <div className="border rounded-md p-1.5">
                                    <item.icon className="h-5 w-5" />
                                </div>
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
    </Sidebar>
  )
}
