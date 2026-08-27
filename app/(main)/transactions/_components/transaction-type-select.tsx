import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

import {
  getTransactionTypeOption,
  transactionTypes,
  type TransactionType,
} from "../_config/transaction-types"

type TransactionTypeSelectProps = {
  value: TransactionType
  onValueChange: (value: TransactionType) => void
}

export function TransactionTypeSelect({
  value,
  onValueChange,
}: TransactionTypeSelectProps) {
  const selectedType = getTransactionTypeOption(value)
  const SelectedIcon = selectedType.icon

  return (
    <Select
      items={transactionTypes}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue) onValueChange(nextValue)
      }}
    >
      <SelectTrigger
        aria-label="Chọn loại giao dịch"
        className={selectedType.triggerClassName}
      >
        <SelectedIcon className="size-4" aria-hidden="true" />
        <span>{selectedType.label}</span>
      </SelectTrigger>

      <SelectContent
        align="center"
        alignItemWithTrigger={false}
        className="min-w-52"
      >
        <SelectGroup>
          {transactionTypes.map((transactionType) => {
            const Icon = transactionType.icon

            return (
              <SelectItem
                key={transactionType.value}
                value={transactionType.value}
                className={
                  transactionType.value === value
                    ? transactionType.selectedItemClassName
                    : undefined
                }
              >
                <Icon aria-hidden="true" />
                {transactionType.label}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
