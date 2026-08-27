import {
  Clock3Icon,
  CreditCardIcon,
  ImageIcon,
  ImagePlusIcon,
  PencilLineIcon,
} from "lucide-react"

import { DatePicker } from "@/components/date-picker"
import { TimePicker } from "@/components/time-picker"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
import {
  combineDateAndTime,
  formatDateTime,
} from "@/lib/formatters/date-time"

const accountOptions = [
  { value: "vietcombank", label: "Vietcombank" },
  { value: "cash", label: "Tiền mặt" },
  { value: "momo", label: "Ví MoMo" },
] as const

const groupedFieldClassName =
  "grid min-h-15 grid-cols-[minmax(7.5rem,0.9fr)_minmax(0,1.1fr)] items-center gap-4 px-4 py-3"

const informationLabelClassName =
  "flex min-w-0 items-center gap-2 transition-colors group-has-[:focus-visible]/field:text-primary"

const informationIconClassName =
  "flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"

const groupedSelectTriggerClassName =
  "h-auto w-full min-w-0 justify-end rounded-none border-0 bg-transparent px-0 text-base shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-[size=default]:h-auto [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right [&_svg]:hidden"

const groupedInputClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent pr-px pl-0 text-right text-base shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-base"

const groupedSeparatorClassName =
  "mr-4 ml-13 bg-border/70 data-horizontal:w-auto"

type TransactionDetailsCardProps = {
  showAccount?: boolean
  account: string | null
  date: Date | undefined
  time: string
  note: string
  attachments: File[]
  onAccountChange: (value: string | null) => void
  onDateChange: (value: Date | undefined) => void
  onTimeChange: (value: string) => void
  onNoteChange: (value: string) => void
  onAttachmentsChange: (value: File[]) => void
}

export function TransactionDetailsCard({
  showAccount = true,
  account,
  date,
  time,
  note,
  attachments,
  onAccountChange,
  onDateChange,
  onTimeChange,
  onNoteChange,
  onAttachmentsChange,
}: TransactionDetailsCardProps) {
  const attachmentLabel =
    attachments.length === 1
      ? attachments[0].name
      : `${attachments.length} ảnh đã chọn`
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
                  <span className={informationIconClassName}>
                    <CreditCardIcon className="size-4.5" />
                  </span>
                  <span className="truncate">Tài khoản</span>
                </FieldLabel>
                <Select
                  items={accountOptions}
                  value={account}
                  onValueChange={onAccountChange}
                >
                  <SelectTrigger
                    id="transaction-account"
                    className={groupedSelectTriggerClassName}
                  >
                    <SelectValue placeholder="Chọn tài khoản" />
                  </SelectTrigger>
                  <SelectContent align="end" alignItemWithTrigger={false}>
                    <SelectGroup>
                      {accountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Separator className={groupedSeparatorClassName} />
            </>
          ) : null}

          <Field className={groupedFieldClassName}>
            <FieldLabel
              htmlFor="transaction-date"
              className={informationLabelClassName}
            >
              <span className={informationIconClassName}>
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
              <span className={informationIconClassName}>
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

          <Separator className={groupedSeparatorClassName} />

          <Label
            htmlFor="transaction-attachments"
            className={`${groupedFieldClassName} cursor-pointer`}
          >
            <span className={informationLabelClassName}>
              <span className={informationIconClassName}>
                <ImageIcon className="size-4.5" />
              </span>
              <span className="shrink-0 whitespace-nowrap">Đính kèm ảnh</span>
            </span>
            <span
              className={`truncate text-right text-base font-normal ${
                attachments.length === 0
                  ? "text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {attachments.length === 0 ? (
                <span className="ml-auto flex size-7 items-center justify-center rounded-md bg-muted">
                  <ImagePlusIcon className="size-4" aria-hidden="true" />
                </span>
              ) : (
                attachmentLabel
              )}
            </span>
          </Label>
          <Input
            id="transaction-attachments"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={(event) =>
              onAttachmentsChange(Array.from(event.target.files ?? []))
            }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
