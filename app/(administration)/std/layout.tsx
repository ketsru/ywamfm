

import StudentHeader from "@/components/layout/student/student-header"
import StudentSidebar from "@/components/sidebar/student-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <main className="w-full m-4">
        <div className="shadow-sm rounded-sm p-4 flex justify-between">
            <SidebarTrigger className="p-1 border cursor-pointer" />
            <StudentHeader />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}