"use client"

import { useState, type SubmitEvent } from "react"

import { Button } from "@/components/ui/button"
import type { ExpenseCategory } from "../_config/expense-categories"
import { getTransactionTypeOption, type TransactionType } from "../_config/transaction-types"
import { ExpenseCategoryCard } from "./expense/expense-category-card"
import { TransactionAmountInput } from "./transaction-amount-input"
import { TransactionDetailsCard } from "./transaction-details-card"
import { TransactionTypeSelect } from "./transaction-type-select"

function getCurrentTime() {
  const now = new Date()

  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`
}

export function TransactionEditor() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense")
  const [amount, setAmount] = useState<number | null>(null)
  const [expenseCategory, setExpenseCategory] =
    useState<ExpenseCategory | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [transactionDate, setTransactionDate] = useState<Date | undefined>(
    () => new Date()
  )
  const [transactionTime, setTransactionTime] = useState(getCurrentTime)
  const [note, setNote] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const selectedType = getTransactionTypeOption(transactionType)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 pt-2 sm:pt-4"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center">
        <TransactionTypeSelect
          value={transactionType}
          onValueChange={setTransactionType}
        />
      </div>

      <TransactionAmountInput
        value={amount}
        accentTextClassName={selectedType.accentTextClassName}
        onValueChange={setAmount}
      />

      {transactionType === "expense" ? (
        <div className="mx-auto w-full max-w-xl">
          <ExpenseCategoryCard
            value={expenseCategory}
            onValueChange={setExpenseCategory}
          />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-xl">
        <TransactionDetailsCard
          showAccount={transactionType !== "transfer"}
          account={account}
          date={transactionDate}
          time={transactionTime}
          note={note}
          attachments={attachments}
          onAccountChange={setAccount}
          onDateChange={setTransactionDate}
          onTimeChange={setTransactionTime}
          onNoteChange={setNote}
          onAttachmentsChange={setAttachments}
        />
      </div>

      <div className="mx-auto grid w-full max-w-xl">
        <Button
          type="submit"
          size="lg"
          className={selectedType.actionClassName}
        >
          Lưu giao dịch
        </Button>
      </div>
    </form>
  )
}
