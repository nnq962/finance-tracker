"use client"

import { useState } from "react"
import { addDays, addMonths, format, parseISO } from "date-fns"
import { vi } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
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
import { formatCurrencyInput } from "@/lib/currency"

import type { DebtType } from "./debt-type-options"

const reminderOptions = [
  { label: "Không nhắc", value: "none" },
  { label: "Trước 1 ngày", value: "1-day" },
  { label: "Trước 3 ngày", value: "3-days" },
  { label: "Trước 7 ngày", value: "7-days" },
]

const interestOptions = [
  { label: "Không tính lãi", value: "none" },
  { label: "Theo phần trăm", value: "percentage" },
  { label: "Số tiền cố định", value: "fixed" },
]

type InterestType = (typeof interestOptions)[number]["value"]

type DebtTermsFieldsProps = {
  debtType: Extract<DebtType, "lend" | "borrow">
}

type LayoutProps = {
  debtType: DebtTermsFieldsProps["debtType"]
  dueDate: string
  interestType: InterestType
  interestValue: string
  reminder: string
  startDate: string
  onDueDateChange: (value: string) => void
  onInterestTypeChange: (value: InterestType) => void
  onInterestValueChange: (value: string) => void
  onReminderChange: (value: string) => void
  onStartDateChange: (value: string) => void
}

function getTodayValue() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function DebtTermsFields({ debtType }: DebtTermsFieldsProps) {
  const [startDate, setStartDate] = useState(getTodayValue)
  const [dueDate, setDueDate] = useState("")
  const [reminder, setReminder] = useState("none")
  const [interestType, setInterestType] = useState<InterestType>("none")
  const [interestValue, setInterestValue] = useState("")

  const layoutProps: LayoutProps = {
    debtType,
    dueDate,
    interestType,
    interestValue,
    reminder,
    startDate,
    onDueDateChange: setDueDate,
    onInterestTypeChange: (value) => {
      setInterestType(value)
      setInterestValue("")
    },
    onInterestValueChange: setInterestValue,
    onReminderChange: setReminder,
    onStartDateChange: setStartDate,
  }

  return <DebtTermsLayout {...layoutProps} />
}

function DebtTermsLayout(props: LayoutProps) {
  return (
    <div className="min-w-0 space-y-4">
      <DebtDateRangeField {...props} />
      <QuickDueDates {...props} />
      <FieldGroup>
        <div className="grid min-w-0 grid-cols-2 gap-3">
          <ReminderField {...props} idSuffix="rows" />
          <InterestTypeField {...props} idSuffix="rows" />
        </div>
        <InterestValueField {...props} idSuffix="rows" />
      </FieldGroup>
    </div>
  )
}

function DebtDateRangeField({
  debtType,
  startDate,
  dueDate,
  onStartDateChange,
  onDueDateChange,
}: LayoutProps) {
  const isMobile = useIsMobile()
  const range: DateRange = {
    from: startDate ? parseISO(startDate) : undefined,
    to: dueDate ? parseISO(dueDate) : undefined,
  }

  function selectRange(nextRange: DateRange | undefined) {
    onStartDateChange(nextRange?.from ? format(nextRange.from, "yyyy-MM-dd") : "")
    onDueDateChange(nextRange?.to ? format(nextRange.to, "yyyy-MM-dd") : "")
  }

  return (
    <Field className="w-full min-w-0">
      <FieldLabel htmlFor="debt-date-range">
        {debtType === "lend" ? "Ngày cho vay" : "Ngày đi vay"} – Hạn trả
      </FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id="debt-date-range"
              type="button"
              variant="outline"
              className="w-full min-w-0 justify-start px-2.5 font-normal"
            >
              <CalendarIcon data-icon="inline-start" aria-hidden="true" />
              {range.from ? (
                range.to ? (
                  <>
                    {format(range.from, "dd/MM/yyyy")} -{" "}
                    {format(range.to, "dd/MM/yyyy")}
                  </>
                ) : (
                  format(range.from, "dd/MM/yyyy")
                )
              ) : (
                <span>Chọn khoảng ngày</span>
              )}
            </Button>
          }
        />
        <PopoverContent align="start" className="w-auto p-0" aria-label="Chọn ngày bắt đầu và hạn trả">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={range.from}
            selected={range}
            onSelect={selectRange}
            numberOfMonths={isMobile ? 1 : 2}
            locale={vi}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

function QuickDueDates({ startDate, dueDate, onDueDateChange }: LayoutProps) {
  const presets = [
    { label: "7 ngày", days: 7 },
    { label: "14 ngày", days: 14 },
    { label: "30 ngày", days: 30 },
    { label: "2 tháng", months: 2 },
    { label: "3 tháng", months: 3 },
    { label: "6 tháng", months: 6 },
  ]

  function dateAfter(preset: (typeof presets)[number]) {
    if (!startDate) return ""
    const date = parseISO(startDate)
    if (Number.isNaN(date.getTime())) return ""
    const due = preset.months
      ? addMonths(date, preset.months)
      : addDays(date, preset.days ?? 0)
    return format(due, "yyyy-MM-dd")
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn nhanh hạn trả">
        {presets.map((preset) => {
          const date = dateAfter(preset)
          const selected = Boolean(date) && dueDate === date
          return (
            <Button key={preset.label} type="button" variant={selected ? "secondary" : "outline"}
              disabled={!date} aria-pressed={selected} onClick={() => onDueDateChange(date)}>
              {preset.label}
            </Button>
          )
        })}
        <Button type="button" variant={!dueDate ? "secondary" : "outline"}
          aria-pressed={!dueDate} onClick={() => onDueDateChange("")}>
          Chưa hẹn
        </Button>
      </div>
    </div>
  )
}

function ReminderField({
  idSuffix,
  reminder,
  onReminderChange,
}: LayoutProps & {
  idSuffix: string
}) {
  const select = (
    <Select
      items={reminderOptions}
      value={reminder}
      onValueChange={(value) => value && onReminderChange(value)}
    >
      <SelectTrigger
        id={`debt-reminder-${idSuffix}`}
        className="w-full"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {reminderOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

  return (
    <Field className="min-w-0">
      <FieldLabel htmlFor={`debt-reminder-${idSuffix}`}>
        Nhắc trước
      </FieldLabel>
      {select}
    </Field>
  )
}

function InterestTypeField({
  idSuffix,
  interestType,
  onInterestTypeChange,
}: LayoutProps & {
  idSuffix: string
}) {
  const select = (
    <Select
      items={interestOptions}
      value={interestType}
      onValueChange={(value) =>
        value && onInterestTypeChange(value as InterestType)
      }
    >
      <SelectTrigger
        id={`debt-interest-type-${idSuffix}`}
        className="w-full"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {interestOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

  return (
    <Field className="min-w-0">
      <FieldLabel htmlFor={`debt-interest-type-${idSuffix}`}>
        Lãi suất
      </FieldLabel>
      {select}
    </Field>
  )
}

function InterestValueField({
  idSuffix,
  interestType,
  interestValue,
  onInterestValueChange,
}: LayoutProps & {
  idSuffix: string
}) {
  if (interestType === "none") return null

  const isPercentage = interestType === "percentage"
  const input = (
    <InputGroup>
      <InputGroupInput
        id={`debt-interest-value-${idSuffix}`}
        name="debt-interest-value"
        inputMode={isPercentage ? "decimal" : "numeric"}
        placeholder="0"
        value={interestValue}
        onChange={(event) =>
          onInterestValueChange(
            isPercentage
              ? event.target.value.replace(/[^\d.,]/g, "")
              : formatCurrencyInput(event.target.value)
          )
        }
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>{isPercentage ? "% / năm" : "đ"}</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )

  return (
    <Field className="min-w-0">
      <FieldLabel htmlFor={`debt-interest-value-${idSuffix}`}>
        {isPercentage ? "Lãi suất theo năm" : "Tiền lãi cố định"}
      </FieldLabel>
      {input}
    </Field>
  )
}
