"use client"

import { useState, type SubmitEvent } from "react"

import { InstitutionSelect } from "@/components/institution-select"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
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
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { Account, AccountType } from "@/types/account"

const accountTypes: { label: string; value: AccountType }[] = [
  { label: "Tiền mặt", value: "cash" },
  { label: "Tài khoản ngân hàng", value: "bank" },
  { label: "Ví điện tử", value: "wallet" },
]

const groupedFieldClassName =
  "grid min-h-15 grid-cols-[minmax(6.75rem,0.8fr)_minmax(0,1.2fr)] items-center gap-4 px-4 py-3"

const groupedLabelClassName =
  "transition-colors group-has-[:focus-visible]/field:text-primary"

const groupedInputClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent pr-px pl-0 text-right text-base shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-base"

const groupedSelectTriggerClassName =
  "h-auto w-full min-w-0 justify-end rounded-none border-0 bg-transparent px-0 text-base shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-[size=default]:h-auto [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right [&_svg]:hidden"

const groupedSeparatorClassName =
  "mx-4 bg-border/70 data-horizontal:w-auto"

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
        <FieldSet className="gap-3">
          <FieldLegend variant="legend" className="px-1">
            Thông tin chung
          </FieldLegend>

          <Card className="gap-0 py-0">
            <CardContent className="px-0">
              <FieldGroup className="gap-0">
                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="spending-account-name"
                    className={groupedLabelClassName}
                  >
                    Tên tài khoản
                  </FieldLabel>
                  <Input
                    id="spending-account-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Nhập tên tài khoản"
                    autoComplete="off"
                    autoFocus
                    className={groupedInputClassName}
                  />
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="spending-account-type"
                    className={groupedLabelClassName}
                  >
                    Loại tài khoản
                  </FieldLabel>
                  <Select
                    items={accountTypes}
                    value={accountType}
                    onValueChange={handleAccountTypeChange}
                  >
                    <SelectTrigger
                      id="spending-account-type"
                      className={groupedSelectTriggerClassName}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      align="end"
                      alignItemWithTrigger={false}
                      className="min-w-64"
                    >
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

                {requiresInstitution ? (
                  <>
                    <Separator className={groupedSeparatorClassName} />

                    <Field className={groupedFieldClassName}>
                      <FieldLabel
                        htmlFor="spending-account-institution"
                        className={groupedLabelClassName}
                      >
                        {institutionLabel}
                      </FieldLabel>
                      <InstitutionSelect
                        id="spending-account-institution"
                        type={accountType === "bank" ? "bank" : "e-wallet"}
                        variant="inline"
                        value={institutionId}
                        onValueChange={setInstitutionId}
                        placeholder={institutionPlaceholder}
                        required
                      />
                    </Field>
                  </>
                ) : null}
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
                  htmlFor="spending-account-note"
                  className={groupedLabelClassName}
                >
                  Ghi chú
                </FieldLabel>
                <Textarea
                  id="spending-account-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Thêm ghi chú"
                  rows={3}
                  className="text-base md:text-base"
                />
              </Field>

              <Separator className={groupedSeparatorClassName} />

              <Field
                orientation="horizontal"
                className="items-center gap-4 px-4 py-4"
              >
                <FieldContent>
                  <FieldLabel htmlFor="exclude-edited-spending-account-from-reports">
                    Không tính vào báo cáo
                  </FieldLabel>
                  <FieldDescription
                    id="exclude-edited-spending-account-from-reports-description"
                    className="text-xs"
                  >
                    Số dư và giao dịch của tài khoản này sẽ không ảnh hưởng đến
                    báo cáo tài chính.
                  </FieldDescription>
                </FieldContent>
                <Switch
                  id="exclude-edited-spending-account-from-reports"
                  checked={excludeFromReports}
                  onCheckedChange={setExcludeFromReports}
                  aria-label="Không tính tài khoản này vào báo cáo"
                  aria-describedby="exclude-edited-spending-account-from-reports-description"
                />
              </Field>
            </CardContent>
          </Card>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
