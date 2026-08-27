import {
  differenceInCalendarDays,
  format,
  isValid,
} from "date-fns"
import { vi } from "date-fns/locale"

export type FormattedDateTime = {
  label: string
  time: string
}

export function combineDateAndTime(date: Date, time: string) {
  const combinedDate = new Date(date)
  const timeParts = time.match(/^(\d{2}):(\d{2})$/)

  if (!timeParts) return combinedDate

  const hours = Number(timeParts[1])
  const minutes = Number(timeParts[2])

  if (hours > 23 || minutes > 59) return combinedDate

  combinedDate.setHours(hours, minutes, 0, 0)

  return combinedDate
}

export function formatDateTime(date: Date): FormattedDateTime {
  if (!isValid(date)) {
    throw new RangeError("Invalid date")
  }

  const now = new Date()
  const calendarDayDifference = differenceInCalendarDays(date, now)
  let label: string

  if (calendarDayDifference === 0) {
    label = "Hôm nay"
  } else if (calendarDayDifference === -1) {
    label = "Hôm qua"
  } else if (calendarDayDifference === 1) {
    label = "Ngày mai"
  } else {
    label = format(date, "dd/MM", { locale: vi })
  }

  return {
    label,
    time: format(date, "HH:mm", { locale: vi }),
  }
}
