"use client"

import { useState, type SubmitEvent } from "react"

import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { AccountType } from "@/types/account"

const accountTypes: { label: string; value: AccountType }[] = [
  { label: "Tiền mặt", value: "cash" },
  { label: "Tài khoản ngân hàng", value: "bank" },
  { label: "Ví điện tử", value: "wallet" },
]

type AddSpendingAccountDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddSpendingAccountDrawer({
  open,
  onOpenChange,
}: AddSpendingAccountDrawerProps) {
  const [name, setName] = useState("")
  const [accountType, setAccountType] = useState<AccountType | null>(null)
  const [initialBalance, setInitialBalance] = useState("")
  const [excludeFromReports, setExcludeFromReports] = useState(false)

  const resetForm = () => {
    setName("")
    setAccountType(null)
    setInitialBalance("")
    setExcludeFromReports(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
    }

    onOpenChange(nextOpen)
  }

  const handleInitialBalanceChange = (value: string) => {
    const digits = value.replace(/\D/g, "")
    setInitialBalance(digits ? Number(digits).toLocaleString("vi-VN") : "")
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleOpenChange(false)
  }

  const institutionLabel =
    accountType === "bank" ? "Ngân hàng" : "Ví điện tử"
  const institutionPlaceholder =
    accountType === "bank" ? "Chọn ngân hàng" : "Chọn ví điện tử"

  return (
    <ResponsiveDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="Thêm tài khoản chi tiêu"
      bodyClassName="space-y-5"
      closeLabel="Hủy"
      showCloseButton
      primaryAction={
        <Button
          type="submit"
          size="lg"
          form="add-spending-account-form"
          disabled={!name.trim() || accountType === null}
        >
          Thêm tài khoản
        </Button>
      }
    >
      <form
        id="add-spending-account-form"
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <Field>
          <FieldLabel htmlFor="new-spending-account-name">
            Tên tài khoản
          </FieldLabel>
          <Input
            id="new-spending-account-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tên tài khoản của bạn"
            autoComplete="off"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="new-spending-account-type">
            Loại tài khoản
          </FieldLabel>
          <Select
            items={accountTypes}
            value={accountType}
            onValueChange={setAccountType}
          >
            <SelectTrigger
              id="new-spending-account-type"
              className="w-full"
            >
              <SelectValue placeholder="Chọn loại tài khoản" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {accountTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {(accountType === "bank" || accountType === "wallet") && (
          <Field>
            <FieldLabel htmlFor="new-spending-account-institution">
              {institutionLabel}
            </FieldLabel>
            <Select>
              <SelectTrigger
                id="new-spending-account-institution"
                className="w-full"
              >
                <SelectValue placeholder={institutionPlaceholder} />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  <SelectItem value="not-available" disabled>
                    Danh sách sẽ được bổ sung ở bước tiếp theo
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="new-spending-account-balance">
            Số dư ban đầu
          </FieldLabel>
          <div className="relative">
            <Input
              id="new-spending-account-balance"
              inputMode="numeric"
              autoComplete="off"
              placeholder="0"
              value={initialBalance}
              onChange={(event) =>
                handleInitialBalanceChange(event.target.value)
              }
              className="pr-10 text-right font-semibold tabular-nums"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-muted-foreground">
              ₫
            </span>
          </div>
        </Field>

        <Field
          orientation="horizontal"
          className="rounded-2xl border bg-muted/30 p-4"
        >
          <FieldContent>
            <FieldLabel htmlFor="exclude-spending-account-from-reports">
              Không tính vào báo cáo
            </FieldLabel>
            <FieldDescription>
              Số dư và giao dịch của tài khoản này sẽ không ảnh hưởng đến báo
              cáo tài chính.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="exclude-spending-account-from-reports"
            checked={excludeFromReports}
            onCheckedChange={setExcludeFromReports}
            aria-label="Không tính tài khoản này vào báo cáo"
          />
        </Field>
      </form>
    </ResponsiveDrawer>
  )
}
