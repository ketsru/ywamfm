"use client";

import { ReactNode, useEffect }          from "react";
import { useRouter, usePathname }        from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar                          from "@/components/app-sidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import ProfileDropdown from "@/components/layout/student/student-header";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useCurrentUser();
  const router            = useRouter();
  const pathname          = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
        <main className="antialiased w-full p-4">
          <div className="shadow-sm rounded-sm p-4 flex justify-between">
            <SidebarTrigger className="p-1 border cursor-pointer" />
            <ProfileDropdown />
          </div>
          {children}
        </main>
    </SidebarProvider>
  );
}