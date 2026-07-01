"use client"

import Link              from "next/link"
import Image             from "next/image"
import { ChevronDown, ChevronUp, LogOut, User2 } from "lucide-react"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
    SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarMenuSub, SidebarMenuSubItem, useSidebar,
} from "@/components/ui/sidebar"
import {
    Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn }                  from "@/lib/utils"
import { WithTooltip }         from "./sidebar/withTooltip"
import { useSidebarSections } from "@/hooks/sidebar/useSidebarSections"
import { PermissionKey } from "@/lib/types/access/permissions/permisionKey"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { RoleKey } from "@/lib/types/access/role/role.types"
import { sidebarMenu } from "./data/sidebar/sidebar.data"
import { useSidebarMenu } from "@/hooks/sidebar/useSidebarMenu"

export default function AppSidebar() {
    const { open }  = useSidebar()
    const collapsed = !open
    const { user }  = useCurrentUser()

    // Permissions et rôles de l'utilisateur connecté
    const userPermissions = (user?.permissions ?? []) as PermissionKey[]

    const userRoles = user?.roleKey
        ? [user.roleKey as RoleKey]
        : []

    const filteredSections = useSidebarSections(sidebarMenu, {
        userRoles,
        userPermissions,
    })

    const menu = useSidebarMenu(filteredSections)

    return (
      <Sidebar collapsible="icon">

        {/* ── Header ── */}
        <SidebarHeader>
            <SidebarGroup>
              <SidebarGroupLabel className="flex space-x-3 bg-background items-center justify-center h-14">
                {!collapsed && (
                  <>
                    <Image
                        src="/assets/logo/ywam.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="rounded-full"
                        priority
                    />
                    <span className="text-xl font-bold text-primary">
                        YWAM
                    </span>
                  </>
                )}
              </SidebarGroupLabel>
            </SidebarGroup>
        </SidebarHeader>

            {/* ── Menu ── */}
            <SidebarContent>
                {menu.map((section) => (
                    <SidebarGroup key={section.id}>

                        {section.label && !collapsed && (
                            <SidebarGroupLabel className="px-2 text-xs uppercase font-bold tracking-wider">
                                {section.label}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.id}>

                                        {/* Item avec sous-menu */}
                                        {item.children ? (
                                            <Collapsible
                                                defaultOpen={item.isActive}
                                                className="group/collapsible"
                                            >
                                                <WithTooltip label={item.label} collapsed={collapsed}>
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuButton
                                                            className={cn(
                                                                "flex w-full items-center justify-between",
                                                                item.isActive && "bg-muted font-semibold"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {item.icon && <item.icon className="h-5 w-5" />}
                                                                {!collapsed && <span>{item.label}</span>}
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
                                                            {item.children.map((sub) => (
                                                                <SidebarMenuSubItem key={sub.id}>
                                                                    <Link
                                                                        href={sub.href!}
                                                                        className={cn(
                                                                            "flex w-full items-center rounded-md px-2 py-1.5 text-sm",
                                                                            sub.isActive
                                                                                ? "bg-primary text-white"
                                                                                : "hover:bg-muted"
                                                                        )}
                                                                    >
                                                                        {sub.icon && (
                                                                            <sub.icon className="h-4 w-4 mr-2" />
                                                                        )}
                                                                        {sub.label}
                                                                    </Link>
                                                                </SidebarMenuSubItem>
                                                            ))}
                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                )}
                                            </Collapsible>
                                        ) : (
                                            /* Item simple */
                                            <WithTooltip label={item.label} collapsed={collapsed}>
                                                <SidebarMenuButton asChild>
                                                    <Link
                                                        href={item.href!}
                                                        className={cn(
                                                            "flex items-center gap-2",
                                                            item.isActive
                                                                ? "bg-primary text-white"
                                                                : "hover:bg-muted"
                                                        )}
                                                    >
                                                        {item.icon && <item.icon className="h-5 w-5" />}
                                                        {!collapsed && <span>{item.label}</span>}
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

            {/* ── Footer ── */}
            <SidebarFooter>
                <SidebarGroup>
                    {!collapsed && (
                        <SidebarGroupLabel>Compte</SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                        <DropdownMenu>
                            <WithTooltip label="Mon compte" collapsed={collapsed}>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="flex w-full items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            {user?.avatarUrl ? (
                                                <Image
                                                    src={user.avatarUrl}
                                                    alt="Avatar"
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <User2 className="h-5 w-5" />
                                            )}
                                            {!collapsed && (
                                                <div className="flex flex-col text-left">
                                                    <span className="text-sm font-medium leading-tight">
                                                        {user?.firstName
                                                            ? `${user.firstName} ${user.lastName ?? ""}`
                                                            : user?.firstName ?? "Mon compte"}
                                                    </span>
                                                    {user?.email && (
                                                        <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                                                            {user.email}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {!collapsed && <ChevronUp className="h-4 w-4 shrink-0" />}
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                            </WithTooltip>

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex items-center gap-2">
                                        <User2 className="h-4 w-4" />
                                        Mon profil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/auth/logout"
                                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Se déconnecter
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}