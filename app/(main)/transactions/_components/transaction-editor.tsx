"use client"

import { XIcon } from "lucide-react"
import { useState, type SubmitEvent } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Account } from "@/types/account"
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

type TransactionEditorProps = {
  accounts: Account[]
}

export function TransactionEditor({ accounts }: TransactionEditorProps) {
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
  const selectedType = getTransactionTypeOption(transactionType)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 pt-4"
      onSubmit={handleSubmit}
    >
      <div className="mx-auto w-full max-w-xl">
        <Card>
          <CardContent className="relative flex flex-col gap-4">
            {amount !== null ? (
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                aria-label="Xóa số tiền"
                className="absolute top-0 right-4"
                onClick={() => setAmount(null)}
              >
                <XIcon aria-hidden="true" />
              </Button>
            ) : null}

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
          </CardContent>
        </Card>
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
            accounts={accounts}
            fromAccount={transferFromAccount}
            toAccount={transferToAccount}
            onFromAccountChange={setTransferFromAccount}
            onToAccountChange={setTransferToAccount}
          />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-xl">
        <TransactionDetailsCard
          accounts={accounts}
          showAccount={transactionType !== "transfer"}
          accentIconClassName={selectedType.accentIconClassName}
          account={account}
          date={transactionDate}
          time={transactionTime}
          note={note}
          onAccountChange={setAccount}
          onDateChange={setTransactionDate}
          onTimeChange={setTransactionTime}
          onNoteChange={setNote}
        />
      </div>

      <div className="mx-auto grid w-full max-w-xl">
        <Button
          type="submit"
          size="xl"
          className={selectedType.actionClassName}
        >
          Lưu giao dịch
        </Button>
      </div>
    </form>
  )
}
