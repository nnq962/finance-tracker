import { TransactionAccountOptions } from "../../transaction-account-options"

import {
  DebtCounterpartyOptions,
  type DebtSelection,
} from "./debt-counterparty-options"
import { DebtTypeOptions, type DebtType } from "./debt-type-options"

type DebtTransactionFieldsProps = {
  debtType: DebtType
  onDebtSelectionChange: (selection: DebtSelection | null) => void
  onDebtTypeChange: (debtType: DebtType) => void
}

export function DebtTransactionFields({
  debtType,
  onDebtSelectionChange,
  onDebtTypeChange,
}: DebtTransactionFieldsProps) {
  function handleDebtTypeChange(nextDebtType: DebtType) {
    onDebtTypeChange(nextDebtType)
    onDebtSelectionChange(null)
  }

  return (
    <>
      <DebtTypeOptions
        value={debtType}
        onValueChange={handleDebtTypeChange}
      />
      <DebtCounterpartyOptions
        key={debtType}
        mode={debtType}
        onDebtSelectionChange={onDebtSelectionChange}
      />
      <TransactionAccountOptions />
    </>
  )
}
