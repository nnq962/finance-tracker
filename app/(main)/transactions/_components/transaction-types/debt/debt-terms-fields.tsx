"use client"

import { useState } from "react"

import {
  Field,
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
import { Item, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  return (
    <Tabs defaultValue="grouped">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="grouped">Mẫu 1</TabsTrigger>
        <TabsTrigger value="rows">Mẫu 2</TabsTrigger>
        <TabsTrigger value="cards">Mẫu 3</TabsTrigger>
      </TabsList>

      <TabsContent value="grouped">
        <GroupedLayout {...layoutProps} />
      </TabsContent>
      <TabsContent value="rows">
        <RowsLayout {...layoutProps} />
      </TabsContent>
      <TabsContent value="cards">
        <CardsLayout {...layoutProps} />
      </TabsContent>
    </Tabs>
  )
}

function GroupedLayout(props: LayoutProps) {
  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend variant="label">Lịch trình</FieldLegend>
        <div className="grid grid-cols-2 gap-3">
          <StartDateField {...props} idSuffix="grouped" />
          <DueDateField {...props} idSuffix="grouped" />
        </div>
      </FieldSet>

      <FieldSet>
        <FieldLegend variant="label">Điều khoản</FieldLegend>
        <FieldGroup>
          <ReminderField {...props} idSuffix="grouped" />
          <InterestTypeField {...props} idSuffix="grouped" />
          <InterestValueField {...props} idSuffix="grouped" />
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}

function RowsLayout(props: LayoutProps) {
  return (
    <FieldGroup>
      <StartDateField {...props} idSuffix="rows" orientation="horizontal" />
      <DueDateField {...props} idSuffix="rows" orientation="horizontal" />
      <ReminderField {...props} idSuffix="rows" orientation="horizontal" />
      <InterestTypeField
        {...props}
        idSuffix="rows"
        orientation="horizontal"
      />
      <InterestValueField
        {...props}
        idSuffix="rows"
        orientation="horizontal"
      />
    </FieldGroup>
  )
}

function CardsLayout(props: LayoutProps) {
  return (
    <ItemGroup>
      <Item variant="muted">
        <ItemHeader>
          <ItemTitle>Lịch trình</ItemTitle>
        </ItemHeader>
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <StartDateField {...props} idSuffix="cards" />
          <DueDateField {...props} idSuffix="cards" />
        </div>
      </Item>

      <Item variant="muted">
        <ReminderField {...props} idSuffix="cards" />
      </Item>

      <Item variant="muted">
        <FieldGroup>
          <InterestTypeField {...props} idSuffix="cards" />
          <InterestValueField {...props} idSuffix="cards" />
        </FieldGroup>
      </Item>
    </ItemGroup>
  )
}

function StartDateField({
  debtType,
  idSuffix,
  orientation,
  startDate,
  onStartDateChange,
}: LayoutProps & {
  idSuffix: string
  orientation?: "horizontal"
}) {
  const input = (
    <Input
      id={`debt-start-date-${idSuffix}`}
      name="debt-start-date"
      type="date"
      value={startDate}
      onChange={(event) => onStartDateChange(event.target.value)}
    />
  )

  return (
    <Field orientation={orientation}>
      <FieldLabel htmlFor={`debt-start-date-${idSuffix}`}>
        {debtType === "lend" ? "Ngày cho vay" : "Ngày đi vay"}
      </FieldLabel>
      {orientation ? <div className="w-1/2 shrink-0">{input}</div> : input}
    </Field>
  )
}

function DueDateField({
  dueDate,
  idSuffix,
  orientation,
  onDueDateChange,
}: LayoutProps & {
  idSuffix: string
  orientation?: "horizontal"
}) {
  const input = (
    <Input
      id={`debt-due-date-${idSuffix}`}
      name="debt-due-date"
      type="date"
      value={dueDate}
      onChange={(event) => onDueDateChange(event.target.value)}
    />
  )

  return (
    <Field orientation={orientation}>
      <FieldLabel htmlFor={`debt-due-date-${idSuffix}`}>Hạn trả</FieldLabel>
      {orientation ? <div className="w-1/2 shrink-0">{input}</div> : input}
    </Field>
  )
}

function ReminderField({
  idSuffix,
  orientation,
  reminder,
  onReminderChange,
}: LayoutProps & {
  idSuffix: string
  orientation?: "horizontal"
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
    <Field orientation={orientation}>
      <FieldLabel htmlFor={`debt-reminder-${idSuffix}`}>
        Nhắc trước
      </FieldLabel>
      {orientation ? <div className="w-1/2 shrink-0">{select}</div> : select}
    </Field>
  )
}

function InterestTypeField({
  idSuffix,
  interestType,
  orientation,
  onInterestTypeChange,
}: LayoutProps & {
  idSuffix: string
  orientation?: "horizontal"
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
    <Field orientation={orientation}>
      <FieldLabel htmlFor={`debt-interest-type-${idSuffix}`}>
        Lãi suất
      </FieldLabel>
      {orientation ? <div className="w-1/2 shrink-0">{select}</div> : select}
    </Field>
  )
}

function InterestValueField({
  idSuffix,
  interestType,
  interestValue,
  orientation,
  onInterestValueChange,
}: LayoutProps & {
  idSuffix: string
  orientation?: "horizontal"
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
    <Field orientation={orientation}>
      <FieldLabel htmlFor={`debt-interest-value-${idSuffix}`}>
        {isPercentage ? "Lãi suất theo năm" : "Tiền lãi cố định"}
      </FieldLabel>
      {orientation ? <div className="w-1/2 shrink-0">{input}</div> : input}
    </Field>
  )
}
