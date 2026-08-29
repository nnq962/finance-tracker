"use client"

import { AccountIcon } from "@/components/account-icon"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Account } from "@/types/account"

type AccountSelectProps = {
  accounts: readonly Account[]
  value: string | null
  onValueChange: (value: string | null) => void
  id?: string
  placeholder?: string
  disabled?: boolean
  disabledAccountIds?: readonly string[]
  variant?: "default" | "inline"
  popoverAlign?: "start" | "center" | "end"
  popoverClassName?: string
  className?: string
}

export function AccountSelect({
  accounts,
  value,
  onValueChange,
  id,
  placeholder = "Chọn tài khoản",
  disabled = false,
  disabledAccountIds = [],
  variant = "default",
  popoverAlign,
  popoverClassName,
  className,
}: AccountSelectProps) {
  const options = accounts.map((account) => ({
    label: account.name,
    value: account.id,
  }))
  const selectedAccount =
    accounts.find((account) => account.id === value) ?? null

  return (
    <Select
      items={options}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        id={id}
        className={cn(
          "w-full min-w-0",
          variant === "inline" &&
            "h-auto justify-end rounded-none border-0 bg-transparent px-0 text-base shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-[size=default]:h-auto [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right",
          className
        )}
      >
        {selectedAccount ? (
          <AccountIcon account={selectedAccount} className="size-6" />
        ) : null}
        <SelectValue
          placeholder={placeholder}
          className={selectedAccount ? "min-w-0 flex-none" : undefined}
        />
      </SelectTrigger>
      <SelectContent
        align={popoverAlign ?? (variant === "inline" ? "end" : "start")}
        alignItemWithTrigger={false}
        className={cn("min-w-64", popoverClassName)}
      >
        <SelectGroup>
          {accounts.map((account) => (
            <SelectItem
              key={account.id}
              value={account.id}
              disabled={disabledAccountIds.includes(account.id)}
            >
              <AccountIcon account={account} />
              {account.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
