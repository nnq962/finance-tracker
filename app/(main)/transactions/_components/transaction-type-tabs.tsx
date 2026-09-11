"use client"

import {
  ArrowDownLeftIcon,
  ArrowLeftRightIcon,
  ArrowUpRightIcon,
  HandshakeIcon,
} from "lucide-react"

import { SlidingIndicator } from "@/components/sliding-indicator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSlidingIndicator } from "@/hooks/use-sliding-indicator"

const transactionTypes = [
  {
    value: "expense",
    label: "Chi tiền",
    shortLabel: "Chi",
    icon: ArrowUpRightIcon,
  },
  {
    value: "income",
    label: "Thu tiền",
    shortLabel: "Thu",
    icon: ArrowDownLeftIcon,
  },
  {
    value: "transfer",
    label: "Chuyển tiền",
    shortLabel: "Chuyển",
    icon: ArrowLeftRightIcon,
  },
  {
    value: "debt",
    label: "Vay nợ",
    shortLabel: "Vay nợ",
    icon: HandshakeIcon,
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
  const activeIndex = transactionTypes.findIndex((type) => type.value === value)
  const { indicatorRef, itemRefs, moveTo } =
    useSlidingIndicator<HTMLButtonElement>({ activeIndex })

  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) =>
        onValueChange(nextValue as TransactionType)
      }
      className="w-full"
    >
      <TabsList
        aria-label="Loại giao dịch"
        className="relative isolate grid h-12! w-full grid-cols-4 border border-border/70 bg-card p-1 shadow-none dark:border-foreground/10"
      >
        <SlidingIndicator
          ref={indicatorRef}
          className="inset-y-1 rounded-xl bg-primary shadow-xs"
        />

        {transactionTypes.map((type, index) => {
          const Icon = type.icon

          return (
            <TabsTrigger
              key={type.value}
              ref={(element) => {
                itemRefs.current[index] = element
              }}
              value={type.value}
              aria-label={type.label}
              className="z-10 min-w-0 gap-1 rounded-xl px-1 text-xs text-muted-foreground data-active:bg-transparent! data-active:text-primary-foreground! data-active:shadow-none"
              onClick={() => moveTo(index)}
            >
              <Icon aria-hidden="true" className="size-4" />
              <span className="truncate">{type.shortLabel}</span>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
