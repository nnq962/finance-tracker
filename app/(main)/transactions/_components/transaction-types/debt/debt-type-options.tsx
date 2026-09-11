import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CheckIcon,
  Redo2Icon,
  Undo2Icon,
} from "lucide-react"

import { PageSection } from "@/components/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const debtTypes = [
  {
    value: "lend",
    label: "Cho vay",
    description: "− Tiền ra",
    flow: "out",
    icon: ArrowUpRightIcon,
  },
  {
    value: "borrow",
    label: "Đi vay",
    description: "+ Tiền vào",
    flow: "in",
    icon: ArrowDownLeftIcon,
  },
  {
    value: "repay",
    label: "Trả nợ",
    description: "− Tiền ra",
    flow: "out",
    icon: Redo2Icon,
  },
  {
    value: "collect",
    label: "Thu nợ",
    description: "+ Tiền vào",
    flow: "in",
    icon: Undo2Icon,
  },
] as const

export type DebtType = (typeof debtTypes)[number]["value"]

type DebtTypeOptionsProps = {
  value: DebtType
  onValueChange: (value: DebtType) => void
}

export function DebtTypeOptions({
  value,
  onValueChange,
}: DebtTypeOptionsProps) {
  return (
    <PageSection>
      <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        Loại giao dịch
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {debtTypes.map((type) => {
          const Icon = type.icon
          const isSelected = value === type.value

          return (
            <Card
              key={type.value}
              size="sm"
              className={cn(
                "h-20 min-w-0 gap-0 py-0 transition-colors",
                isSelected && "border-2 border-primary dark:border-primary"
              )}
            >
              <CardContent className="h-full p-0">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  className={cn(
                    "flex size-full min-w-0 items-center gap-3 px-4 py-3 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:ring-inset",
                    isSelected && "px-[15px]"
                  )}
                  onClick={() => onValueChange(type.value)}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted transition-colors",
                      isSelected && "bg-primary text-primary-foreground"
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {type.label}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block truncate text-xs font-medium",
                        type.flow === "in"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {type.description}
                    </span>
                  </span>
                  <span className="flex w-4 shrink-0 justify-end">
                    {isSelected && <CheckIcon className="size-4" />}
                  </span>
                </button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </PageSection>
  )
}
