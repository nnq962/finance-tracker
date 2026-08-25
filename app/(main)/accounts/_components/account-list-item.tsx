import type { ComponentProps } from "react"

import { InstitutionLogo } from "@/components/institution-logo"
import { getInstitution } from "@/lib/financial-institutions"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/formatters/currency"
import type { Account } from "@/types/account"
import {
  BanknoteIcon,
  Building2Icon,
  LockKeyholeIcon,
  WalletCardsIcon,
} from "lucide-react"

const accountIconStyles = {
  bank: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  cash: "text-teal-600 dark:text-teal-400",
  wallet: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
} as const

type AccountListItemProps = Omit<ComponentProps<"button">, "children"> & {
  account: Account
}

export function AccountListItem({
  account,
  className,
  ...props
}: AccountListItemProps) {
  const isInactive = account.status === "inactive"
  const institutionType = account.type === "wallet" ? "e-wallet" : "bank"
  const institution =
    account.type !== "cash" && account.institutionId
      ? getInstitution(institutionType, account.institutionId)
      : undefined
  const FallbackIcon =
    account.type === "cash"
      ? BanknoteIcon
      : account.type === "bank"
        ? Building2Icon
        : WalletCardsIcon

  return (
    <button
      {...props}
      type="button"
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/30 sm:gap-4",
        className
      )}
    >
      <div
        className={cn(
          "relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white shadow-xs sm:size-11",
          !institution && accountIconStyles[account.type]
        )}
      >
        {institution ? (
          <InstitutionLogo
            institution={institution}
            className={cn(
              "size-7 rounded-lg sm:size-8",
              isInactive && "opacity-60 grayscale-[0.35]"
            )}
          />
        ) : (
          <FallbackIcon
            className={cn("size-4.5", isInactive && "opacity-60")}
            aria-hidden="true"
          />
        )}
        {isInactive && (
          <span
            className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground shadow-xs"
            aria-hidden="true"
          >
            <LockKeyholeIcon className="size-2.5" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate font-medium sm:text-base",
            isInactive && "text-muted-foreground"
          )}
        >
          {account.name}
        </p>
        {isInactive && <span className="sr-only">Đã ngừng sử dụng</span>}
        {account.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
            {account.description}
          </p>
        )}
      </div>

      <p
        className={cn(
          "shrink-0 text-right font-semibold tabular-nums sm:text-base",
          isInactive && "text-muted-foreground"
        )}
      >
        {formatCurrency(account.balance)}
      </p>
    </button>
  )
}
