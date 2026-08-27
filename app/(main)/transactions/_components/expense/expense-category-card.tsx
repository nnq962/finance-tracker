import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import {
  expenseCategories,
  isExpenseCategory,
  type ExpenseCategory,
} from "../../_config/expense-categories"

type ExpenseCategoryCardProps = {
  value: ExpenseCategory | null
  onValueChange: (value: ExpenseCategory) => void
}

export function ExpenseCategoryCard({
  value,
  onValueChange,
}: ExpenseCategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hạng mục</CardTitle>
      </CardHeader>

      <CardContent>
        <ToggleGroup
          value={value ? [value] : []}
          onValueChange={(values) => {
            const nextValue = values[0]

            if (nextValue && isExpenseCategory(nextValue)) {
              onValueChange(nextValue)
            }
          }}
          aria-label="Chọn hạng mục chi tiêu"
          className="grid w-full grid-cols-4 gap-2 sm:gap-3"
        >
          {expenseCategories.map((category) => {
            const Icon = category.icon

            return (
              <ToggleGroupItem
                key={category.value}
                value={category.value}
                variant="outline"
                aria-label={category.label}
                className="h-20 min-w-0 flex-col gap-2 bg-muted/40 px-1 text-muted-foreground hover:bg-muted aria-pressed:border-[#FF5B7F] aria-pressed:bg-[#FF5B7F]/[0.07] aria-pressed:text-[#FF5B7F] sm:h-24"
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="w-full truncate text-[11px] sm:text-xs">
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
