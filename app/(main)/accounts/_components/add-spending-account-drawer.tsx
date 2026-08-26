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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
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
import type { AccountType } from "@/types/account"

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

const groupedInputGroupClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0"

const groupedSelectTriggerClassName =
  "h-auto w-full min-w-0 justify-end rounded-none border-0 bg-transparent px-0 text-base shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-[size=default]:h-auto [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right [&_svg]:hidden"

const groupedSeparatorClassName =
  "mx-4 bg-border/70 data-horizontal:w-auto"

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
  const [institutionId, setInstitutionId] = useState("")
  const [initialBalance, setInitialBalance] = useState("")
  const [note, setNote] = useState("")
  const [excludeFromReports, setExcludeFromReports] = useState(false)

  const resetForm = () => {
    setName("")
    setAccountType(null)
    setInstitutionId("")
    setInitialBalance("")
    setNote("")
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

  const handleAccountTypeChange = (nextAccountType: AccountType | null) => {
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
      title="Thêm tài khoản chi tiêu"
      closeLabel="Hủy"
      showCloseButton
      primaryAction={
        <Button
          type="submit"
          size="lg"
          form="add-spending-account-form"
          disabled={
            !name.trim() ||
            accountType === null ||
            (requiresInstitution && !institutionId)
          }
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
        <FieldSet className="gap-3">
          <FieldLegend variant="legend" className="px-1">
            Thông tin chung
          </FieldLegend>

          <Card className="gap-0 py-0">
            <CardContent className="px-0">
              <FieldGroup className="gap-0">
                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="new-spending-account-name"
                    className={groupedLabelClassName}
                  >
                    Tên tài khoản
                  </FieldLabel>
                  <Input
                    id="new-spending-account-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Nhập tên tài khoản"
                    autoComplete="off"
                    className={groupedInputClassName}
                  />
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="new-spending-account-type"
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
                      id="new-spending-account-type"
                      className={groupedSelectTriggerClassName}
                    >
                      <SelectValue placeholder="Chọn loại" />
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
                        htmlFor="new-spending-account-institution"
                        className={groupedLabelClassName}
                      >
                        {institutionLabel}
                      </FieldLabel>
                      <InstitutionSelect
                        id="new-spending-account-institution"
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

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="new-spending-account-balance"
                    className={groupedLabelClassName}
                  >
                    Số dư ban đầu
                  </FieldLabel>
                  <InputGroup className={groupedInputGroupClassName}>
                    <InputGroupInput
                      id="new-spending-account-balance"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="0"
                      value={initialBalance}
                      onChange={(event) =>
                        handleInitialBalanceChange(event.target.value)
                      }
                      className="px-0 text-right text-base font-semibold tabular-nums md:text-base"
                    />
                    <InputGroupAddon align="inline-end" className="pr-0">
                      <InputGroupText className="text-base font-normal">
                        ₫
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
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
                  htmlFor="new-spending-account-note"
                  className={groupedLabelClassName}
                >
                  Ghi chú
                </FieldLabel>
                <Textarea
                  id="new-spending-account-note"
                  placeholder="Thêm ghi chú..."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
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
                  <FieldLabel htmlFor="exclude-spending-account-from-reports">
                    Không tính vào báo cáo
                  </FieldLabel>
                  <FieldDescription
                    id="exclude-spending-account-from-reports-description"
                    className="text-xs"
                  >
                    Số dư và giao dịch của tài khoản này sẽ không ảnh hưởng đến
                    báo cáo tài chính.
                  </FieldDescription>
                </FieldContent>
                <Switch
                  id="exclude-spending-account-from-reports"
                  checked={excludeFromReports}
                  onCheckedChange={setExcludeFromReports}
                  aria-label="Không tính tài khoản này vào báo cáo"
                  aria-describedby="exclude-spending-account-from-reports-description"
                />
              </Field>
            </CardContent>
          </Card>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
