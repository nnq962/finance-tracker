"use client"

import { useState } from "react"
import {
  BanknoteIcon,
  CheckIcon,
  CreditCardIcon,
  LandmarkIcon,
  SmartphoneIcon,
} from "lucide-react"

import { PageSection } from "@/components/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"

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

  return (
    <PageSection>
      <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        Tài khoản
      </h2>

      <div
        role="radiogroup"
        aria-label="Chọn tài khoản"
        className="flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {accounts.map((account) => {
          const Icon = account.icon
          const isSelected = selectedAccount === account.value

          return (
            <Card
              key={account.value}
              size="sm"
              className={cn(
                "w-44 shrink-0 snap-start gap-0 py-0 transition-colors",
                isSelected && "border-2 border-primary dark:border-primary"
              )}
            >
              <CardContent className="p-0">
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className="flex min-h-28 w-full flex-col items-stretch p-4 text-left transition-colors duration-200 outline-none hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:ring-inset"
                  onClick={() => setSelectedAccount(account.value)}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors",
                        isSelected && "bg-primary text-primary-foreground"
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {isSelected && (
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckIcon className="size-3.5" aria-hidden="true" />
                      </span>
                    )}
                  </span>

                  <span className="mt-3 block min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {account.name}
                    </span>
                    <span className="mt-1 block truncate text-sm tabular-nums text-muted-foreground">
                      {formatCurrency(account.balance)}
                    </span>
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
