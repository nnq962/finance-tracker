import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

const quickAmounts = [10_000, 50_000, 100_000, 500_000]

type TransactionAmountInputProps = {
  value: number | null
  onValueChange: (value: number | null) => void
}

function formatQuickAmount(amount: number) {
  return `+${amount / 1_000}k`
}

export function TransactionAmountInput({
  value,
  onValueChange,
}: TransactionAmountInputProps) {
  const handleInputChange = (inputValue: string) => {
    const digits = inputValue.replace(/\D/g, "")

    onValueChange(digits ? Number(digits) : null)
  }

  const handleQuickAmount = (amount: number) => {
    onValueChange((value ?? 0) + amount)
  }

  return (
    <Field className="gap-4">
      <InputGroup className="h-auto border-0 bg-transparent shadow-none has-[>[data-align=inline-end]]:[&>input]:pr-10 has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupInput
          id="transaction-amount"
          aria-label="Số tiền"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={value ? value.toLocaleString("vi-VN") : ""}
          onChange={(event) => handleInputChange(event.target.value)}
          className="h-auto px-10 text-center text-5xl font-semibold tracking-tight tabular-nums md:text-6xl"
        />
        <InputGroupAddon
          align="inline-end"
          className="absolute right-0 pr-0 pl-0"
        >
          <InputGroupText className="text-2xl font-medium">₫</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <div className="grid grid-cols-4 gap-2">
        {quickAmounts.map((amount) => (
          <Button
            key={amount}
            type="button"
            onClick={() => handleQuickAmount(amount)}
          >
            {formatQuickAmount(amount)}
          </Button>
        ))}
      </div>
    </Field>
  )
}
