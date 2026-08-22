import { formatCurrency } from "@/lib/formatters/currency"
import type { Account } from "@/types/account"
import { BanknoteIcon, WalletCardsIcon } from "lucide-react"

const accountIconStyles = {
  bank: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  cash: "bg-amber-400/20 text-amber-700 dark:text-amber-300",
  wallet: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
} as const

type AccountListItemProps = {
  account: Account
}

export function AccountListItem({ account }: AccountListItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 sm:gap-4">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold sm:size-11 sm:text-sm ${accountIconStyles[account.type]}`}
      >
        {account.type === "bank" ? (
          account.institutionCode ?? "BANK"
        ) : account.type === "cash" ? (
          <BanknoteIcon className="size-5" />
        ) : (
          <WalletCardsIcon className="size-5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium sm:text-base">{account.name}</p>
        {account.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
            {account.description}
          </p>
        )}
      </div>

      <p className="shrink-0 text-right font-semibold tabular-nums sm:text-base">
        {formatCurrency(account.balance)}
      </p>
    </div>
  )
}
