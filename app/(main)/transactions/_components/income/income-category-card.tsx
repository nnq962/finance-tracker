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
    <Card className="py-0">
      <CardContent className="p-4">
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
                variant="default"
                aria-label={category.label}
                className="h-16 min-w-0 flex-col gap-2 bg-transparent px-1 text-muted-foreground hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0 aria-pressed:bg-transparent aria-pressed:text-emerald-600 data-[state=on]:bg-transparent sm:h-20 dark:aria-pressed:text-emerald-400"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-focus-visible/toggle:ring-3 group-focus-visible/toggle:ring-ring/30 group-aria-pressed/toggle:bg-emerald-500/[0.07] dark:group-aria-pressed/toggle:bg-emerald-400/[0.07]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="w-full truncate text-sm text-foreground group-aria-pressed/toggle:text-emerald-600 dark:group-aria-pressed/toggle:text-emerald-400">
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
