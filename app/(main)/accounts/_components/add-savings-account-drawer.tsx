"use client"

import { useMemo, useState, type SubmitEvent } from "react"

import { DatePicker } from "@/components/date-picker"
import { InstitutionSelect } from "@/components/institution-select"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
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

  const sourceAccountOptions = useMemo(
    () =>
      accounts
        .filter(
          (account) =>
            account.purpose === "spending" && account.status !== "inactive"
        )
        .map((account) => ({ label: account.name, value: account.id })),
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
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="new-savings-account-name">
              Tên sổ tiết kiệm
            </FieldLabel>
            <Input
              id="new-savings-account-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Sổ tiết kiệm của bạn"
              autoComplete="off"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="new-savings-account-institution">
              Ngân hàng
            </FieldLabel>
            <InstitutionSelect
              id="new-savings-account-institution"
              type="bank"
              value={institutionId}
              onValueChange={setInstitutionId}
              placeholder="Chọn ngân hàng"
              required
              className="w-full"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <DatePicker
            id="new-savings-account-date"
            label="Ngày gửi"
            placeholder="Chọn ngày gửi"
            value={depositDate}
            onValueChange={setDepositDate}
            className="w-full"
          />

          <Field>
            <FieldLabel htmlFor="new-savings-account-balance">
              Số dư ban đầu
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="new-savings-account-balance"
                inputMode="numeric"
                autoComplete="off"
                placeholder="0"
                value={initialBalance}
                onChange={(event) =>
                  handleInitialBalanceChange(event.target.value)
                }
                className="text-right font-semibold tabular-nums"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>₫</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field className={term === "custom" ? undefined : "col-span-2"}>
            <FieldLabel htmlFor="new-savings-account-term">
              Kỳ hạn
            </FieldLabel>
            <Select
              items={termOptions}
              value={term}
              onValueChange={handleTermChange}
            >
              <SelectTrigger id="new-savings-account-term" className="w-full">
                <SelectValue placeholder="Chọn kỳ hạn" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
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
            <Field>
              <FieldLabel htmlFor="new-savings-custom-term">
                Kỳ hạn tùy chỉnh
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="new-savings-custom-term"
                  inputMode="numeric"
                  placeholder="0"
                  value={customTermMonths}
                  onChange={(event) =>
                    handleCustomTermChange(event.target.value)
                  }
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>tháng</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="new-savings-interest-rate">
              Lãi suất
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="new-savings-interest-rate"
                inputMode="decimal"
                placeholder="0"
                value={interestRate}
                onChange={(event) => setInterestRate(event.target.value)}
                className="text-right tabular-nums"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>%/năm</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="new-savings-non-term-interest-rate">
              Lãi suất không kỳ hạn
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="new-savings-non-term-interest-rate"
                inputMode="decimal"
                placeholder="0"
                value={nonTermInterestRate}
                onChange={(event) =>
                  setNonTermInterestRate(event.target.value)
                }
                className="text-right tabular-nums"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>%/năm</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>

        <Field>
          <FieldLabel>Số ngày tính lãi/năm</FieldLabel>
          <Tabs
            value={daysPerYear}
            onValueChange={(value) => {
              if (value === "365" || value === "360") {
                setDaysPerYear(value)
              }
            }}
          >
            <TabsList
              className="w-full"
              aria-label="Số ngày tính lãi trong một năm"
            >
              <TabsTrigger value="365">365 ngày</TabsTrigger>
              <TabsTrigger value="360">360 ngày</TabsTrigger>
            </TabsList>
          </Tabs>
        </Field>

        <FieldSet className="gap-3">
          <FieldLegend variant="label">Trả lãi</FieldLegend>
          <Tabs
            value={interestPayment}
            onValueChange={(value) =>
              setInterestPayment(value as InterestPaymentValue)
            }
          >
            <TabsList className="w-full">
              {interestPaymentOptions.map((option) => (
                <TabsTrigger key={option.value} value={option.value}>
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {interestPaymentOptions.map((option) => (
              <TabsContent
                key={option.value}
                value={option.value}
                className="text-xs text-muted-foreground"
              >
                {option.description}
              </TabsContent>
            ))}
          </Tabs>
        </FieldSet>

        <FieldSet className="gap-3">
          <FieldLegend variant="label">Khi đến hạn</FieldLegend>
          <Tabs
            value={maturityAction}
            onValueChange={(value) =>
              setMaturityAction(value as MaturityValue)
            }
          >
            <TabsList className="w-full">
              {maturityOptions.map((option) => (
                <TabsTrigger key={option.value} value={option.value}>
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {maturityOptions.map((option) => (
              <TabsContent
                key={option.value}
                value={option.value}
                className="text-xs text-muted-foreground"
              >
                {option.description}
              </TabsContent>
            ))}
          </Tabs>
        </FieldSet>

        <Field>
          <FieldLabel htmlFor="new-savings-source-account">
            Tiền gửi được chuyển từ tài khoản
          </FieldLabel>
          <Select
            items={sourceAccountOptions}
            value={sourceAccountId}
            onValueChange={setSourceAccountId}
          >
            <SelectTrigger
              id="new-savings-source-account"
              className="w-full"
            >
              <SelectValue placeholder="Chọn tài khoản nguồn" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {sourceAccountOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="new-savings-account-note">
            Ghi chú
          </FieldLabel>
          <Textarea
            id="new-savings-account-note"
            placeholder="Thêm ghi chú..."
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
          />
        </Field>

        <Field
          orientation="horizontal"
          className="rounded-2xl border bg-muted/30 p-4"
        >
          <FieldContent>
            <FieldLabel htmlFor="exclude-savings-account-from-reports">
              Không tính vào báo cáo
            </FieldLabel>
            <FieldDescription>
              Số dư và lãi của sổ này sẽ không ảnh hưởng đến báo cáo tài chính.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="exclude-savings-account-from-reports"
            checked={excludeFromReports}
            onCheckedChange={setExcludeFromReports}
            aria-label="Không tính sổ tiết kiệm này vào báo cáo"
          />
        </Field>
      </form>
    </ResponsiveDrawer>
  )
}
