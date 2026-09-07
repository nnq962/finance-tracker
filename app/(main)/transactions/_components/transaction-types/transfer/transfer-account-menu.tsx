import type { ReactNode } from "react"
import { cn } from "cn"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  transferAccounts,
  type TransferAccountId,
} from "./transfer-accounts"

const selectItems = transferAccounts.map((account) => ({
  label: account.name,
  value: account.value,
}))

type TransferAccountMenuProps = {
  label: string
  value: TransferAccountId
  excludedValue: TransferAccountId
  onValueChange: (value: TransferAccountId) => void
  children: ReactNode
  triggerClassName?: string
}

export function TransferAccountMenu({
  label,
  value,
  excludedValue,
  onValueChange,
  children,
  triggerClassName,
}: TransferAccountMenuProps) {
  return (
    <Select
      items={selectItems}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue) onValueChange(nextValue as TransferAccountId)
      }}
    >
      <SelectTrigger
        size="sm"
        className={cn(
          "h-auto w-full min-w-0 bg-transparent p-0 data-[size=sm]:h-auto",
          triggerClassName
        )}
        aria-label={label}
      >
        {children}
        <SelectValue className="sr-only" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {transferAccounts.map((account) => {
            const Icon = account.icon

            return (
              <SelectItem
                key={account.value}
                value={account.value}
                disabled={account.value === excludedValue}
              >
                <Icon />
                {account.name}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
