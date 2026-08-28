import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters/currency"
import type { Account } from "@/types/account"

type AccountSummaryProps = {
  accounts: Account[]
}

export function AccountSummary({ accounts }: AccountSummaryProps) {
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

  return (
    <Card>
      <CardContent className="space-y-5">
        <div className="min-w-0">
          <p className="text-base font-medium">Tổng số dư</p>
          <p className="mt-2 truncate text-3xl font-semibold tracking-tight md:text-4xl">
            {formatCurrency(totalBalance)}
          </p>
        </div>

        <div>
          <div className="flex h-2 gap-1">
            <div
              className="rounded-full bg-spending transition-[width] duration-500"
              style={{ width: `${spendingPercentage}%` }}
            />
            <div
              className="rounded-full bg-savings transition-[width] duration-500"
              style={{ width: `${savingsPercentage}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-2xl bg-spending/10 px-4 py-3">
              <div className="flex items-center justify-between gap-3 text-spending">
                <div className="flex min-w-0 items-center gap-2 text-sm font-semibold tracking-wide">
                  <span className="size-2 shrink-0 rounded-full bg-spending" />
                  <span>Chi tiêu</span>
                </div>
                <span className="shrink-0 text-sm font-semibold">
                  {spendingPercentage}%
                </span>
              </div>
              <p className="mt-2 truncate text-base font-semibold tracking-tight">
                {formatCurrency(spendingBalance)}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-savings/10 px-4 py-3">
              <div className="flex items-center justify-between gap-3 text-savings">
                <div className="flex min-w-0 items-center gap-2 text-sm font-semibold tracking-wide">
                  <span className="size-2 shrink-0 rounded-full bg-savings" />
                  <span>Tiết kiệm</span>
                </div>
                <span className="shrink-0 text-sm font-semibold">
                  {savingsPercentage}%
                </span>
              </div>
              <p className="mt-2 truncate text-base font-semibold tracking-tight">
                {formatCurrency(savingsBalance)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
