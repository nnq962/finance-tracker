"use client"

import { useState } from "react"
import { Label, Pie, PieChart } from "recharts"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { formatCurrency } from "@/lib/currency"

import { getAccountGroupBalance, type AccountGroup } from "./mock-accounts"

const chartConfig = {
  spending: { label: "Chi tiêu", color: "var(--chart-1)" },
  savings: { label: "Tiết kiệm", color: "var(--chart-2)" },
} satisfies ChartConfig

const compactNumberFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 1,
})

function formatCompactCurrency(value: number) {
  const absoluteValue = Math.abs(value)

  if (absoluteValue >= 1_000_000_000) {
    return `${compactNumberFormatter.format(value / 1_000_000_000)}tỷ`
  }

  if (absoluteValue >= 1_000_000) {
    return `${compactNumberFormatter.format(value / 1_000_000)}tr`
  }

  if (absoluteValue >= 1_000) {
    return `${compactNumberFormatter.format(value / 1_000)}k`
  }

  return formatCurrency(value)
}

export function AccountSummaryCard({ groups }: { groups: AccountGroup[] }) {
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null)
  const groupBalances = groups.map((group, index) => ({
    ...group,
    balance: getAccountGroupBalance(group),
    fill: `var(--chart-${index + 1})`,
  }))
  const totalBalance = groupBalances.reduce(
    (total, group) => total + group.balance,
    0
  )
  const accountCount = groups.reduce(
    (total, group) => total + group.accounts.length,
    0
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng tài sản</CardTitle>
        <CardAction>
          <Badge variant="secondary">{accountCount} tài khoản</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] items-center gap-5">
          <ChartContainer
            config={chartConfig}
            className="aspect-square size-32 shrink-0 cursor-pointer"
            initialDimension={{ width: 128, height: 128 }}
          >
            <PieChart accessibilityLayer>
              <ChartTooltip
                key={selectedSlice ?? "hover"}
                active={selectedSlice === null ? undefined : true}
                defaultIndex={selectedSlice ?? undefined}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, _name, item) => (
                      <div className="flex min-w-36 items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="size-2.5 shrink-0 rounded-sm"
                          style={{ backgroundColor: item.payload.fill }}
                        />
                        <span className="whitespace-nowrap text-muted-foreground">
                          {item.payload.name}
                        </span>
                        <span className="ml-auto whitespace-nowrap font-mono font-medium tabular-nums">
                          {formatCurrency(Number(value))}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Pie
                data={groupBalances}
                dataKey="balance"
                nameKey="id"
                innerRadius={40}
                outerRadius={58}
                strokeWidth={4}
                onClick={(_data, index) => {
                  setSelectedSlice((current) => current === index ? null : index)
                }}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                      return null
                    }

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        className="fill-foreground"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          dy="0.35em"
                          className="text-lg font-semibold tabular-nums"
                        >
                          {formatCompactCurrency(totalBalance)}
                        </tspan>
                      </text>
                    )
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="min-w-0">
            <ItemGroup>
              {groupBalances.map((group) => {
                return (
                  <Item key={group.id} variant="muted" size="xs">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: group.fill }}
                    />
                    <ItemContent className="min-w-0">
                      <ItemTitle>{group.name}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <span className="whitespace-nowrap text-sm font-medium tabular-nums">
                        {formatCompactCurrency(group.balance)}
                      </span>
                    </ItemActions>
                  </Item>
                )
              })}
            </ItemGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
