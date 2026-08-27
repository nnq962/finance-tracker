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

const accountOptions = [
  { value: "vietcombank", label: "Vietcombank" },
  { value: "cash", label: "Tiền mặt" },
  { value: "momo", label: "Ví MoMo" },
] as const

const informationRowClassName =
  "grid min-h-12 grid-cols-[minmax(0,1fr)_minmax(8rem,1fr)] items-center gap-3 px-3 py-2"

const informationLabelClassName =
  "flex min-w-0 items-center gap-2 text-sm font-normal"

const informationIconClassName =
  "flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"

const inlineSelectTriggerClassName =
  "h-auto w-full min-w-0 justify-end rounded-none border-0 bg-transparent px-0 py-0 text-base font-normal shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-placeholder:font-normal data-[size=default]:h-auto md:text-sm [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right [&>svg]:hidden"

const inlineInputClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent pr-px pl-0 text-right text-base font-normal shadow-none placeholder:font-normal focus-visible:border-transparent focus-visible:ring-0 md:text-sm"

const groupedSeparatorClassName =
  "mr-3 ml-[3.25rem] bg-border/60 data-horizontal:w-auto"

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

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardContent className="px-0">
        <FieldGroup className="gap-0">
          {showAccount ? (
            <>
              <Field
                className={`${informationRowClassName} transition-colors hover:bg-muted/30`}
              >
                <FieldLabel
                  htmlFor="transaction-account"
                  className={informationLabelClassName}
                >
                  <span className={informationIconClassName}>
                    <CreditCardIcon className="size-4" />
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
                    className={inlineSelectTriggerClassName}
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

          <Field
            className={`${informationRowClassName} max-[340px]:grid-cols-1 max-[340px]:gap-y-1`}
          >
            <FieldLabel
              htmlFor="transaction-date"
              className={informationLabelClassName}
            >
              <span className={informationIconClassName}>
                <Clock3Icon className="size-4" />
              </span>
              <span className="truncate">Thời gian</span>
            </FieldLabel>
            <div className="flex min-w-0 items-center justify-end gap-1 max-[340px]:pl-10 [&_button]:text-base [&_button]:font-normal md:[&_button]:text-sm">
              <DatePicker
                id="transaction-date"
                label={null}
                value={date}
                onValueChange={onDateChange}
                variant="inline"
                popoverAlign="end"
                className="w-auto"
              />
              <span aria-hidden="true" className="text-muted-foreground">
                ·
              </span>
              <TimePicker
                id="transaction-time"
                label={null}
                value={time}
                onValueChange={onTimeChange}
                variant="inline"
                className="w-auto"
              />
            </div>
          </Field>

          <Separator className={groupedSeparatorClassName} />

          <Field className={informationRowClassName}>
            <FieldLabel
              htmlFor="transaction-note"
              className={informationLabelClassName}
            >
              <span className={informationIconClassName}>
                <PencilLineIcon className="size-4" />
              </span>
              <span className="truncate">Ghi chú</span>
            </FieldLabel>
            <Input
              id="transaction-note"
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="Thêm ghi chú..."
              className={inlineInputClassName}
            />
          </Field>

          <Separator className={groupedSeparatorClassName} />

          <Label
            htmlFor="transaction-attachments"
            className={`${informationRowClassName} cursor-pointer transition-colors hover:bg-muted/30`}
          >
            <span className={informationLabelClassName}>
              <span className={informationIconClassName}>
                <ImageIcon className="size-4" />
              </span>
              <span className="truncate">Đính kèm ảnh</span>
            </span>
            <span
              className={`truncate text-right text-base font-normal md:text-sm ${
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
