"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  ArrowLeftRightIcon,
  ChartNoAxesCombinedIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  PackageIcon,
} from "lucide-react"

const data = {
  navMain: [
    {
      title: "Tổng quan",
      url: "/overview",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Giao dịch",
      url: "/transactions",
      icon: <ArrowLeftRightIcon />,
    },
    {
      title: "Theo dõi",
      url: "/tracking",
      icon: <ChartNoAxesCombinedIcon />,
    },
    {
      title: "Cài đặt",
      url: "/settings",
      icon: <SettingsIcon />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/overview" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <PackageIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Finance Tracker</span>
                <span className="truncate text-xs">Quản lý tài chính</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
