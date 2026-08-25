"use client"

import type { ReactNode } from "react"

import { SavingsAccountActions } from "./savings-account-actions"
import { SpendingAccountActions } from "./spending-account-actions"

import { ResponsiveDrawer } from "@/components/responsive-drawer"
import type { Account } from "@/types/account"

type AccountActionsDrawerProps = {
  account: Account | null
  children: ReactNode
  open: boolean
  onAdjustBalance: () => void
  onEditSpendingAccount: () => void
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete: (open: boolean) => void
}

export function AccountActionsDrawer({
  account,
  children,
  open,
  onAdjustBalance,
  onEditSpendingAccount,
  onOpenChange,
  onOpenChangeComplete,
}: AccountActionsDrawerProps) {
  return (
    <ResponsiveDrawer
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      title={account?.name ?? "Chi tiết tài khoản"}
      trigger={children}
      bodyClassName="space-y-4"
    >
      {account?.purpose === "spending" && (
        <SpendingAccountActions
          onAdjustBalance={onAdjustBalance}
          onEdit={onEditSpendingAccount}
        />
      )}
      {account?.purpose === "savings" && (
        <SavingsAccountActions />
      )}
    </ResponsiveDrawer>
  )
}
