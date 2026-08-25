"use client"

import { useState, type SubmitEvent } from "react"

import { InstitutionSelect } from "@/components/institution-select"
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
import { Textarea } from "@/components/ui/textarea"
import type { Account, AccountType } from "@/types/account"

const accountTypes: { label: string; value: AccountType }[] = [
  { label: "Tiền mặt", value: "cash" },
  { label: "Tài khoản ngân hàng", value: "bank" },
  { label: "Ví điện tử", value: "wallet" },
]

type EditSpendingAccountDrawerProps = {
  account: Account | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSpendingAccountDrawer({
  account,
  open,
  onOpenChange,
}: EditSpendingAccountDrawerProps) {
  const [name, setName] = useState(account?.name ?? "")
  const [accountType, setAccountType] = useState<AccountType>(
    account?.type ?? "bank"
  )
  const [institutionId, setInstitutionId] = useState(
    account?.institutionId ?? ""
  )
  const [note, setNote] = useState(account?.description ?? "")
  const [excludeFromReports, setExcludeFromReports] = useState(
    account?.excludeFromReports ?? false
  )

  const resetForm = () => {
    setName(account?.name ?? "")
    setAccountType(account?.type ?? "bank")
    setInstitutionId(account?.institutionId ?? "")
    setNote(account?.description ?? "")
    setExcludeFromReports(account?.excludeFromReports ?? false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
    }

    onOpenChange(nextOpen)
  }

  const handleAccountTypeChange = (nextAccountType: AccountType | null) => {
    if (nextAccountType === null) return

    setAccountType(nextAccountType)
    setInstitutionId("")
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleOpenChange(false)
  }

  const institutionLabel =
    accountType === "bank" ? "Ngân hàng" : "Ví điện tử"
  const institutionPlaceholder =
    accountType === "bank" ? "Chọn ngân hàng" : "Chọn ví điện tử"
  const requiresInstitution =
    accountType === "bank" || accountType === "wallet"

  return (
    <ResponsiveDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="Chỉnh sửa tài khoản"
      closeLabel="Hủy"
      showCloseButton
      primaryAction={
        <Button
          size="lg"
          type="submit"
          form="edit-spending-account-form"
          disabled={
            !name.trim() || (requiresInstitution && !institutionId)
          }
        >
          Lưu thay đổi
        </Button>
      }
    >
      <form
        id="edit-spending-account-form"
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <Field>
          <FieldLabel htmlFor="spending-account-name">
            Tên tài khoản
          </FieldLabel>
          <Input
            id="spending-account-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nhập tên tài khoản"
            autoComplete="off"
            autoFocus
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="spending-account-type">
            Loại tài khoản
          </FieldLabel>
          <Select
            items={accountTypes}
            value={accountType}
            onValueChange={handleAccountTypeChange}
          >
            <SelectTrigger id="spending-account-type" className="w-full">
              <SelectValue />
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
            <FieldLabel htmlFor="spending-account-institution">
              {institutionLabel}
            </FieldLabel>
            <InstitutionSelect
              id="spending-account-institution"
              type={accountType === "bank" ? "bank" : "e-wallet"}
              value={institutionId}
              onValueChange={setInstitutionId}
              placeholder={institutionPlaceholder}
              required
              className="w-full"
            />
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="spending-account-note">
            Ghi chú
          </FieldLabel>
          <Textarea
            id="spending-account-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Thêm ghi chú..."
            rows={3}
          />
        </Field>

        <Field
          orientation="horizontal"
          className="rounded-2xl border bg-muted/30 p-4"
        >
          <FieldContent>
            <FieldLabel htmlFor="exclude-edited-spending-account-from-reports">
              Không tính vào báo cáo
            </FieldLabel>
            <FieldDescription>
              Số dư và giao dịch của tài khoản này sẽ không ảnh hưởng đến báo
              cáo tài chính.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="exclude-edited-spending-account-from-reports"
            checked={excludeFromReports}
            onCheckedChange={setExcludeFromReports}
            aria-label="Không tính tài khoản này vào báo cáo"
          />
        </Field>
      </form>
    </ResponsiveDrawer>
  )
}
