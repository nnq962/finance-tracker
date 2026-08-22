"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  ArrowLeftRightIcon,
  ChartNoAxesCombinedIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  WalletCardsIcon,
  Package,
} from "lucide-react"

const data = {
  user: {
    name: "Finance User",
    email: "personal workspace",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Tài khoản",
      url: "/accounts",
      icon: <WalletCardsIcon />,
    },
    {
      title: "Giao dịch",
      url: "/transactions",
      icon: <ArrowLeftRightIcon />,
    },
    {
      title: "Báo cáo",
      url: "/reports",
      icon: <ChartNoAxesCombinedIcon />,
    },
    {
      title: "Cài đặt",
      url: "/settings",
      icon: <Settings2Icon />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Package className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Finance Tracker</span>
                <span className="truncate text-xs">Personal finance</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
