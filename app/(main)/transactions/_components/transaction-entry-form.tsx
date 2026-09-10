"use client"

import { useState } from "react"
import { SaveIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { TransactionAmountField } from "./transaction-amount-field"
import { TransactionDetailsOptions } from "./transaction-details-options"
import type { DebtSelection } from "./transaction-types/debt/debt-counterparty-options"
import { DebtDetailsFields } from "./transaction-types/debt/debt-details-fields"
import { DebtTransactionFields } from "./transaction-types/debt/debt-transaction-fields"
import type { DebtType } from "./transaction-types/debt/debt-type-options"
import { ExpenseTransactionFields } from "./transaction-types/expense/expense-transaction-fields"
import { IncomeTransactionFields } from "./transaction-types/income/income-transaction-fields"
import { TransferTransactionFields } from "./transaction-types/transfer/transfer-transaction-fields"
import {
  TransactionTypeTabs,
  type TransactionType,
} from "./transaction-type-tabs"
import { parseCurrencyInput } from "@/lib/currency"

export function TransactionEntryForm() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense")
  const [amount, setAmount] = useState("")
  const [debtType, setDebtType] = useState<DebtType>("lend")
  const [selectedDebt, setSelectedDebt] = useState<DebtSelection | null>(null)

  function handleTransactionTypeChange(nextType: TransactionType) {
    setTransactionType(nextType)

    if (nextType !== "debt") setSelectedDebt(null)
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="sticky top-[env(safe-area-inset-top)] z-20 -mx-4 bg-background px-4 py-1 md:top-0 md:mx-0 md:px-0">
        <TransactionTypeTabs
          value={transactionType}
          onValueChange={handleTransactionTypeChange}
        />
      </div>
      <TransactionAmountField value={amount} onValueChange={setAmount} />
      {transactionType === "expense" && <ExpenseTransactionFields />}
      {transactionType === "income" && <IncomeTransactionFields />}
      {transactionType === "transfer" && <TransferTransactionFields />}
      {transactionType === "debt" && (
        <DebtTransactionFields
          debtType={debtType}
          onDebtTypeChange={setDebtType}
          onDebtSelectionChange={setSelectedDebt}
        />
      )}
      <TransactionDetailsOptions hideDateTime={transactionType === "debt"}>
        {transactionType === "debt" && (
          <DebtDetailsFields
            key={debtType}
            amount={parseCurrencyInput(amount)}
            debtType={debtType}
            selectedDebt={selectedDebt}
          />
        )}
      </TransactionDetailsOptions>
      <div className="flex justify-end">
        <Button type="button" size="xl" className="w-full sm:w-auto">
          <SaveIcon data-icon="inline-start" />
          Lưu giao dịch
        </Button>
      </div>
    </div>
  )
}
