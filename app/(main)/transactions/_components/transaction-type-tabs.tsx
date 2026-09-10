import {
  ArrowDownLeftIcon,
  ArrowLeftRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  HandshakeIcon,
} from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const transactionTypes = [
  {
    value: "expense",
    label: "Chi tiền",
    description: "Ghi nhận khoản chi",
    icon: ArrowUpRightIcon,
    itemClassName:
      "data-[state=on]:border-rose-500/30 data-[state=on]:bg-rose-500/5 data-[state=on]:text-rose-700 dark:data-[state=on]:text-rose-300",
    iconClassName:
      "bg-rose-500/10 text-rose-600 group-aria-pressed/toggle:bg-rose-500 group-aria-pressed/toggle:text-white dark:text-rose-400",
  },
  {
    value: "income",
    label: "Thu tiền",
    description: "Ghi nhận khoản thu",
    icon: ArrowDownLeftIcon,
    itemClassName:
      "data-[state=on]:border-emerald-500/30 data-[state=on]:bg-emerald-500/5 data-[state=on]:text-emerald-700 dark:data-[state=on]:text-emerald-300",
    iconClassName:
      "bg-emerald-500/10 text-emerald-600 group-aria-pressed/toggle:bg-emerald-500 group-aria-pressed/toggle:text-white dark:text-emerald-400",
  },
  {
    value: "transfer",
    label: "Chuyển tiền",
    description: "Giữa các tài khoản",
    icon: ArrowLeftRightIcon,
    itemClassName:
      "data-[state=on]:border-blue-500/30 data-[state=on]:bg-blue-500/5 data-[state=on]:text-blue-700 dark:data-[state=on]:text-blue-300",
    iconClassName:
      "bg-blue-500/10 text-blue-600 group-aria-pressed/toggle:bg-blue-500 group-aria-pressed/toggle:text-white dark:text-blue-400",
  },
  {
    value: "debt",
    label: "Vay nợ",
    description: "Vay, cho vay và trả nợ",
    icon: HandshakeIcon,
    itemClassName:
      "data-[state=on]:border-amber-500/30 data-[state=on]:bg-amber-500/5 data-[state=on]:text-amber-700 dark:data-[state=on]:text-amber-300",
    iconClassName:
      "bg-amber-500/10 text-amber-600 group-aria-pressed/toggle:bg-amber-500 group-aria-pressed/toggle:text-white dark:text-amber-400",
  },
] as const

export type TransactionType = (typeof transactionTypes)[number]["value"]

type TransactionTypeTabsProps = {
  value: TransactionType
  onValueChange: (value: TransactionType) => void
}

export function TransactionTypeTabs({
  value,
  onValueChange,
}: TransactionTypeTabsProps) {
  return (
    <ToggleGroup
      value={[value]}
      spacing={0}
      aria-label="Loại giao dịch"
      className="grid w-full grid-cols-2 gap-2"
      onValueChange={(nextValues) => {
        const nextValue = nextValues[0] as TransactionType | undefined

        if (nextValue) onValueChange(nextValue)
      }}
    >
      {transactionTypes.map((type) => {
        const Icon = type.icon

        return (
          <ToggleGroupItem
            key={type.value}
            value={type.value}
            aria-label={type.label}
            className={cn(
              "h-[76px] w-full min-w-0 justify-start gap-3 rounded-2xl border bg-card px-3 py-2 text-left text-foreground shadow-xs transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:bg-muted/50 active:scale-[0.98] data-[state=on]:shadow-sm",
              type.itemClassName
            )}
          >
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                type.iconClassName
              )}
            >
              <Icon className="size-[18px]" aria-hidden="true" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">
                {type.label}
              </span>
              <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">
                {type.description}
              </span>
            </span>

            <CheckIcon
              className="size-4 shrink-0 opacity-0 transition-opacity group-aria-pressed/toggle:opacity-100"
              aria-hidden="true"
            />
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}
