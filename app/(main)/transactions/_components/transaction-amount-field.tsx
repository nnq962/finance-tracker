import { PlusIcon, XIcon } from "lucide-react"

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
      <Field className="gap-2">
        <FieldLabel
          className="text-sm font-medium tracking-wide text-muted-foreground uppercase"
          htmlFor="transaction-amount"
        >
          Số tiền giao dịch
        </FieldLabel>
        <InputGroup className="h-20 rounded-3xl border-border/70 bg-card px-2 shadow-none has-[>[data-align=inline-end]]:[&>input]:pr-0">
          <InputGroupInput
            id="transaction-amount"
            name="amount"
            inputMode="numeric"
            autoComplete="off"
            placeholder="0"
            value={value}
            className="px-2 text-right text-4xl font-semibold tracking-tight tabular-nums placeholder:text-muted-foreground/60"
            onChange={(event) => handleAmountChange(event.target.value)}
          />
          <InputGroupAddon align="inline-end" className="gap-2 pr-2">
            <InputGroupText className="text-4xl leading-none font-semibold tracking-tight text-foreground">
              đ
            </InputGroupText>
            <InputGroupButton
              size="icon-xs"
              variant="secondary"
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

      <div className="flex min-w-0 snap-x snap-mandatory gap-2 overscroll-x-contain overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {quickAmounts.map((quickAmount) => (
          <Button
            key={quickAmount}
            type="button"
            size="sm"
            onClick={() => addQuickAmount(quickAmount)}
          >
            <PlusIcon data-icon="inline-start" />
            {formatCurrency(quickAmount)}
          </Button>
        ))}
      </div>
    </PageSection>
  )
}
