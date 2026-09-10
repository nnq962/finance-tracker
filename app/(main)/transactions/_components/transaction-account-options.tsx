"use client"

import { useState } from "react"
import {
  BanknoteIcon,
  CreditCardIcon,
  LandmarkIcon,
  SmartphoneIcon,
} from "lucide-react"

import { PageSection } from "@/components/page-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/currency"

const accounts = [
  {
    value: "cash",
    name: "Tiền mặt",
    balance: 3_250_000,
    icon: BanknoteIcon,
  },
  {
    value: "mb-bank",
    name: "MB Bank",
    balance: 12_500_000,
    icon: LandmarkIcon,
  },
  {
    value: "momo",
    name: "Ví MoMo",
    balance: 1_800_000,
    icon: SmartphoneIcon,
  },
  {
    value: "techcombank",
    name: "Techcombank",
    balance: 24_000_000,
    icon: CreditCardIcon,
  },
] as const

type AccountId = (typeof accounts)[number]["value"]

export function TransactionAccountOptions() {
  const [selectedAccount, setSelectedAccount] = useState<AccountId>("cash")
  const activeAccount =
    accounts.find((account) => account.value === selectedAccount) ?? accounts[0]
  const ActiveIcon = activeAccount.icon

  return (
    <PageSection>
      <h2 className="font-heading text-base font-medium">Tài khoản</h2>

      <Card size="sm">
        <CardContent className="space-y-4">
          <Item className="flex-nowrap border-transparent p-0">
            <ItemMedia
              variant="icon"
              className="rounded-2xl bg-primary p-3 text-primary-foreground"
            >
              <ActiveIcon />
            </ItemMedia>
            <ItemContent className="min-w-0">
              <ItemTitle>{activeAccount.name}</ItemTitle>
              <ItemDescription className="tabular-nums">
                {formatCurrency(activeAccount.balance)}
              </ItemDescription>
            </ItemContent>
          </Item>

          <Separator />

          <div className="flex gap-2 overscroll-x-contain overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {accounts.map((account) => {
              const Icon = account.icon
              const isSelected = selectedAccount === account.value

              return (
                <Button
                  key={account.value}
                  type="button"
                  variant={isSelected ? "default" : "secondary"}
                  size="sm"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedAccount(account.value)}
                >
                  <Icon data-icon="inline-start" />
                  {account.name}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </PageSection>
  )
}
