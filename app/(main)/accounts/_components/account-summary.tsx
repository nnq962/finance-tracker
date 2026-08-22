"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/formatters/currency"
import type { Account } from "@/types/account"
import { EyeIcon, EyeOffIcon } from "lucide-react"

type AccountSummaryProps = {
  accounts: Account[]
}

export function AccountSummary({ accounts }: AccountSummaryProps) {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false)

  const spendingBalance = accounts
    .filter((account) => account.purpose === "spending")
    .reduce((total, account) => total + account.balance, 0)
  const savingsBalance = accounts
    .filter((account) => account.purpose === "savings")
    .reduce((total, account) => total + account.balance, 0)
  const totalBalance = spendingBalance + savingsBalance
  const spendingPercentage =
    totalBalance > 0 ? Math.round((spendingBalance / totalBalance) * 100) : 0
  const savingsPercentage = totalBalance > 0 ? 100 - spendingPercentage : 0

  const displayBalance = (balance: number) =>
    isBalanceHidden ? "••••••••" : formatCurrency(balance)

  return (
    <Card>
      <CardContent className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Tổng số dư
            </p>
            <p className="mt-2 truncate text-3xl font-semibold tracking-tight sm:text-4xl">
              {displayBalance(totalBalance)}
            </p>
          </div>

          <Button
            variant="secondary"
            size="icon"
            type="button"
            aria-label={isBalanceHidden ? "Hiện số dư" : "Ẩn số dư"}
            onClick={() => setIsBalanceHidden((hidden) => !hidden)}
          >
            {isBalanceHidden ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Phân bổ tài sản
          </p>

          <div className="mt-3 flex h-2 gap-1">
            <div
              className="rounded-full bg-orange-500 transition-[width] duration-500"
              style={{ width: `${spendingPercentage}%` }}
            />
            <div
              className="rounded-full bg-emerald-500 transition-[width] duration-500"
              style={{ width: `${savingsPercentage}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-sm font-semibold">
            <span className="text-orange-500">{spendingPercentage}%</span>
            <span className="text-emerald-500">{savingsPercentage}%</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-2xl bg-orange-500/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-orange-500 uppercase">
                <span className="size-2 shrink-0 rounded-full bg-orange-500" />
                <span>Chi tiêu</span>
              </div>
              <p className="mt-2 truncate text-lg font-semibold tracking-tight sm:text-xl">
                {displayBalance(spendingBalance)}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-emerald-500/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-500 uppercase">
                <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                <span>Tiết kiệm</span>
              </div>
              <p className="mt-2 truncate text-lg font-semibold tracking-tight sm:text-xl">
                {displayBalance(savingsBalance)}
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
