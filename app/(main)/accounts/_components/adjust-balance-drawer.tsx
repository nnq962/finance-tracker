"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { DatePicker } from "@/components/date-picker"
import { TimePicker } from "@/components/time-picker"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/formatters/currency"
import type { Account } from "@/types/account"
import {
  CircleCheckIcon,
  CircleDashedIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react"

const adjustmentCategories = [
  { value: "an-uong", label: "Ăn uống" },
  { value: "di-chuyen", label: "Di chuyển" },
  { value: "mua-sam", label: "Mua sắm" },
] as const

const groupedFieldClassName =
  "grid min-h-15 grid-cols-[minmax(6.75rem,0.8fr)_minmax(0,1.2fr)] items-center gap-4 px-4 py-3"

const groupedLabelClassName =
  "transition-colors group-has-[:focus-visible]/field:text-primary"

const groupedInputGroupClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0"

const groupedSelectTriggerClassName =
  "h-auto w-full min-w-0 justify-end rounded-none border-0 bg-transparent px-0 text-base shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-[size=default]:h-auto [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right [&_svg]:hidden"

const groupedSeparatorClassName = "mx-4 bg-border/70 data-horizontal:w-auto"

function getCurrentTime() {
  const now = new Date()

  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`
}

type AdjustBalanceDrawerProps = {
  account: Account | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdjustBalanceDrawer({
  account,
  open,
  onOpenChange,
}: AdjustBalanceDrawerProps) {
  const [actualBalance, setActualBalance] = useState("")
  const [adjustmentDate, setAdjustmentDate] = useState<Date | undefined>(
    () => new Date()
  )
  const [adjustmentTime, setAdjustmentTime] = useState(getCurrentTime)
  const [category, setCategory] = useState<string | null>(null)
  const [note, setNote] = useState("Điều chỉnh số dư tài khoản")

  const actualBalanceValue = Number(actualBalance.replace(/\D/g, ""))
  const difference = actualBalance
    ? actualBalanceValue - (account?.balance ?? 0)
    : null

  const resetForm = () => {
    setActualBalance("")
    setAdjustmentDate(new Date())
    setAdjustmentTime(getCurrentTime())
    setCategory(null)
    setNote("Điều chỉnh số dư tài khoản")
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
    }
    onOpenChange(nextOpen)
  }

  const handleActualBalanceChange = (value: string) => {
    const digits = value.replace(/\D/g, "")
    setActualBalance(digits ? Number(digits).toLocaleString("vi-VN") : "")
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleOpenChange(false)
  }

  const differenceLabel =
    difference === null
      ? "Chưa nhập số dư thực tế"
      : difference === 0
        ? "Số dư khớp chính xác"
        : difference > 0
          ? "Dư hơn số dư hiện tại"
          : "Thiếu hụt so với hiện tại"

  const DifferenceIcon =
    difference === null
      ? CircleDashedIcon
      : difference === 0
        ? CircleCheckIcon
        : difference > 0
          ? TrendingUpIcon
          : TrendingDownIcon

  return (
    <ResponsiveDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="Điều chỉnh số dư"
      closeLabel="Hủy"
      showCloseButton
      primaryAction={
        <Button
          size="lg"
          type="submit"
          form="adjust-balance-form"
          disabled={!actualBalance}
        >
          Lưu thay đổi
        </Button>
      }
    >
      <form
        id="adjust-balance-form"
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <FieldSet className="gap-3">
          <FieldLegend variant="legend" className="px-1">
            Số dư
          </FieldLegend>

          <Card className="gap-0 overflow-hidden py-0">
            <CardContent className="px-0">
              <div className="grid min-h-16 grid-cols-2">
                <div className="flex min-w-0 flex-col justify-center bg-spending/10 px-4 py-2.5">
                  <p className="mb-1 text-sm font-semibold text-spending">
                    Hiện tại
                  </p>
                  <p className="truncate text-base font-bold tracking-tight text-spending tabular-nums">
                    {formatCurrency(account?.balance ?? 0)}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col justify-center border-l bg-background px-4 py-2.5">
                  <Field className="gap-1">
                    <FieldLabel
                      htmlFor="actual-balance"
                      className="text-sm font-semibold text-muted-foreground"
                    >
                      Thực tế
                    </FieldLabel>
                    <InputGroup className={groupedInputGroupClassName}>
                      <InputGroupInput
                        id="actual-balance"
                        inputMode="numeric"
                        autoComplete="off"
                        autoFocus
                        placeholder="Nhập số dư..."
                        value={actualBalance}
                        onChange={(event) =>
                          handleActualBalanceChange(event.target.value)
                        }
                        className="px-0 text-base font-bold tabular-nums placeholder:font-semibold md:text-base"
                      />
                      <InputGroupAddon
                        align="inline-end"
                        className={cn("pr-0", !actualBalance && "invisible")}
                      >
                        <InputGroupText className="text-base font-normal">
                          ₫
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </div>
              </div>

              <div
                className={cn(
                  "flex h-16 items-center justify-between gap-3 overflow-hidden border-t px-4 py-2.5 transition-colors",
                  difference === null && "bg-muted/50 text-muted-foreground",
                  difference !== null &&
                    difference >= 0 &&
                    "bg-savings/10 text-savings",
                  difference !== null &&
                    difference < 0 &&
                    "bg-destructive/10 text-destructive"
                )}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <DifferenceIcon
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate text-sm font-semibold">
                    {differenceLabel}
                  </span>
                </div>
                {difference !== null && difference !== 0 && (
                  <span className="shrink-0 text-sm tabular-nums font-semibold">
                    {`${difference > 0 ? "+" : ""}${formatCurrency(difference)}`}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </FieldSet>

        <FieldSet className="gap-3">
          <FieldLegend variant="legend" className="px-1">
            Thông tin điều chỉnh
          </FieldLegend>

          <Card className="gap-0 py-0">
            <CardContent className="px-0">
              <FieldGroup className="gap-0">
                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="adjustment-category"
                    className={groupedLabelClassName}
                  >
                    Hạng mục
                  </FieldLabel>
                  <Select
                    items={adjustmentCategories}
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger
                      id="adjustment-category"
                      className={groupedSelectTriggerClassName}
                    >
                      <SelectValue placeholder="Chọn hạng mục" />
                    </SelectTrigger>
                    <SelectContent
                      align="end"
                      alignItemWithTrigger={false}
                      className="min-w-56"
                    >
                      <SelectGroup>
                        {adjustmentCategories.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="adjustment-date"
                    className={groupedLabelClassName}
                  >
                    Ngày điều chỉnh
                  </FieldLabel>
                  <DatePicker
                    id="adjustment-date"
                    label={null}
                    value={adjustmentDate}
                    onValueChange={setAdjustmentDate}
                    variant="inline"
                    popoverAlign="end"
                  />
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="adjustment-time"
                    className={groupedLabelClassName}
                  >
                    Giờ điều chỉnh
                  </FieldLabel>
                  <TimePicker
                    id="adjustment-time"
                    label={null}
                    value={adjustmentTime}
                    onValueChange={setAdjustmentTime}
                    popoverSide="top"
                    variant="inline"
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </FieldSet>

        <FieldSet className="gap-3">
          <FieldLegend variant="legend" className="px-1">
            Thông tin bổ sung
          </FieldLegend>

          <Card className="gap-0 py-0">
            <CardContent className="px-0">
              <Field className="gap-2 px-4 py-4">
                <FieldLabel
                  htmlFor="adjustment-note"
                  className={groupedLabelClassName}
                >
                  Ghi chú
                </FieldLabel>
                <Textarea
                  id="adjustment-note"
                  placeholder="Thêm ghi chú"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  className="text-base md:text-base"
                />
              </Field>
            </CardContent>
          </Card>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
