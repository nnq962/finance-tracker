import {
  BadgePercentIcon,
  CalendarClockIcon,
  ChevronRightIcon,
  CreditCardIcon,
  LandmarkIcon,
  VaultIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { formatCurrency } from "@/lib/currency"

import type {
  Account,
  SavingsAccount,
  SpendingAccount,
} from "./mock-accounts"

const accountIcons = {
  wallet: WalletIcon,
  landmark: LandmarkIcon,
  "credit-card": CreditCardIcon,
  vault: VaultIcon,
  "calendar-clock": CalendarClockIcon,
  "badge-percent": BadgePercentIcon,
} satisfies Record<Account["icon"], LucideIcon>

function AccountLeading({ account }: { account: Account }) {
  const AccountIcon = accountIcons[account.icon]

  return (
    <>
      <ItemMedia variant="icon">
        <AccountIcon />
      </ItemMedia>
    </>
  )
}

export function SpendingAccountItem({
  account,
}: {
  account: SpendingAccount
}) {
  return (
    <Item variant="muted">
      <AccountLeading account={account} />
      <ItemContent>
        <ItemTitle>{account.name}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <span className="font-medium tabular-nums">
          {formatCurrency(account.balance)}
        </span>
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </ItemActions>
    </Item>
  )
}

export function SavingsAccountItem({
  account,
}: {
  account: SavingsAccount
}) {
  return (
    <Item variant="muted">
      <AccountLeading account={account} />
      <ItemContent>
        <ItemTitle>{account.name}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </ItemActions>
      <ItemFooter>
        <p className="font-medium tabular-nums">
          {formatCurrency(account.balance)}
        </p>
        <p className="ml-auto text-right text-xs text-muted-foreground tabular-nums">
          {account.termMonths} tháng ·{" "}
          {account.interestRate.toLocaleString("vi-VN")}%/năm
        </p>
      </ItemFooter>
    </Item>
  )
}
