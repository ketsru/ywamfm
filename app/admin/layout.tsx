

import AppSidebar from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full m-4">
        <div className="shadow rounded-sm p-4 bg-gray-100">
            <SidebarTrigger className="p-1 border cursor-pointer" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}