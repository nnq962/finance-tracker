"use client"

import { useEffect, useRef } from "react"
import { CircleAlertIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
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
        <Field>
          <FieldLabel htmlFor="debt-transaction-date">
            {debtType === "collect" ? "Ngày thu nợ" : "Ngày trả nợ"}
          </FieldLabel>
          <Input
            ref={transactionDateRef}
            id="debt-transaction-date"
            name="debt-transaction-date"
            type="date"
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
    ? "Vượt dư nợ"
    : isSettled
      ? "Tất toán"
      : amount > 0
        ? "Thanh toán một phần"
        : "Chưa nhập số tiền"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-heading text-base font-medium">
            Khoản nợ sau giao dịch
          </h3>
          <p className="text-sm text-muted-foreground">
            {selectedDebt.personName} · {selectedDebt.note}
          </p>
        </div>
        <Badge variant={isOverpayment ? "destructive" : "secondary"}>
          {status}
        </Badge>
      </div>

      <dl className="grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Dư nợ hiện tại</dt>
          <dd className="font-medium tabular-nums">
            {formatCurrency(selectedDebt.remaining)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Số tiền thanh toán</dt>
          <dd className="font-medium tabular-nums">{formatCurrency(amount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Còn lại</dt>
          <dd className="font-medium tabular-nums">
            {formatCurrency(remaining)}
          </dd>
        </div>
      </dl>
    </div>
  )
}
