"use client"

import type { ReactNode } from "react"

import { SavingsAccountDetails } from "./savings-account-details"
import { SpendingAccountDetails } from "./spending-account-details"

import { ResponsiveDrawer } from "@/components/responsive-drawer"
import type { Account } from "@/types/account"

type AccountDetailDrawerProps = {
  account: Account | null
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountDetailDrawer({
  account,
  children,
  open,
  onOpenChange,
}: AccountDetailDrawerProps) {
  return (
    <ResponsiveDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={account?.name ?? "Chi tiết tài khoản"}
      trigger={children}
      bodyClassName="space-y-4"
    >
      {account?.purpose === "spending" && (
        <SpendingAccountDetails />
      )}
      {account?.purpose === "savings" && (
        <SavingsAccountDetails />
      )}
    </ResponsiveDrawer>
  )
}
