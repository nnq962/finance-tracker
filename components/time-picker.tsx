"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
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

type TimeOption = {
  label: string
  value: number
}

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, hour) => ({
  label: String(hour).padStart(2, "0"),
  value: hour,
}))

export type TimePickerProps = {
  id?: string
  label?: React.ReactNode
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (time: string) => void
  minuteStep?: number
  displayValue?: React.ReactNode
  popoverSide?: React.ComponentProps<typeof PopoverContent>["side"]
  disabled?: boolean
  variant?: "default" | "inline"
  className?: string
}

function parseTime(value: string | undefined) {
  const match = value?.match(/^(\d{2}):(\d{2})$/)

  if (!match) return null

  const hour = Number(match[1])
  const minute = Number(match[2])

  if (hour > 23 || minute > 59) return null

  return { hour, minute }
}

function formatTime(hour: number, minute: number) {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

function TimeSelect({
  id,
  ariaLabel,
  placeholder,
  value,
  options,
  onValueChange,
}: {
  id: string
  ariaLabel: string
  placeholder: string
  value: number | null
  options: TimeOption[]
  onValueChange: (value: number) => void
}) {
  const items = [{ label: placeholder, value: null }, ...options]

  return (
    <Select
      items={items}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue === null) return
        onValueChange(nextValue)
      }}
    >
      <SelectTrigger id={id} aria-label={ariaLabel} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        align="center"
        alignItemWithTrigger={false}
        className="min-w-20 overflow-y-hidden [&>[data-slot=select-scroll-down-button]]:hidden [&>[data-slot=select-scroll-up-button]]:hidden [&>[role=listbox]]:max-h-64 [&>[role=listbox]]:overflow-y-auto"
      >
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function TimePicker(props: TimePickerProps) {
  const {
    id,
    label = "Time",
    placeholder = "Select time",
    value,
    defaultValue,
    onValueChange,
    minuteStep = 1,
    displayValue,
    popoverSide = "bottom",
    disabled = false,
    variant = "default",
    className,
  } = props
  const generatedId = React.useId()
  const fieldId = id ?? generatedId
  const isControlled = Object.prototype.hasOwnProperty.call(props, "value")
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selectedValue = isControlled ? value : internalValue
  const selectedTime = parseTime(selectedValue)
  const [open, setOpen] = React.useState(false)
  const normalizedMinuteStep = Math.min(59, Math.max(1, Math.floor(minuteStep)))
  const minuteOptions = React.useMemo(
    () =>
      Array.from(
        { length: Math.ceil(60 / normalizedMinuteStep) },
        (_, index) => {
          const minute = index * normalizedMinuteStep
          return {
            label: String(minute).padStart(2, "0"),
            value: minute,
          }
        }
      ),
    [normalizedMinuteStep]
  )

  function updateValue(hour: number, minute: number) {
    const nextValue = formatTime(hour, minute)

    if (!isControlled) {
      setInternalValue(nextValue)
    }

    onValueChange?.(nextValue)
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
                  : "justify-start tabular-nums"
              )}
            >
              {displayValue ??
                (selectedTime
                  ? formatTime(selectedTime.hour, selectedTime.minute)
                  : placeholder)}
            </Button>
          }
        />
        <PopoverContent
          side={popoverSide}
          className="w-56 p-4 text-sm"
          align={variant === "inline" ? "end" : "center"}
        >
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor={`${fieldId}-hour`}>Giờ</FieldLabel>
              <TimeSelect
                id={`${fieldId}-hour`}
                ariaLabel="Choose the Hour"
                placeholder="HH"
                value={selectedTime?.hour ?? null}
                options={HOUR_OPTIONS}
                onValueChange={(hour) =>
                  updateValue(hour, selectedTime?.minute ?? 0)
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${fieldId}-minute`}>Phút</FieldLabel>
              <TimeSelect
                id={`${fieldId}-minute`}
                ariaLabel="Choose the Minute"
                placeholder="MM"
                value={selectedTime?.minute ?? null}
                options={minuteOptions}
                onValueChange={(minute) =>
                  updateValue(selectedTime?.hour ?? 0, minute)
                }
              />
            </Field>
          </div>
          <Button size="sm" className="w-full" onClick={() => setOpen(false)}>
            Xong
          </Button>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
