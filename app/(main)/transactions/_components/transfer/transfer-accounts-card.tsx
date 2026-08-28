import {
  ArrowDownLeftIcon,
  ArrowUpDownIcon,
  ArrowUpRightIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { transactionAccounts } from "../../_config/transaction-accounts"

const accountRowClassName =
  "grid min-h-18 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 px-4 py-3"

const accountTriggerClassName =
  "h-auto w-full min-w-0 justify-end rounded-none border-0 bg-transparent px-0 text-sm shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-[size=default]:h-auto sm:text-base [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right"

type TransferAccountRowProps = {
  id: string
  label: string
  direction: "from" | "to"
  value: string | null
  disabledValue: string | null
  onValueChange: (value: string | null) => void
}

function TransferAccountRow({
  id,
  label,
  direction,
  value,
  disabledValue,
  onValueChange,
}: TransferAccountRowProps) {
  const DirectionIcon =
    direction === "from" ? ArrowUpRightIcon : ArrowDownLeftIcon

  return (
    <div className={accountRowClassName}>
      <Label htmlFor={id} className="flex min-w-0 items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/[0.07] text-blue-600 dark:text-blue-400">
          <DirectionIcon className="size-4.5" aria-hidden="true" />
        </span>
        <span className="truncate text-sm font-medium sm:text-base">
          {label}
        </span>
      </Label>

      <Select
        items={transactionAccounts}
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger id={id} className={accountTriggerClassName}>
          <SelectValue placeholder="Chọn tài khoản" />
        </SelectTrigger>
        <SelectContent align="end" alignItemWithTrigger={false}>
          <SelectGroup>
            {transactionAccounts.map((account) => (
              <SelectItem
                key={account.value}
                value={account.value}
                disabled={account.value === disabledValue}
              >
                {account.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

type TransferAccountsCardProps = {
  fromAccount: string | null
  toAccount: string | null
  onFromAccountChange: (value: string | null) => void
  onToAccountChange: (value: string | null) => void
}

export function TransferAccountsCard({
  fromAccount,
  toAccount,
  onFromAccountChange,
  onToAccountChange,
}: TransferAccountsCardProps) {
  const handleSwapAccounts = () => {
    onFromAccountChange(toAccount)
    onToAccountChange(fromAccount)
  }

  return (
    <Card className="gap-0 py-0">
      <CardContent className="px-0">
        <TransferAccountRow
          id="transfer-from-account"
          label="Từ tài khoản"
          direction="from"
          value={fromAccount}
          disabledValue={toAccount}
          onValueChange={onFromAccountChange}
        />

        <div className="relative h-px">
          <Separator className="mr-4 ml-14 data-horizontal:w-auto" />
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Đổi chiều chuyển khoản"
            disabled={!fromAccount && !toAccount}
            onClick={handleSwapAccounts}
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card text-blue-600 shadow-sm hover:bg-blue-500/[0.07] hover:text-blue-600 dark:bg-card dark:text-blue-400 dark:hover:bg-blue-400/[0.07] dark:hover:text-blue-400"
          >
            <ArrowUpDownIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <TransferAccountRow
          id="transfer-to-account"
          label="Đến tài khoản"
          direction="to"
          value={toAccount}
          disabledValue={fromAccount}
          onValueChange={onToAccountChange}
        />
      </CardContent>
    </Card>
  )
}
