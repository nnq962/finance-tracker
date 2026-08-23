import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 md:p-6 md:pt-0 lg:px-20 xl:px-36 2xl:px-56">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
