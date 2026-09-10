"use client"

import { useCallback, useEffect, useRef } from "react"
import {
  ArrowDownLeftIcon,
  ArrowLeftRightIcon,
  ArrowUpRightIcon,
  HandshakeIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const transactionTypes = [
  {
    value: "expense",
    label: "Chi tiền",
    shortLabel: "Chi",
    icon: ArrowUpRightIcon,
    iconClassName: "text-rose-500",
  },
  {
    value: "income",
    label: "Thu tiền",
    shortLabel: "Thu",
    icon: ArrowDownLeftIcon,
    iconClassName: "text-emerald-500",
  },
  {
    value: "transfer",
    label: "Chuyển tiền",
    shortLabel: "Chuyển",
    icon: ArrowLeftRightIcon,
    iconClassName: "text-blue-500",
  },
  {
    value: "debt",
    label: "Vay nợ",
    shortLabel: "Vay nợ",
    icon: HandshakeIcon,
    iconClassName: "text-amber-500",
  },
] as const

export type TransactionType = (typeof transactionTypes)[number]["value"]

type TransactionTypeTabsProps = {
  value: TransactionType
  onValueChange: (value: TransactionType) => void
}

export function TransactionTypeTabs({
  value,
  onValueChange,
}: TransactionTypeTabsProps) {
  const pillRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const initializedRef = useRef(false)
  const activeIndex = transactionTypes.findIndex((type) => type.value === value)

  const movePill = useCallback((index: number, animate: boolean) => {
    const tab = tabRefs.current[index]
    const pill = pillRef.current

    if (!tab || !pill) return

    const move = () => {
      pill.style.transform = `translate3d(${tab.offsetLeft}px, 0, 0)`
      pill.style.width = `${tab.offsetWidth}px`
      pill.style.opacity = "1"
    }

    if (animate) {
      move()
      return
    }

    const previousTransition = pill.style.transition
    pill.style.transition = "none"
    move()
    void pill.offsetWidth
    pill.style.transition = previousTransition
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      movePill(activeIndex, initializedRef.current)
      initializedRef.current = true
    })
    const handleResize = () => movePill(activeIndex, false)

    window.addEventListener("resize", handleResize)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", handleResize)
    }
  }, [activeIndex, movePill])

  return (
    <div
      role="group"
      aria-label="Loại giao dịch"
      className="relative grid w-full grid-cols-4 rounded-full bg-muted p-1 md:max-w-md"
    >
      <span
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-0 w-0 rounded-full bg-foreground opacity-0 shadow-sm transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none"
      />

      {transactionTypes.map((type, index) => {
        const Icon = type.icon
        const isSelected = value === type.value

        return (
          <button
            key={type.value}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            type="button"
            aria-pressed={isSelected}
            aria-label={type.label}
            className="group relative z-10 inline-flex h-11 min-w-0 items-center justify-center gap-1 rounded-full px-1 text-xs font-medium text-muted-foreground transition-[color,transform] duration-200 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 active:scale-95 aria-pressed:text-background"
            onClick={() => {
              movePill(index, true)
              onValueChange(type.value)
            }}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={2.25}
              className={cn(
                "size-3.5 shrink-0 transition-colors duration-200 group-aria-pressed:text-background",
                type.iconClassName
              )}
            />
            <span className="truncate">{type.shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
