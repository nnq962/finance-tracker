"use client"

import { useState } from "react"
import { ChevronRightIcon, type LucideIcon } from "lucide-react"

import { PageSection } from "@/components/page-shell"
import { Button } from "@/components/ui/button"
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
        <Button type="button" variant="ghost" size="sm" className="h-11">
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
            <button
              key={category.value}
              type="button"
              aria-pressed={isSelected}
              className={cn(
                "flex h-20 min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-transparent bg-card px-2 py-1 text-muted-foreground transition-[color,background-color,border-color,transform] duration-200 outline-none hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40 active:scale-[0.97]",
                isSelected &&
                  "border-primary bg-card text-foreground"
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
                <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="block max-w-full truncate text-xs leading-4 font-medium">
                {category.label}
              </span>
            </button>
          )
        })}
      </div>
    </PageSection>
  )
}
