import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

const quickAmounts = [10_000, 50_000, 100_000, 500_000]

type TransactionAmountInputProps = {
  value: number | null
  accentTextClassName: string
  onValueChange: (value: number | null) => void
}

function formatQuickAmount(amount: number) {
  return `+${amount / 1_000}k`
}

export function TransactionAmountInput({
  value,
  accentTextClassName,
  onValueChange,
}: TransactionAmountInputProps) {
  const formattedValue = value === null ? "" : value.toLocaleString("vi-VN")

  const handleInputChange = (inputValue: string) => {
    const digits = inputValue.replace(/\D/g, "")

    onValueChange(digits ? Number(digits) : null)
  }

  return (
    <Field className="mx-auto w-full max-w-xl gap-3">
      <InputGroup className="mx-auto h-auto w-full max-w-xl border-0 bg-transparent shadow-none has-[>[data-align=inline-end]]:[&>input]:pr-0 has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupInput
          id="transaction-amount"
          aria-label="Số tiền giao dịch"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={formattedValue}
          onChange={(event) => handleInputChange(event.target.value)}
          className="h-auto min-w-0 p-0 text-right text-5xl font-bold tracking-tight tabular-nums sm:text-6xl md:text-7xl"
        />
        <InputGroupAddon
          align="inline-end"
          className="pr-0 pl-2"
        >
          <InputGroupText
            className={cn("text-xl font-semibold sm:text-2xl", accentTextClassName)}
          >
            ₫
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {quickAmounts.map((amount) => (
          <Button
            key={amount}
            type="button"
            variant="default"
            className="border-border bg-white text-black hover:bg-neutral-100 dark:bg-card dark:text-card-foreground dark:hover:bg-accent"
            onClick={() => onValueChange((value ?? 0) + amount)}
          >
            {formatQuickAmount(amount)}
          </Button>
        ))}
      </div>
    </Field>
  )
}
