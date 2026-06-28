

import AppSidebar from "@/components/app-sidebar"
import ProfileDropdown from "@/components/layout/student/student-header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full m-4">
        <div className="shadow-sm rounded-sm p-4 flex justify-between">
            <SidebarTrigger className="p-1 border cursor-pointer" />
            <ProfileDropdown />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}