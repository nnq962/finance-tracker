"use client"

import { useState } from "react"
import { ArrowDownUpIcon } from "lucide-react"

import { PageSection } from "@/components/page-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency"

import {
  getTransferAccount,
  type TransferAccountId,
} from "./transfer-accounts"

type TransferAccount = ReturnType<typeof getTransferAccount>

function AccountSummary({
  account,
}: {
  account: TransferAccount
}) {
  const Icon = account.icon

  return (
    <div className="flex min-w-0 items-center py-2">
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1 pl-1 text-left">
          <span className="block truncate text-sm font-semibold">
            {account.name}
          </span>
          <span className="block truncate text-sm tabular-nums text-muted-foreground">
            {formatCurrency(account.balance)}
          </span>
        </span>
      </span>
    </div>
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
    <PageSection>
      <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        Tài khoản
      </h2>

      <Card size="sm">
        <CardContent>
          <AccountSummary account={fromAccount} />

          <div className="flex h-10 items-center justify-between">
            <span
              className="flex h-full w-10 items-center justify-center overflow-hidden text-foreground"
              aria-hidden="true"
            >
              <span className="transfer-flow-line h-full" />
            </span>
            <Button
              type="button"
              size="icon-sm"
              aria-label={`Đảo chiều: ${fromAccount.name} sang ${toAccount.name}`}
              onClick={swapAccounts}
            >
              <ArrowDownUpIcon data-icon="inline-start" />
            </Button>
          </div>

          <AccountSummary account={toAccount} />
        </CardContent>
      </Card>
    </PageSection>
  )
}
