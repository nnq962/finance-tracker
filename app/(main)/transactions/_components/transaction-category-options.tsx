"use client"

import { useState } from "react"
import { ChevronRightIcon, type LucideIcon } from "lucide-react"

import { PageSection } from "@/components/page-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type TransactionCategory = {
  value: string
  label: string
  icon: LucideIcon
}

export function TransactionCategoryOptions({
  categories,
}: {
  categories: readonly TransactionCategory[]
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.value ?? ""
  )

  return (
    <PageSection>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Hạng mục
        </h2>
        <Button type="button" variant="ghost" size="sm" className="h-5">
          Xem tất cả
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </div>

      <div
        role="group"
        aria-label="Chọn hạng mục"
        className="grid grid-cols-4 gap-2"
      >
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.value

          return (
            <Card
              key={category.value}
              size="sm"
              className={cn(
                "h-20 min-w-0 gap-0 rounded-2xl py-0 transition-colors",
                isSelected && "border-2 border-primary dark:border-primary"
              )}
            >
              <CardContent className="h-full p-0">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  className={cn(
                    "flex size-full min-w-0 flex-col items-center justify-center gap-2 px-2 py-1 text-muted-foreground transition-colors duration-200 outline-none hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:ring-inset",
                    isSelected && "text-foreground"
                  )}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full border border-transparent bg-transparent text-foreground transition-[color,background-color,border-color] duration-200",
                      isSelected &&
                        "border-primary bg-primary text-primary-foreground"
                    )}
                  >
                    <Icon
                      className="size-5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="block max-w-full truncate text-xs leading-4 font-medium">
                    {category.label}
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
