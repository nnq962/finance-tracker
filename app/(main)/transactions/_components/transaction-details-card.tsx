import {
  Clock3Icon,
  CreditCardIcon,
  PencilLineIcon,
} from "lucide-react"

import { AccountSelect } from "@/components/account-select"
import { DatePicker } from "@/components/date-picker"
import { TimePicker } from "@/components/time-picker"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  combineDateAndTime,
  formatDateTime,
} from "@/lib/formatters/date-time"
import { cn } from "@/lib/utils"
import type { Account } from "@/types/account"

const groupedFieldClassName =
  "grid min-h-15 grid-cols-[minmax(7.5rem,0.9fr)_minmax(0,1.1fr)] items-center gap-4 px-4 py-3"

const informationLabelClassName =
  "flex min-w-0 items-center gap-2 transition-colors group-has-[:focus-visible]/field:text-primary"

const informationIconClassName =
  "flex size-8 shrink-0 items-center justify-center rounded-lg"

const groupedInputClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent pr-px pl-0 text-right text-base shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-base"

const groupedSeparatorClassName =
  "mr-4 ml-14 bg-border/70 data-horizontal:w-auto"

type TransactionDetailsCardProps = {
  accounts: Account[]
  showAccount?: boolean
  accentIconClassName: string
  account: string | null
  date: Date | undefined
  time: string
  note: string
  onAccountChange: (value: string | null) => void
  onDateChange: (value: Date | undefined) => void
  onTimeChange: (value: string) => void
  onNoteChange: (value: string) => void
}

export function TransactionDetailsCard({
  accounts,
  showAccount = true,
  accentIconClassName,
  account,
  date,
  time,
  note,
  onAccountChange,
  onDateChange,
  onTimeChange,
  onNoteChange,
}: TransactionDetailsCardProps) {
  const formattedDateTime = date
    ? formatDateTime(combineDateAndTime(date, time))
    : { label: "Chọn ngày", time: time || "--:--" }

  return (
    <Card className="gap-0 py-0">
      <CardContent className="px-0">
        <FieldGroup className="gap-0">
          {showAccount ? (
            <>
              <Field className={groupedFieldClassName}>
                <FieldLabel
                  htmlFor="transaction-account"
                  className={informationLabelClassName}
                >
                  <span
                    className={cn(
                      informationIconClassName,
                      accentIconClassName
                    )}
                  >
                    <CreditCardIcon className="size-4.5" />
                  </span>
                  <span className="truncate">Tài khoản</span>
                </FieldLabel>
                <AccountSelect
                  id="transaction-account"
                  accounts={accounts}
                  value={account}
                  onValueChange={onAccountChange}
                  variant="inline"
                  popoverAlign="end"
                />
              </Field>

              <Separator className={groupedSeparatorClassName} />
            </>
          ) : null}

          <Field className={groupedFieldClassName}>
            <FieldLabel
              htmlFor="transaction-date"
              className={informationLabelClassName}
            >
              <span
                className={cn(
                  informationIconClassName,
                  accentIconClassName
                )}
              >
                <Clock3Icon className="size-4.5" />
              </span>
              <span className="truncate">Thời gian</span>
            </FieldLabel>
            <div className="flex min-w-0 items-center justify-end whitespace-nowrap">
              <DatePicker
                id="transaction-date"
                label={null}
                value={date}
                onValueChange={onDateChange}
                variant="inline"
                popoverAlign="end"
                className="w-auto"
                displayValue={
                  <span className="text-foreground">
                    {formattedDateTime.label},{"\u00A0"}
                  </span>
                }
              />
              <TimePicker
                id="transaction-time"
                label={null}
                value={time}
                onValueChange={onTimeChange}
                variant="inline"
                className="w-auto"
                displayValue={
                  <span className="text-foreground">
                    {formattedDateTime.time}
                  </span>
                }
              />
            </div>
          </Field>

          <Separator className={groupedSeparatorClassName} />

          <Field className={groupedFieldClassName}>
            <FieldLabel
              htmlFor="transaction-note"
              className={informationLabelClassName}
            >
              <span
                className={cn(
                  informationIconClassName,
                  accentIconClassName
                )}
              >
                <PencilLineIcon className="size-4.5" />
              </span>
              <span className="truncate">Ghi chú</span>
            </FieldLabel>
            <Input
              id="transaction-note"
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="Thêm ghi chú"
              className={groupedInputClassName}
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
