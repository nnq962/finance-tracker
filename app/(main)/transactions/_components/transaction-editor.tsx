"use client"

import { useState, type SubmitEvent } from "react"

import { Button } from "@/components/ui/button"
import type { ExpenseCategory } from "../_config/expense-categories"
import type { IncomeCategory } from "../_config/income-categories"
import type { LoanContact } from "../_config/loan-contacts"
import { getTransactionTypeOption, type TransactionType } from "../_config/transaction-types"
import { ExpenseCategoryCard } from "./expense/expense-category-card"
import { IncomeCategoryCard } from "./income/income-category-card"
import { LoanContactCard } from "./lend/loan-contact-card"
import { TransactionAmountInput } from "./transaction-amount-input"
import { TransactionDetailsCard } from "./transaction-details-card"
import { TransactionTypeSelect } from "./transaction-type-select"
import { TransferAccountsCard } from "./transfer/transfer-accounts-card"

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
  const [incomeCategory, setIncomeCategory] =
    useState<IncomeCategory | null>(null)
  const [loanContact, setLoanContact] = useState<LoanContact | null>(null)
  const [borrowContact, setBorrowContact] = useState<LoanContact | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [transferFromAccount, setTransferFromAccount] =
    useState<string | null>(null)
  const [transferToAccount, setTransferToAccount] =
    useState<string | null>(null)
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
      <div className="flex flex-col gap-4">
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
      </div>

      {transactionType === "expense" ? (
        <div className="mx-auto w-full max-w-xl">
          <ExpenseCategoryCard
            value={expenseCategory}
            onValueChange={setExpenseCategory}
          />
        </div>
      ) : null}

      {transactionType === "income" ? (
        <div className="mx-auto w-full max-w-xl">
          <IncomeCategoryCard
            value={incomeCategory}
            onValueChange={setIncomeCategory}
          />
        </div>
      ) : null}

      {transactionType === "lend" ? (
        <div className="mx-auto w-full max-w-xl">
          <LoanContactCard
            value={loanContact}
            onValueChange={setLoanContact}
          />
        </div>
      ) : null}

      {transactionType === "borrow" ? (
        <div className="mx-auto w-full max-w-xl">
          <LoanContactCard
            value={borrowContact}
            onValueChange={setBorrowContact}
            ariaLabel="Chọn người cho vay"
            tone="borrow"
          />
        </div>
      ) : null}

      {transactionType === "transfer" ? (
        <div className="mx-auto w-full max-w-xl">
          <TransferAccountsCard
            fromAccount={transferFromAccount}
            toAccount={transferToAccount}
            onFromAccountChange={setTransferFromAccount}
            onToAccountChange={setTransferToAccount}
          />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-xl">
        <TransactionDetailsCard
          showAccount={transactionType !== "transfer"}
          accentIconClassName={selectedType.accentIconClassName}
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
