import {
  ArrowDownLeftIcon,
  ArrowUpDownIcon,
  ArrowUpRightIcon,
} from "lucide-react"

import { AccountSelect } from "@/components/account-select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { Account } from "@/types/account"

const accountRowClassName =
  "grid min-h-18 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 px-4 py-3"

type TransferAccountRowProps = {
  accounts: Account[]
  id: string
  label: string
  direction: "from" | "to"
  value: string | null
  disabledValue: string | null
  onValueChange: (value: string | null) => void
}

function TransferAccountRow({
  accounts,
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
        <span className="truncate text-base font-medium">
          {label}
        </span>
      </Label>

      <AccountSelect
        id={id}
        accounts={accounts}
        value={value}
        onValueChange={onValueChange}
        disabledAccountIds={disabledValue ? [disabledValue] : []}
        variant="inline"
        popoverAlign="end"
      />
    </div>
  )
}

type TransferAccountsCardProps = {
  accounts: Account[]
  fromAccount: string | null
  toAccount: string | null
  onFromAccountChange: (value: string | null) => void
  onToAccountChange: (value: string | null) => void
}

export function TransferAccountsCard({
  accounts,
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
          accounts={accounts}
          id="transfer-from-account"
          label="Từ tài khoản"
          direction="from"
          value={fromAccount}
          disabledValue={toAccount}
          onValueChange={onFromAccountChange}
        />

        <div className="relative h-px">
          <Separator className="mr-4 ml-14 data-horizontal:w-auto" />
          <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              aria-label="Đổi chiều chuyển khoản"
              disabled={!fromAccount && !toAccount}
              onClick={handleSwapAccounts}
              className="rounded-full bg-card text-blue-600 shadow-sm hover:bg-blue-500/[0.07] hover:text-blue-600 dark:bg-card dark:text-blue-400 dark:hover:bg-blue-400/[0.07] dark:hover:text-blue-400"
            >
              <ArrowUpDownIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <TransferAccountRow
          accounts={accounts}
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
