"use client"

import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import {
  transactionTypes,
  type TransactionType,
} from "../_config/transaction-types"
import { ExpenseTransactionContent } from "./expense-transaction-content"
import { TransactionAmountInput } from "./transaction-amount-input"
import { TransactionContentPanel } from "./transaction-content-panel"

export function TransactionTypePanel() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense")
  const [amount, setAmount] = useState<number | null>(null)
  const selectedType =
    transactionTypes.find((item) => item.value === transactionType) ??
    transactionTypes[0]
  const SelectedIcon = selectedType.icon

  const handleValueChange = (value: TransactionType | null) => {
    if (value) setTransactionType(value)
  }

  return (
    <section
      className={cn(
        "relative -mx-4 -mb-4 flex flex-1 flex-col items-center overflow-hidden px-1 pt-6 transition-colors duration-300 md:-mx-6 md:-mb-6 md:pt-8 lg:-mx-20 xl:-mx-36 2xl:-mx-56",
        selectedType.panelClassName
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-12 top-0 h-40 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative flex w-full max-w-3xl flex-col gap-2 px-3">
        <div className="flex justify-center">
          <Select
            items={transactionTypes}
            value={transactionType}
            onValueChange={handleValueChange}
          >
            <SelectTrigger
              aria-label="Chọn loại giao dịch"
              className="bg-background/80 hover:bg-background/90 aria-expanded:bg-background/90"
            >
              <SelectedIcon aria-hidden="true" />
              <span>{selectedType.label}</span>
            </SelectTrigger>

            <SelectContent
              align="center"
              alignItemWithTrigger={false}
              className="min-w-52"
            >
              <SelectGroup>
                {transactionTypes.map((item) => {
                  const Icon = item.icon

                  return (
                    <SelectItem key={item.value} value={item.value}>
                      <Icon aria-hidden="true" />
                      {item.label}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <TransactionAmountInput value={amount} onValueChange={setAmount} />
      </div>

      <TransactionContentPanel>
        {transactionType === "expense" ? (
          <ExpenseTransactionContent
            actionClassName={selectedType.actionClassName}
          />
        ) : null}
      </TransactionContentPanel>
    </section>
  )
}
