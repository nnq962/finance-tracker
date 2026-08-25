"use client"

import { useState } from "react"

import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Account, AccountType } from "@/types/account"

const accountTypes: { label: string; value: AccountType }[] = [
  { label: "Tài khoản ngân hàng", value: "bank" },
  { label: "Tiền mặt", value: "cash" },
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
  const [institutionCode, setInstitutionCode] = useState(
    account?.institutionCode ?? ""
  )
  const [description, setDescription] = useState(account?.description ?? "")

  const resetForm = () => {
    setName(account?.name ?? "")
    setAccountType(account?.type ?? "bank")
    setInstitutionCode(account?.institutionCode ?? "")
    setDescription(account?.description ?? "")
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleOpenChange(false)
  }

  return (
    <ResponsiveDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="Chỉnh sửa tài khoản"
      description={account?.name}
      bodyClassName="space-y-5"
      closeLabel="Hủy"
      showCloseButton
      primaryAction={
        <Button
          size="lg"
          type="submit"
          form="edit-spending-account-form"
          disabled={!name.trim()}
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
            className="h-12"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="spending-account-type">
            Loại tài khoản
          </FieldLabel>
          <Select
            value={accountType}
            onValueChange={(nextType) => {
              if (nextType !== null) {
                setAccountType(nextType)
              }
            }}
          >
            <SelectTrigger id="spending-account-type" className="h-12 w-full">
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

        {accountType === "bank" ? (
          <Field>
            <FieldLabel htmlFor="spending-account-institution-code">
              Mã ngân hàng
            </FieldLabel>
            <Input
              id="spending-account-institution-code"
              value={institutionCode}
              onChange={(event) =>
                setInstitutionCode(event.target.value.toUpperCase())
              }
              placeholder="Ví dụ: VCB"
              autoComplete="off"
              className="h-12 uppercase"
            />
          </Field>
        ) : null}

        <Field>
          <FieldLabel htmlFor="spending-account-description">
            Mô tả
          </FieldLabel>
          <Textarea
            id="spending-account-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Thêm mô tả..."
            rows={3}
          />
        </Field>
      </form>
    </ResponsiveDrawer>
  )
}
