"use client"

import { useState, type SubmitEvent } from "react"
import {
  CarIcon,
  ClapperboardIcon,
  EllipsisIcon,
  HeartPulseIcon,
  ImagePlusIcon,
  ReceiptTextIcon,
  ShoppingBagIcon,
  UtensilsIcon,
} from "lucide-react"

import { DatePicker } from "@/components/date-picker"
import { TimePicker } from "@/components/time-picker"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const expenseCategories = [
  { value: "food", label: "Ăn uống", icon: UtensilsIcon },
  { value: "transport", label: "Di chuyển", icon: CarIcon },
  { value: "shopping", label: "Mua sắm", icon: ShoppingBagIcon },
  { value: "bills", label: "Hóa đơn", icon: ReceiptTextIcon },
  { value: "entertainment", label: "Giải trí", icon: ClapperboardIcon },
  { value: "health", label: "Sức khỏe", icon: HeartPulseIcon },
  { value: "other", label: "Khác", icon: EllipsisIcon },
] as const

const accountOptions = [
  { value: "vietcombank", label: "Vietcombank" },
  { value: "cash", label: "Tiền mặt" },
  { value: "momo", label: "Ví MoMo" },
] as const

const informationRowClassName =
  "grid min-h-15 grid-cols-[minmax(6.5rem,0.8fr)_minmax(0,1.2fr)] items-center gap-4 py-3"

const inlineSelectTriggerClassName =
  "h-auto w-full min-w-0 justify-end rounded-none border-0 bg-transparent px-0 text-base shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-[size=default]:h-auto [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right"

const inlineInputClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent pr-px pl-0 text-right text-base shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-base"

function getCurrentTime() {
  const now = new Date()

  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`
}

type ExpenseTransactionContentProps = {
  actionClassName: string
}

export function ExpenseTransactionContent({
  actionClassName,
}: ExpenseTransactionContentProps) {
  const [category, setCategory] = useState<string | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [transactionDate, setTransactionDate] = useState<Date | undefined>(
    () => new Date()
  )
  const [transactionTime, setTransactionTime] = useState(getCurrentTime)
  const [note, setNote] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const selectedCategory = expenseCategories.find(
    (item) => item.value === category
  )

  const handleCategoryChange = (values: string[]) => {
    if (values[0]) setCategory(values[0])
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form
      className="flex w-full flex-1 flex-col gap-6 p-4 sm:p-6"
      onSubmit={handleSubmit}
    >
      <FieldSet className="gap-3">
        <FieldLegend
          variant="legend"
          className="flex w-full items-center justify-between gap-4"
        >
          <span>Hạng mục</span>
          <span
            className={category ? undefined : "text-muted-foreground"}
          >
            {selectedCategory?.label ?? "Chưa chọn"}
          </span>
        </FieldLegend>

        <ToggleGroup
          value={category ? [category] : []}
          onValueChange={handleCategoryChange}
          variant="outline"
          aria-label="Chọn hạng mục chi tiêu"
          className="flex w-full flex-wrap justify-start"
        >
          {expenseCategories.map((item) => {
            const Icon = item.icon

            return (
              <ToggleGroupItem
                key={item.value}
                value={item.value}
                aria-label={item.label}
              >
                <Icon aria-hidden="true" />
                {item.label}
              </ToggleGroupItem>
            )
          })}
        </ToggleGroup>
      </FieldSet>

      <FieldGroup className="gap-0">
        <Field className={informationRowClassName}>
          <FieldLabel htmlFor="expense-account">Tài khoản</FieldLabel>
          <Select
            items={accountOptions}
            value={account}
            onValueChange={setAccount}
          >
            <SelectTrigger
              id="expense-account"
              className={inlineSelectTriggerClassName}
            >
              <SelectValue placeholder="Chọn tài khoản" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {accountOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Separator />

        <Field className={informationRowClassName}>
          <FieldLabel htmlFor="expense-transaction-date">
            Thời gian
          </FieldLabel>
          <div className="flex min-w-0 items-center justify-end gap-1">
            <DatePicker
              id="expense-transaction-date"
              label={null}
              value={transactionDate}
              onValueChange={setTransactionDate}
              variant="inline"
              popoverAlign="end"
              className="w-auto"
            />
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <TimePicker
              id="expense-transaction-time"
              label={null}
              value={transactionTime}
              onValueChange={setTransactionTime}
              variant="inline"
              className="w-auto"
            />
          </div>
        </Field>

        <Separator />

        <Field className={informationRowClassName}>
          <FieldLabel htmlFor="expense-note">Ghi chú</FieldLabel>
          <Input
            id="expense-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Thêm ghi chú"
            className={inlineInputClassName}
          />
        </Field>

        <Separator />

        <Field className="gap-2 py-4">
          <FieldLabel htmlFor="expense-attachments">
            <ImagePlusIcon className="size-4" aria-hidden="true" />
            Đính kèm ảnh
          </FieldLabel>
          <Label
            htmlFor="expense-attachments"
            className="flex min-h-24 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-3xl border border-dashed border-input bg-muted/30 p-4 text-center transition-colors hover:bg-muted/50"
          >
            <ImagePlusIcon
              className="mb-1 size-5 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-sm font-medium">
              {attachments.length === 0
                ? "Chọn ảnh đính kèm"
                : attachments.length === 1
                  ? attachments[0].name
                  : `${attachments.length} ảnh đã chọn`}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              PNG, JPG hoặc WEBP
            </span>
          </Label>
          <Input
            id="expense-attachments"
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) =>
              setAttachments(Array.from(event.target.files ?? []))
            }
          />
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        className={`mt-auto w-full ${actionClassName}`}
      >
        Lưu giao dịch
      </Button>
    </form>
  )
}
