import { Card, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import {
  incomeCategories,
  isIncomeCategory,
  type IncomeCategory,
} from "../../_config/income-categories"

type IncomeCategoryCardProps = {
  value: IncomeCategory | null
  onValueChange: (value: IncomeCategory) => void
}

export function IncomeCategoryCard({
  value,
  onValueChange,
}: IncomeCategoryCardProps) {
  return (
    <Card>
      <CardContent>
        <ToggleGroup
          value={value ? [value] : []}
          onValueChange={(values) => {
            const nextValue = values[0]

            if (nextValue && isIncomeCategory(nextValue)) {
              onValueChange(nextValue)
            }
          }}
          aria-label="Chọn hạng mục thu tiền"
          className="grid w-full grid-cols-4 gap-2 sm:gap-3"
        >
          {incomeCategories.map((category) => {
            const Icon = category.icon

            return (
              <ToggleGroupItem
                key={category.value}
                value={category.value}
                variant="outline"
                aria-label={category.label}
                className="h-16 min-w-0 flex-col gap-2 bg-muted/40 px-1 text-muted-foreground hover:bg-muted aria-pressed:border-emerald-500 aria-pressed:bg-emerald-500/[0.07] aria-pressed:text-emerald-600 sm:h-20 dark:aria-pressed:border-emerald-400 dark:aria-pressed:bg-emerald-400/[0.07] dark:aria-pressed:text-emerald-400"
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="w-full truncate text-[11px] text-foreground group-aria-pressed/toggle:text-emerald-600 sm:text-xs dark:group-aria-pressed/toggle:text-emerald-400">
                  {category.label}
                </span>
              </ToggleGroupItem>
            )
          })}
        </ToggleGroup>
      </CardContent>
    </Card>
  )
}
