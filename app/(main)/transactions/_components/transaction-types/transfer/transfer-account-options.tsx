"use client"

import { useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/currency"

import { TransferAccountMenu } from "./transfer-account-menu"
import {
  getTransferAccount,
  type TransferAccountId,
} from "./transfer-accounts"

type TransferAccount = ReturnType<typeof getTransferAccount>

function AccountSummary({
  account,
  value,
  excludedValue,
  onValueChange,
  className,
}: {
  account: TransferAccount
  value: TransferAccountId
  excludedValue: TransferAccountId
  onValueChange: (value: TransferAccountId) => void
  className?: string
}) {
  const Icon = account.icon

  return (
    <TransferAccountMenu
      label="Chọn tài khoản"
      value={value}
      excludedValue={excludedValue}
      onValueChange={onValueChange}
      triggerClassName={cn("text-left [&>svg]:hidden", className)}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Icon className="size-4 shrink-0" />
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-medium">{account.name}</p>
          <p className="truncate text-sm tabular-nums text-muted-foreground">
            {formatCurrency(account.balance)}
          </p>
        </div>
      </div>
    </TransferAccountMenu>
  )
}

export function TransferAccountOptions() {
  const [fromAccountId, setFromAccountId] =
    useState<TransferAccountId>("mb-bank")
  const [toAccountId, setToAccountId] =
    useState<TransferAccountId>("techcombank")
  const fromAccount = getTransferAccount(fromAccountId)
  const toAccount = getTransferAccount(toAccountId)

  function swapAccounts() {
    setFromAccountId(toAccountId)
    setToAccountId(fromAccountId)
  }

  return (
    <section className="space-y-3">
      <h2 className="font-heading text-base font-medium">Tài khoản</h2>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
        <AccountSummary
          account={fromAccount}
          value={fromAccountId}
          excludedValue={toAccountId}
          onValueChange={setFromAccountId}
          className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-foreground/5"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Đảo chiều tài khoản"
          onClick={swapAccounts}
        >
          <ArrowRightIcon />
        </Button>
        <AccountSummary
          account={toAccount}
          value={toAccountId}
          excludedValue={fromAccountId}
          onValueChange={setToAccountId}
          className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-foreground/5"
        />
      </div>
    </section>
  )
}
