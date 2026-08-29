"use client"

import { useMemo, useState, type SubmitEvent } from "react"

import { AccountSelect } from "@/components/account-select"
import { DatePicker } from "@/components/date-picker"
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
  FieldTitle,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import type { Account } from "@/types/account"

const termOptions = [
  { label: "1 tuần", value: "1-week" },
  { label: "2 tuần", value: "2-weeks" },
  { label: "3 tuần", value: "3-weeks" },
  { label: "1 tháng", value: "1-month" },
  { label: "3 tháng", value: "3-months" },
  { label: "6 tháng", value: "6-months" },
  { label: "12 tháng", value: "12-months" },
  { label: "Khác", value: "custom" },
] as const

const interestPaymentOptions = [
  {
    label: "Đầu kỳ",
    value: "beginning",
    description: "Tiền lãi được trả ngay khi bắt đầu kỳ hạn.",
  },
  {
    label: "Cuối kỳ",
    value: "end",
    description: "Tiền lãi được trả một lần khi kỳ hạn kết thúc.",
  },
  {
    label: "Hàng tháng",
    value: "monthly",
    description: "Tiền lãi được trả định kỳ mỗi tháng.",
  },
] as const

const maturityOptions = [
  {
    label: "Gốc + lãi",
    value: "principal-and-interest",
    description: "Gốc và lãi được nhập lại để bắt đầu kỳ hạn mới.",
  },
  {
    label: "Tái tục gốc",
    value: "principal-only",
    description: "Chỉ tiền gốc được tái tục cho kỳ hạn tiếp theo.",
  },
  {
    label: "Tất toán",
    value: "settle",
    description:
      "Kết thúc sổ và chuyển toàn bộ gốc, lãi về tài khoản nguồn.",
  },
] as const

const groupedFieldClassName =
  "grid min-h-15 grid-cols-[minmax(7.5rem,0.9fr)_minmax(0,1.1fr)] items-center gap-4 px-4 py-3"

const groupedRateFieldClassName =
  "grid min-h-15 grid-cols-[minmax(10rem,1.25fr)_minmax(0,0.75fr)] items-center gap-4 px-4 py-3"

const groupedLabelClassName =
  "transition-colors group-has-[:focus-visible]/field:text-primary"

const groupedInputClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent pr-px pl-0 text-right text-base shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-base"

const groupedInputGroupClassName =
  "h-auto min-w-0 rounded-none border-0 bg-transparent shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0"

const groupedSelectTriggerClassName =
  "h-auto w-full min-w-0 justify-end rounded-none border-0 bg-transparent px-0 text-base shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 data-[size=default]:h-auto [&_[data-slot=select-value]]:justify-end [&_[data-slot=select-value]]:text-right "

const groupedSeparatorClassName =
  "mx-4 bg-border/70 data-horizontal:w-auto"

type TermValue = (typeof termOptions)[number]["value"]
type InterestPaymentValue =
  (typeof interestPaymentOptions)[number]["value"]
type MaturityValue = (typeof maturityOptions)[number]["value"]

type AddSavingsAccountDrawerProps = {
  accounts: Account[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddSavingsAccountDrawer({
  accounts,
  open,
  onOpenChange,
}: AddSavingsAccountDrawerProps) {
  const [name, setName] = useState("")
  const [institutionId, setInstitutionId] = useState("")
  const [depositDate, setDepositDate] = useState<Date | undefined>(new Date())
  const [initialBalance, setInitialBalance] = useState("")
  const [term, setTerm] = useState<TermValue | null>(null)
  const [customTermMonths, setCustomTermMonths] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [nonTermInterestRate, setNonTermInterestRate] = useState("")
  const [daysPerYear, setDaysPerYear] = useState<"365" | "360">("365")
  const [interestPayment, setInterestPayment] =
    useState<InterestPaymentValue>("end")
  const [maturityAction, setMaturityAction] =
    useState<MaturityValue>("principal-and-interest")
  const [sourceAccountId, setSourceAccountId] = useState<string | null>(null)
  const [note, setNote] = useState("")
  const [excludeFromReports, setExcludeFromReports] = useState(false)

  const sourceAccounts = useMemo(
    () =>
      accounts.filter(
        (account) =>
          account.purpose === "spending" && account.status !== "inactive"
      ),
    [accounts]
  )

  const resetForm = () => {
    setName("")
    setInstitutionId("")
    setDepositDate(new Date())
    setInitialBalance("")
    setTerm(null)
    setCustomTermMonths("")
    setInterestRate("")
    setNonTermInterestRate("")
    setDaysPerYear("365")
    setInterestPayment("end")
    setMaturityAction("principal-and-interest")
    setSourceAccountId(null)
    setNote("")
    setExcludeFromReports(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetForm()
    onOpenChange(nextOpen)
  }

  const handleInitialBalanceChange = (value: string) => {
    const digits = value.replace(/\D/g, "")
    setInitialBalance(digits ? Number(digits).toLocaleString("vi-VN") : "")
  }

  const handleTermChange = (nextTerm: TermValue | null) => {
    setTerm(nextTerm)
    if (nextTerm !== "custom") setCustomTermMonths("")
  }

  const handleCustomTermChange = (value: string) => {
    setCustomTermMonths(value.replace(/\D/g, ""))
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleOpenChange(false)
  }

  const isFormComplete = Boolean(
    name.trim() &&
      institutionId &&
      depositDate &&
      initialBalance &&
      term &&
      (term !== "custom" || customTermMonths) &&
      interestRate &&
      nonTermInterestRate &&
      sourceAccountId
  )
  return (
    <ResponsiveDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="Thêm tài khoản tiết kiệm"
      closeLabel="Hủy"
      showCloseButton
      primaryAction={
        <Button
          type="submit"
          size="lg"
          form="add-savings-account-form"
          disabled={!isFormComplete}
        >
          Thêm sổ tiết kiệm
        </Button>
      }
    >
      <form
        id="add-savings-account-form"
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
                    htmlFor="savings-preview-name"
                    className={groupedLabelClassName}
                  >
                    Tên sổ tiết kiệm
                  </FieldLabel>
                  <Input
                    id="savings-preview-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Nhập tên sổ"
                    autoComplete="off"
                    className={groupedInputClassName}
                  />
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="savings-preview-institution"
                    className={groupedLabelClassName}
                  >
                    Ngân hàng
                  </FieldLabel>
                  <InstitutionSelect
                    id="savings-preview-institution"
                    type="bank"
                    variant="inline"
                    value={institutionId}
                    onValueChange={setInstitutionId}
                    placeholder="Chọn ngân hàng"
                    required
                  />
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="savings-preview-date"
                    className={groupedLabelClassName}
                  >
                    Ngày gửi
                  </FieldLabel>
                  <DatePicker
                    id="savings-preview-date"
                    label={null}
                    variant="inline"
                    value={depositDate}
                    onValueChange={setDepositDate}
                    placeholder="Chọn ngày gửi"
                    popoverAlign="end"
                  />
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="savings-preview-balance"
                    className={groupedLabelClassName}
                  >
                    Số dư ban đầu
                  </FieldLabel>
                  <InputGroup className={groupedInputGroupClassName}>
                    <InputGroupInput
                      id="savings-preview-balance"
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

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="new-savings-source-account"
                    className={groupedLabelClassName}
                  >
                    Tài khoản nguồn
                  </FieldLabel>
                  <AccountSelect
                    id="new-savings-source-account"
                    accounts={sourceAccounts}
                    value={sourceAccountId}
                    onValueChange={setSourceAccountId}
                    placeholder={
                      sourceAccounts.length > 0
                        ? "Chọn tài khoản"
                        : "Không có tài khoản"
                    }
                    disabled={sourceAccounts.length === 0}
                    variant="inline"
                    popoverAlign="end"
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </FieldSet>

        <FieldSet className="gap-3">
          <FieldLegend variant="legend" className="px-1">
            Kỳ hạn & lãi suất
          </FieldLegend>

          <Card className="gap-0 py-0">
            <CardContent className="px-0">
              <FieldGroup className="gap-0">
                <Field className={groupedFieldClassName}>
                  <FieldLabel
                    htmlFor="new-savings-account-term"
                    className={groupedLabelClassName}
                  >
                    Kỳ hạn
                  </FieldLabel>
                  <Select
                    items={termOptions}
                    value={term}
                    onValueChange={handleTermChange}
                  >
                    <SelectTrigger
                      id="new-savings-account-term"
                      className={groupedSelectTriggerClassName}
                    >
                      <SelectValue placeholder="Chọn kỳ hạn" />
                    </SelectTrigger>
                    <SelectContent
                      align="end"
                      alignItemWithTrigger={false}
                      className="min-w-48"
                    >
                      <SelectGroup>
                        {termOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                {term === "custom" ? (
                  <>
                    <Separator className={groupedSeparatorClassName} />
                    <Field className={groupedFieldClassName}>
                      <FieldLabel
                        htmlFor="new-savings-custom-term"
                        className={groupedLabelClassName}
                      >
                        Kỳ hạn tùy chỉnh
                      </FieldLabel>
                      <InputGroup className={groupedInputGroupClassName}>
                        <InputGroupInput
                          id="new-savings-custom-term"
                          inputMode="numeric"
                          placeholder="0"
                          value={customTermMonths}
                          onChange={(event) =>
                            handleCustomTermChange(event.target.value)
                          }
                          className="px-0 text-right text-base md:text-base"
                        />
                        <InputGroupAddon
                          align="inline-end"
                          className="pr-0"
                        >
                          <InputGroupText className="text-base font-normal">
                            tháng
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  </>
                ) : null}

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedRateFieldClassName}>
                  <FieldLabel
                    htmlFor="new-savings-interest-rate"
                    className={groupedLabelClassName}
                  >
                    Lãi suất
                  </FieldLabel>
                  <InputGroup className={groupedInputGroupClassName}>
                    <InputGroupInput
                      id="new-savings-interest-rate"
                      inputMode="decimal"
                      placeholder="0"
                      value={interestRate}
                      onChange={(event) => setInterestRate(event.target.value)}
                      className="px-0 text-right text-base md:text-base"
                    />
                    <InputGroupAddon align="inline-end" className="pr-0">
                      <InputGroupText className="text-base font-normal">
                        %/năm
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedRateFieldClassName}>
                  <FieldLabel
                    htmlFor="new-savings-non-term-interest-rate"
                    className={`${groupedLabelClassName} whitespace-nowrap`}
                  >
                    Lãi suất không kỳ hạn
                  </FieldLabel>
                  <InputGroup className={groupedInputGroupClassName}>
                    <InputGroupInput
                      id="new-savings-non-term-interest-rate"
                      inputMode="decimal"
                      placeholder="0"
                      value={nonTermInterestRate}
                      onChange={(event) =>
                        setNonTermInterestRate(event.target.value)
                      }
                      className="px-0 text-right text-base md:text-base"
                    />
                    <InputGroupAddon align="inline-end" className="pr-0">
                      <InputGroupText className="text-base font-normal">
                        %/năm
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Separator className={groupedSeparatorClassName} />

                <Field className={groupedFieldClassName}>
                  <FieldTitle className={groupedLabelClassName}>
                    Số ngày tính lãi/năm
                  </FieldTitle>
                  <Tabs
                    value={daysPerYear}
                    onValueChange={(value) => {
                      if (value === "365" || value === "360") {
                        setDaysPerYear(value)
                      }
                    }}
                    className="w-full max-w-44 justify-self-end"
                  >
                    <TabsList
                      className="w-full"
                      aria-label="Số ngày tính lãi trong một năm"
                    >
                      <TabsTrigger value="365">365</TabsTrigger>
                      <TabsTrigger value="360">360</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </FieldSet>

        <FieldSet className="gap-3">
          <FieldLegend variant="legend" className="px-1">
            Lãi & đáo hạn
          </FieldLegend>

          <Card className="gap-0 py-0">
            <CardContent className="px-0">
              <Field
                className="gap-3 px-4 py-4"
                aria-labelledby="interest-payment-title"
              >
                <FieldTitle id="interest-payment-title">
                  Trả lãi
                </FieldTitle>
                <Tabs
                  value={interestPayment}
                  onValueChange={(value) =>
                    setInterestPayment(value as InterestPaymentValue)
                  }
                >
                  <TabsList
                    className="w-full"
                    aria-label="Thời điểm trả lãi"
                  >
                    {interestPaymentOptions.map((option) => (
                      <TabsTrigger
                        key={option.value}
                        value={option.value}
                        className="min-w-0 px-1 text-base"
                      >
                        {option.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {interestPaymentOptions.map((option) => (
                    <TabsContent
                      key={option.value}
                      value={option.value}
                      className="min-h-8 text-sm text-muted-foreground"
                    >
                      {option.description}
                    </TabsContent>
                  ))}
                </Tabs>
              </Field>

              <Separator className={groupedSeparatorClassName} />

              <Field
                className="gap-3 px-4 py-4"
                aria-labelledby="maturity-action-title"
              >
                <FieldTitle id="maturity-action-title">
                  Khi đến hạn
                </FieldTitle>
                <Tabs
                  value={maturityAction}
                  onValueChange={(value) =>
                    setMaturityAction(value as MaturityValue)
                  }
                >
                  <TabsList
                    className="w-full"
                    aria-label="Cách xử lý khi đến hạn"
                  >
                    {maturityOptions.map((option) => (
                      <TabsTrigger
                        key={option.value}
                        value={option.value}
                        className="min-w-0 px-1 text-base"
                      >
                        {option.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {maturityOptions.map((option) => (
                    <TabsContent
                      key={option.value}
                      value={option.value}
                      className="min-h-8 text-sm text-muted-foreground"
                    >
                      {option.description}
                    </TabsContent>
                  ))}
                </Tabs>
              </Field>
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
                  htmlFor="new-savings-account-note"
                  className={groupedLabelClassName}
                >
                  Ghi chú
                </FieldLabel>
                <Textarea
                  id="new-savings-account-note"
                  placeholder="Thêm ghi chú"
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
                  <FieldLabel htmlFor="exclude-savings-account-from-reports">
                    Không tính vào báo cáo
                  </FieldLabel>
                  <FieldDescription
                    id="exclude-savings-account-from-reports-description"
                    className="text-sm"
                  >
                    Số dư và lãi của sổ này sẽ không ảnh hưởng đến báo cáo tài
                    chính.
                  </FieldDescription>
                </FieldContent>
                <Switch
                  id="exclude-savings-account-from-reports"
                  checked={excludeFromReports}
                  onCheckedChange={setExcludeFromReports}
                  aria-label="Không tính sổ tiết kiệm này vào báo cáo"
                  aria-describedby="exclude-savings-account-from-reports-description"
                />
              </Field>
            </CardContent>
          </Card>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
