"use client"

import { useState } from "react"

import { AccountActionsDrawer } from "./account-actions-drawer"
import { AccountListItem } from "./account-list-item"
import { AddSpendingAccountDrawer } from "./add-spending-account-drawer"
import { AdjustBalanceDrawer } from "./adjust-balance-drawer"
import { EditSpendingAccountDrawer } from "./edit-spending-account-drawer"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DrawerTrigger } from "@/components/ui/drawer"
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
    containerClassName: "bg-spending/10",
  },
  {
    purpose: "savings",
    label: "Tiết kiệm",
    containerClassName: "bg-savings/10",
  },
]

type AccountListProps = {
  accounts: Account[]
}

export function AccountList({ accounts }: AccountListProps) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isAddSpendingAccountDrawerOpen, setIsAddSpendingAccountDrawerOpen] =
    useState(false)
  const [isActionsDrawerOpen, setIsActionsDrawerOpen] = useState(false)
  const [isAdjustBalanceDrawerOpen, setIsAdjustBalanceDrawerOpen] =
    useState(false)
  const [isEditSpendingAccountDrawerOpen, setIsEditSpendingAccountDrawerOpen] =
    useState(false)
  const [pendingDrawer, setPendingDrawer] = useState<
    "adjust-balance" | "edit-spending-account" | null
  >(null)

  const openAdjustBalanceDrawer = () => {
    setPendingDrawer("adjust-balance")
    setIsActionsDrawerOpen(false)
  }

  const openEditSpendingAccountDrawer = () => {
    setPendingDrawer("edit-spending-account")
    setIsActionsDrawerOpen(false)
  }

  const handleActionsDrawerChangeComplete = (open: boolean) => {
    if (!open && pendingDrawer === "adjust-balance") {
      setPendingDrawer(null)
      setIsAdjustBalanceDrawerOpen(true)
    }

    if (!open && pendingDrawer === "edit-spending-account") {
      setPendingDrawer(null)
      setIsEditSpendingAccountDrawerOpen(true)
    }
  }

  return (
    <>
      <AccountActionsDrawer
        account={selectedAccount}
        open={isActionsDrawerOpen}
        onAdjustBalance={openAdjustBalanceDrawer}
        onEditSpendingAccount={openEditSpendingAccountDrawer}
        onOpenChange={setIsActionsDrawerOpen}
        onOpenChangeComplete={handleActionsDrawerChangeComplete}
      >
        <div className="min-w-0 space-y-6">
          {accountGroups.map((group) => {
            const groupAccounts = accounts.filter(
              (account) => account.purpose === group.purpose
            )

            return (
              <Card key={group.purpose}>
                <CardHeader className="flex items-baseline justify-between">
                  <CardTitle className="text-base leading-6 font-medium">
                    <h2>{group.label}</h2>
                  </CardTitle>
                  {group.purpose === "spending" && (
                    <CardAction className="self-baseline">
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="-mr-3 h-6 text-base no-underline"
                        onClick={() => setIsAddSpendingAccountDrawerOpen(true)}
                      >
                        <PlusIcon data-icon="inline-start" />
                        Thêm
                      </Button>
                    </CardAction>
                  )}
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
                        <DrawerTrigger
                          render={
                            <AccountListItem
                              account={account}
                              onClick={() => setSelectedAccount(account)}
                            />
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </AccountActionsDrawer>

      <AddSpendingAccountDrawer
        open={isAddSpendingAccountDrawerOpen}
        onOpenChange={setIsAddSpendingAccountDrawerOpen}
      />

      <AdjustBalanceDrawer
        account={selectedAccount}
        open={isAdjustBalanceDrawerOpen}
        onOpenChange={setIsAdjustBalanceDrawerOpen}
      />

      <EditSpendingAccountDrawer
        key={selectedAccount?.id ?? "no-account"}
        account={selectedAccount}
        open={isEditSpendingAccountDrawerOpen}
        onOpenChange={setIsEditSpendingAccountDrawerOpen}
      />
    </>
  )
}
