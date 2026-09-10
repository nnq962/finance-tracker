import { XIcon } from "lucide-react"

import { PageSection } from "@/components/page-shell"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  formatCurrency,
  formatCurrencyInput,
  formatCurrencyNumber,
  parseCurrencyInput,
} from "@/lib/currency"

const quickAmounts = [
  10_000,
  20_000,
  50_000,
  100_000,
  200_000,
  500_000,
  1_000_000,
  5_000_000,
]

type TransactionAmountFieldProps = {
  value: string
  onValueChange: (value: string) => void
}

export function TransactionAmountField({
  value,
  onValueChange,
}: TransactionAmountFieldProps) {

  function handleAmountChange(nextValue: string) {
    onValueChange(formatCurrencyInput(nextValue))
  }

  function addQuickAmount(quickAmount: number) {
    onValueChange(
      formatCurrencyNumber(parseCurrencyInput(value) + quickAmount)
    )
  }

  return (
    <PageSection>
      <Field>
        <FieldLabel className="text-base" htmlFor="transaction-amount">
          Số tiền giao dịch
        </FieldLabel>
        <InputGroup className="h-16 rounded-none border-x-0 border-t-0 bg-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupInput
            id="transaction-amount"
            name="amount"
            inputMode="numeric"
            autoComplete="off"
            placeholder="0"
            value={value}
            className="text-right text-4xl font-semibold tabular-nums"
            onChange={(event) => handleAmountChange(event.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText className="text-xl">đ</InputGroupText>
            <InputGroupButton
              size="icon-xs"
              aria-label="Xóa số tiền"
              aria-hidden={!value}
              tabIndex={value ? 0 : -1}
              className={value ? undefined : "invisible"}
              onClick={() => onValueChange("")}
            >
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <div className="flex gap-2 overscroll-x-contain overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {quickAmounts.map((quickAmount) => (
          <Button
            key={quickAmount}
            type="button"
            variant="default"
            size="sm"
            onClick={() => addQuickAmount(quickAmount)}
          >
            +{formatCurrency(quickAmount)}
          </Button>
        ))}
      </div>
    </PageSection>
  )
}
