import { AccountListItem } from "./account-list-item"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Account, AccountPurpose } from "@/types/account"
import { PlusIcon } from "lucide-react"

const accountGroups: {
  purpose: AccountPurpose
  label: string
  containerClassName: string
}[] = [
  {
    purpose: "spending",
    label: "Chi tiêu",
    containerClassName: "bg-orange-500/10",
  },
  {
    purpose: "savings",
    label: "Tiết kiệm",
    containerClassName: "bg-emerald-500/10",
  },
]

type AccountListProps = {
  accounts: Account[]
}

export function AccountList({ accounts }: AccountListProps) {
  return (
    <div className="min-w-0 space-y-6">
      {accountGroups.map((group) => {
        const groupAccounts = accounts.filter(
          (account) => account.purpose === group.purpose
        )

        return (
          <Card key={group.purpose}>
            <CardHeader className="flex items-baseline justify-between">
              <CardTitle className="text-sm leading-6 font-medium">
                <h2>{group.label}</h2>
              </CardTitle>
              <CardAction className="self-baseline">
                <button
                  type="button"
                  className="cursor-pointer text-sm leading-6 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-px"
                >
                  <PlusIcon className="mr-1 inline size-4 align-[-0.125em]" />
                  Thêm
                </button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <div
                className={`overflow-hidden rounded-2xl ${group.containerClassName}`}
              >
                {groupAccounts.map((account, accountIndex) => (
                  <div key={account.id}>
                    {accountIndex > 0 && (
                      <Separator className="mx-4 w-auto bg-foreground/5" />
                    )}
                    <AccountListItem account={account} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
