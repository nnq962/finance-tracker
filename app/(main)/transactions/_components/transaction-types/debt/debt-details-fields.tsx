"use client"

import { useEffect, useRef } from "react"
import { CircleAlertIcon, CircleCheckIcon, CircleDashedIcon, CircleDollarSignIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { formatCurrency } from "@/lib/currency"

import type { DebtSelection } from "./debt-counterparty-options"
import { DebtTermsFields } from "./debt-terms-fields"
import type { DebtType } from "./debt-type-options"

type DebtDetailsFieldsProps = {
  amount: number
  debtType: DebtType
  selectedDebt: DebtSelection | null
}

export function DebtDetailsFields({
  amount,
  debtType,
  selectedDebt,
}: DebtDetailsFieldsProps) {
  const transactionDateRef = useRef<HTMLInputElement>(null)
  const isSettlement = debtType === "collect" || debtType === "repay"

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")

    if (transactionDateRef.current) {
      transactionDateRef.current.value = `${year}-${month}-${day}`
    }
  }, [])

  if (isSettlement) {
    return (
      <>
        <SettlementSummary amount={amount} selectedDebt={selectedDebt} />
        <Field className="min-w-0">
          <FieldLabel htmlFor="debt-transaction-date">
            {debtType === "collect" ? "Ngày thu nợ" : "Ngày trả nợ"}
          </FieldLabel>
          <Input
            ref={transactionDateRef}
            id="debt-transaction-date"
            name="debt-transaction-date"
            type="date"
            lang="vi-VN"
            className="block box-border h-8 min-h-8 max-h-8 w-full min-w-0 max-w-full appearance-none [&::-webkit-date-and-time-value]:min-w-0 [&::-webkit-datetime-edit]:p-0"
          />
        </Field>
      </>
    )
  }

  return <DebtTermsFields debtType={debtType} />
}

function SettlementSummary({
  amount,
  selectedDebt,
}: {
  amount: number
  selectedDebt: DebtSelection | null
}) {
  if (!selectedDebt) {
    return (
      <div className="space-y-3">
        <h3 className="font-heading text-base font-medium">
          Khoản nợ sau giao dịch
        </h3>
        <Item variant="muted">
          <ItemMedia variant="icon">
            <CircleAlertIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Chưa chọn khoản nợ</ItemTitle>
            <ItemDescription>
              Chọn người và khoản nợ ở phía trên để xem số dư dự kiến.
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>
    )
  }

  const remaining = Math.max(selectedDebt.remaining - amount, 0)
  const isOverpayment = amount > selectedDebt.remaining
  const isSettled = amount > 0 && remaining === 0 && !isOverpayment
  const status = isOverpayment
    ? { label: "Vượt dư nợ", icon: CircleAlertIcon, color: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" }
    : isSettled
      ? { label: "Tất toán", icon: CircleCheckIcon, color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" }
      : amount > 0
        ? { label: "Thanh toán một phần", icon: CircleDollarSignIcon, color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" }
        : { label: "Chưa nhập số tiền", icon: CircleDashedIcon, color: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" }
  const StatusIcon = status.icon

  return (
    <section className="min-w-0 space-y-5" aria-label="Khoản nợ sau giao dịch">
      <h3 className="font-heading text-sm font-medium">
        Khoản nợ sau giao dịch
      </h3>
      <Item variant="muted">
        <div className="w-full">
          <div className="flex items-start justify-between gap-3">
            <p className="min-w-0 text-sm text-muted-foreground wrap-anywhere">
              {selectedDebt.personName}
            </p>
            <Badge variant="secondary" className={status.color} role="status">
              <StatusIcon data-icon="inline-start" aria-hidden="true" />
              {status.label}
            </Badge>
          </div>
          <dl className="mt-4 space-y-4">
            <div className="flex items-start justify-between gap-4 text-sm">
              <dt className="shrink-0 text-muted-foreground">Ghi chú</dt>
              <dd className="min-w-0 text-right whitespace-pre-wrap wrap-anywhere">
                {selectedDebt.note || "—"}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 text-sm">
              <dt className="shrink-0 text-muted-foreground">Dư nợ hiện tại</dt>
              <dd className="min-w-0 text-right font-medium tabular-nums wrap-anywhere">
                {formatCurrency(selectedDebt.remaining)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 text-sm">
              <dt className="shrink-0 text-muted-foreground">
                Số tiền thanh toán
              </dt>
              <dd className="min-w-0 text-right font-medium tabular-nums wrap-anywhere">
                {formatCurrency(amount)}
              </dd>
            </div>
          </dl>
          <ItemSeparator className="my-5" />
          <dl>
            <div className="flex items-start justify-between gap-4 text-sm">
              <dt className="shrink-0 text-muted-foreground">Còn lại</dt>
              <dd className="min-w-0 text-right font-medium tabular-nums wrap-anywhere">
                {formatCurrency(remaining)}
              </dd>
            </div>
          </dl>
        </div>
      </Item>
      {isOverpayment && (
        <p className="text-sm text-destructive" role="alert">
          Số tiền thanh toán vượt dư nợ {formatCurrency(amount - selectedDebt.remaining)}.
          {" "}Kiểm tra lại số tiền trước khi lưu.
        </p>
      )}
    </section>
  )
}
