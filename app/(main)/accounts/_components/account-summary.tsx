import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
          <p className="mt-2 truncate text-3xl font-semibold tracking-tight sm:text-4xl">
            {formatCurrency(totalBalance)}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium">
            Phân bổ tài sản
          </p>

          <div className="mt-3 flex h-2 gap-1">
            <div
              className="rounded-full bg-spending transition-[width] duration-500"
              style={{ width: `${spendingPercentage}%` }}
            />
            <div
              className="rounded-full bg-savings transition-[width] duration-500"
              style={{ width: `${savingsPercentage}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-sm font-semibold">
            <span className="text-spending">{spendingPercentage}%</span>
            <span className="text-savings">{savingsPercentage}%</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-2xl bg-spending/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-spending uppercase">
                <span className="size-2 shrink-0 rounded-full bg-spending" />
                <span>Chi tiêu</span>
              </div>
              <p className="mt-2 truncate text-lg font-semibold tracking-tight sm:text-xl">
                {formatCurrency(spendingBalance)}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-savings/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-savings uppercase">
                <span className="size-2 shrink-0 rounded-full bg-savings" />
                <span>Tiết kiệm</span>
              </div>
              <p className="mt-2 truncate text-lg font-semibold tracking-tight sm:text-xl">
                {formatCurrency(savingsBalance)}
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
