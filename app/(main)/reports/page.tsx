"use client"

import * as React from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
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

const timeRanges = [
  { label: "7 ngày qua", value: "7d" },
  { label: "30 ngày qua", value: "30d" },
  { label: "Tháng này", value: "this-month" },
  { label: "Năm nay", value: "this-year" },
]

export default function ReportsPage() {
  const [date, setDate] = React.useState<Date>()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Báo cáo</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Phân tích dòng tiền và xu hướng chi tiêu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  className="w-[180px] justify-start font-normal"
                >
                  {date ? format(date, "P", { locale: vi }) : <span>Chọn ngày</span>}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>

          {/* Select khoảng thời gian */}
          <Select defaultValue="30d">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {timeRanges.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Drawer */}
          <Drawer swipeDirection="down">
            <DrawerTrigger render={<Button variant="secondary">Chi tiết mục tiêu</Button>} />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4">
                <div className="size-full rounded-2xl bg-muted" />
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button>Close</Button>} />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}
