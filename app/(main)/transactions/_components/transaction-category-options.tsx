"use client"

import { useState } from "react"
import { ChevronRightIcon, type LucideIcon } from "lucide-react"

import { PageSection } from "@/components/page-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

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
        <h2 className="font-heading text-base font-medium">Hạng mục</h2>
        <Button type="button" variant="ghost" size="sm">
          Xem tất cả
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </div>

      <Card>
        <CardContent>
          <ItemGroup className="grid grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.value

              return (
                <Item
                  key={category.value}
                  render={<button type="button" />}
                  variant={isSelected ? "muted" : "default"}
                  size="sm"
                  aria-pressed={isSelected}
                  className="flex-col justify-center gap-2"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <ItemMedia variant="icon">
                    <Icon />
                  </ItemMedia>
                  <ItemContent className="items-center">
                    <ItemTitle>{category.label}</ItemTitle>
                  </ItemContent>
                </Item>
              )
            })}
          </ItemGroup>
        </CardContent>
      </Card>
    </PageSection>
  )
}
