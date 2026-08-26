"use client"

import * as React from "react"
import { format } from "date-fns"
import type { DropdownProps } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const DEFAULT_START_MONTH = new Date(2000, 0, 1)

export type DatePickerProps = {
  id?: string
  label?: React.ReactNode
  placeholder?: string
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  startMonth?: Date
  dateFormat?: string
  disabled?: boolean
  variant?: "default" | "inline"
  popoverAlign?: "start" | "center" | "end"
  className?: string
}

function CalendarDropdown({
  options,
  value,
  onChange,
  disabled,
  "aria-label": ariaLabel,
}: DropdownProps) {
  const selectedValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : null
  const items =
    options?.map((option) => ({
      label: option.label,
      value: option.value,
    })) ?? []

  return (
    <Select
      items={items}
      value={selectedValue}
      disabled={disabled}
      onValueChange={(nextValue) => {
        if (nextValue === null) return

        onChange?.({
          target: { value: String(nextValue) },
        } as React.ChangeEvent<HTMLSelectElement>)
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={ariaLabel}
        className="relative z-20 h-auto min-w-0 gap-1 rounded-(--cell-radius) border-0 bg-transparent px-0 py-0 text-sm font-medium shadow-none hover:bg-transparent focus-visible:border-0 focus-visible:ring-0 data-[size=sm]:h-auto"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        align="center"
        alignItemWithTrigger={false}
        className="min-w-24 overflow-y-hidden [&>[data-slot=select-scroll-down-button]]:hidden [&>[data-slot=select-scroll-up-button]]:hidden [&>[role=listbox]]:max-h-(--available-height) [&>[role=listbox]]:overflow-y-auto"
      >
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function DatePicker(props: DatePickerProps) {
  const {
    id,
    label = "Date of birth",
    placeholder = "Select date",
    value,
    defaultValue,
    onValueChange,
    startMonth = DEFAULT_START_MONTH,
    dateFormat = "dd/MM/yyyy",
    disabled = false,
    variant = "default",
    popoverAlign,
    className,
  } = props
  const generatedId = React.useId()
  const fieldId = id ?? generatedId
  const isControlled = Object.prototype.hasOwnProperty.call(props, "value")
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selectedDate = isControlled ? value : internalValue
  const [open, setOpen] = React.useState(false)

  function handleSelect(date: Date | undefined) {
    if (!isControlled) {
      setInternalValue(date)
    }

    onValueChange?.(date)
    setOpen(false)
  }

  return (
    <Field
      className={cn(
        variant === "inline" ? "w-full min-w-0" : "w-44",
        className
      )}
    >
      {label ? <FieldLabel htmlFor={fieldId}>{label}</FieldLabel> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant={variant === "inline" ? "ghost" : "outline"}
              id={fieldId}
              disabled={disabled}
              className={cn(
                "font-normal",
                variant === "inline"
                  ? "h-auto min-h-0 w-full justify-end rounded-none border-0 bg-transparent px-0 py-0 text-right text-base shadow-none hover:bg-transparent aria-expanded:bg-transparent focus-visible:border-transparent focus-visible:ring-0 dark:hover:bg-transparent"
                  : "justify-start"
              )}
            >
              {selectedDate
                ? format(selectedDate, dateFormat)
                : placeholder}
            </Button>
          }
        />
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align={popoverAlign ?? (variant === "inline" ? "start" : "center")}
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            defaultMonth={selectedDate}
            captionLayout="dropdown"
            startMonth={startMonth}
            components={{ Dropdown: CalendarDropdown }}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
