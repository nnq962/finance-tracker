"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
  const [adjustmentDate, setAdjustmentDate] = useState<Date | undefined>(() =>
    new Date()
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
    setActualBalance(
      digits ? Number(digits).toLocaleString("vi-VN") : ""
    )
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
        <div className="overflow-hidden rounded-2xl border">
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
                <div className="relative">
                  <Input
                    id="actual-balance"
                    inputMode="numeric"
                    autoComplete="off"
                    autoFocus
                    placeholder="Nhập số dư..."
                    value={actualBalance}
                    onChange={(event) =>
                      handleActualBalanceChange(event.target.value)
                    }
                    className="h-auto rounded-none border-0 bg-transparent p-0 pr-4 text-base font-bold tabular-nums placeholder:font-semibold focus-visible:border-transparent focus-visible:ring-0"
                  />
                  {actualBalance && (
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-base font-bold text-muted-foreground">
                      ₫
                    </span>
                  )}
                </div>
              </Field>
            </div>
          </div>

          <div
            className={cn(
              "flex min-h-16 items-center justify-between gap-3 border-t px-4 py-2.5 transition-colors",
              difference === null && "bg-muted/50 text-muted-foreground",
              difference !== null && difference >= 0 && "bg-savings/10 text-savings",
              difference !== null && difference < 0 &&
                "bg-destructive/10 text-destructive"
            )}
          >
            <div className="flex min-w-0 items-center gap-2">
              <DifferenceIcon className="size-5 shrink-0" aria-hidden="true" />
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
        </div>

        <Field>
          <FieldLabel htmlFor="adjustment-category">Hạng mục</FieldLabel>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="adjustment-category" className="w-full">
              <SelectValue placeholder="Chọn hạng mục" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
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

        <div className="grid grid-cols-2 gap-3">
          <DatePicker
            id="adjustment-date"
            label="Ngày điều chỉnh"
            value={adjustmentDate}
            onValueChange={setAdjustmentDate}
            className="w-full"
          />
          <TimePicker
            id="adjustment-time"
            label="Giờ điều chỉnh"
            value={adjustmentTime}
            onValueChange={setAdjustmentTime}
            popoverSide="top"
            className="w-full"
          />
        </div>

        <Field>
          <FieldLabel htmlFor="adjustment-note">Ghi chú</FieldLabel>
          <Textarea
            id="adjustment-note"
            placeholder="Thêm ghi chú..."
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
          />
        </Field>
      </form>
    </ResponsiveDrawer>
  )
}
