"use client";

import type { ReactNode } from "react";
import {
  BanIcon,
  BadgePercentIcon,
  CalendarClockIcon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  CreditCardIcon,
  LandmarkIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
  VaultIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";

import { AppDrawer } from "@/components/app-drawer";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { formatCurrency } from "@/lib/currency";

import type { Account, SavingsAccount, SpendingAccount } from "./mock-accounts";

const accountIcons = {
  wallet: WalletIcon,
  landmark: LandmarkIcon,
  "credit-card": CreditCardIcon,
  vault: VaultIcon,
  "calendar-clock": CalendarClockIcon,
  "badge-percent": BadgePercentIcon,
} satisfies Record<Account["icon"], LucideIcon>;

const spendingAccountActions = [
  { label: "Điều chỉnh số dư", icon: SlidersHorizontalIcon },
  { label: "Chỉnh sửa", icon: PencilIcon },
  { label: "Ngừng sử dụng", icon: BanIcon },
  { label: "Xóa", icon: Trash2Icon, destructive: true },
];

const savingsAccountActions = [
  { label: "Gửi thêm", icon: PlusIcon },
  { label: "Rút một phần", icon: MinusIcon },
  { label: "Tất toán", icon: CircleDollarSignIcon },
  { label: "Chỉnh sửa", icon: PencilIcon },
  { label: "Xóa", icon: Trash2Icon, destructive: true },
];

function AccountLeading({ account }: { account: Account }) {
  const AccountIcon = accountIcons[account.icon];

  return (
    <>
      <ItemMedia variant="icon">
        <AccountIcon />
      </ItemMedia>
    </>
  );
}

function AccountDetailsDrawer({
  account,
  children,
}: {
  account: Account;
  children: ReactNode;
}) {
  const isSavings = account.type === "savings";
  const actions = isSavings ? savingsAccountActions : spendingAccountActions;

  return (
    <AppDrawer
      trigger={
        <Item
          render={<button type="button" />}
          variant="muted"
          className="text-left"
        >
          {children}
        </Item>
      }
      title={account.name}
      description="Chọn thao tác bạn muốn thực hiện"
    >
      <div className="flex flex-col gap-2">
        {actions.map(({ label, icon: ActionIcon, destructive }) => (
          <Button
            key={label}
            type="button"
            variant="ghost"
            size="lg"
            className={
              destructive
                ? "w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/20"
                : "w-full justify-start"
            }
          >
            <ActionIcon data-icon="inline-start" />
            {label}
          </Button>
        ))}
      </div>
    </AppDrawer>
  );
}

export function SpendingAccountItem({ account }: { account: SpendingAccount }) {
  return (
    <AccountDetailsDrawer account={account}>
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
    </AccountDetailsDrawer>
  );
}

export function SavingsAccountItem({ account }: { account: SavingsAccount }) {
  return (
    <AccountDetailsDrawer account={account}>
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
    </AccountDetailsDrawer>
  );
}
