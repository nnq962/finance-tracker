import {
  BanknoteIcon,
  Building2Icon,
  WalletCardsIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { AccountType } from "@/types/account"

const accountTypeIconStyles = {
  bank: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  cash: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  wallet: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
} as const

const accountTypeIcons = {
  bank: Building2Icon,
  cash: BanknoteIcon,
  wallet: WalletCardsIcon,
} as const

type AccountTypeIconProps = {
  type: AccountType
  className?: string
}

export function AccountTypeIcon({ type, className }: AccountTypeIconProps) {
  const Icon = accountTypeIcons[type]

  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/70",
        accountTypeIconStyles[type],
        className
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
    </span>
  )
}
