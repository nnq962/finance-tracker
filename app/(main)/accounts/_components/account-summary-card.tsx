"use client"

import { Pie, PieChart } from "recharts"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/currency"

import { getAccountGroupBalance, type AccountGroup } from "./mock-accounts"

const chartConfig = {
  spending: {
    label: "Chi tiêu",
    color: "var(--chart-1)",
  },
  savings: {
    label: "Tiết kiệm",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function AccountSummaryCard({ groups }: { groups: AccountGroup[] }) {
  const groupBalances = groups.map((group) => ({
    ...group,
    balance: getAccountGroupBalance(group),
  }))
  const totalBalance = groupBalances.reduce(
    (total, group) => total + group.balance,
    0
  )
  const accountCount = groups.reduce(
    (total, group) => total + group.accounts.length,
    0
  )
  const chartData = groupBalances.map((group) => ({
    accountType: group.id,
    balance: group.balance,
    fill: `var(--color-${group.id})`,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng số dư</CardTitle>
        <CardAction>
          <Badge variant="secondary">{accountCount} tài khoản</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <p className="font-heading text-2xl font-semibold tracking-tight tabular-nums sm:text-4xl">
            {formatCurrency(totalBalance)}
          </p>
          <ChartContainer
            config={chartConfig}
            className="aspect-square size-28"
            initialDimension={{ width: 112, height: 112 }}
          >
            <PieChart accessibilityLayer>
              <Pie
                data={chartData}
                dataKey="balance"
                nameKey="accountType"
                innerRadius={32}
                outerRadius={50}
                strokeWidth={4}
              />
            </PieChart>
          </ChartContainer>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          {groupBalances.map((group) => {
            const percentage = totalBalance
              ? Math.round((group.balance / totalBalance) * 100)
              : 0
            const color =
              group.id === "spending" ? "var(--chart-1)" : "var(--chart-2)"

            return (
              <div key={group.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {group.name}
                  </span>
                  <div className="ml-auto">
                    <Badge variant="outline">{percentage}%</Badge>
                  </div>
                </div>
                <p className="font-medium tabular-nums">
                  {formatCurrency(group.balance)}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
