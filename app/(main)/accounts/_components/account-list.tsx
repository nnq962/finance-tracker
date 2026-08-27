"use client"

import { useState } from "react"

import { AccountActionsDrawer } from "./account-actions-drawer"
import { AccountListItem } from "./account-list-item"
import { AddSavingsAccountDrawer } from "./add-savings-account-drawer"
import { AddSpendingAccountDrawer } from "./add-spending-account-drawer"
import { AdjustBalanceDrawer } from "./adjust-balance-drawer"
import { DeleteAccountAlertDialog } from "./delete-account-alert-dialog"
import { EditSpendingAccountDrawer } from "./edit-spending-account-drawer"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DrawerTrigger } from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import type { Account, AccountPurpose } from "@/types/account"
import {
  PiggyBankIcon,
  PlusIcon,
  type LucideIcon,
  WalletCardsIcon,
} from "lucide-react"

const accountGroups: {
  purpose: AccountPurpose
  label: string
  emptyTitle: string
  emptyDescription: string
  emptyIcon: LucideIcon
}[] = [
  {
    purpose: "spending",
    label: "Chi tiêu",
    emptyTitle: "Chưa có tài khoản chi tiêu",
    emptyDescription:
      "Thêm tài khoản ngân hàng, ví điện tử hoặc tiền mặt để bắt đầu theo dõi chi tiêu.",
    emptyIcon: WalletCardsIcon,
  },
  {
    purpose: "savings",
    label: "Tiết kiệm",
    emptyTitle: "Chưa có tài khoản tiết kiệm",
    emptyDescription:
      "Tạo tài khoản tiết kiệm để theo dõi mục tiêu và tiến độ tích lũy của bạn.",
    emptyIcon: PiggyBankIcon,
  },
]

type AccountListProps = {
  accounts: Account[]
}

export function AccountList({ accounts }: AccountListProps) {
  const [accountItems, setAccountItems] = useState(accounts)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isAddSpendingAccountDrawerOpen, setIsAddSpendingAccountDrawerOpen] =
    useState(false)
  const [isAddSavingsAccountDrawerOpen, setIsAddSavingsAccountDrawerOpen] =
    useState(false)
  const [isActionsDrawerOpen, setIsActionsDrawerOpen] = useState(false)
  const [isAdjustBalanceDrawerOpen, setIsAdjustBalanceDrawerOpen] =
    useState(false)
  const [isEditSpendingAccountDrawerOpen, setIsEditSpendingAccountDrawerOpen] =
    useState(false)
  const [isDeleteAccountAlertOpen, setIsDeleteAccountAlertOpen] =
    useState(false)
  const [pendingDrawer, setPendingDrawer] = useState<
    "adjust-balance" | "delete-account" | "edit-spending-account" | null
  >(null)

  const openAdjustBalanceDrawer = () => {
    setPendingDrawer("adjust-balance")
    setIsActionsDrawerOpen(false)
  }

  const openEditSpendingAccountDrawer = () => {
    setPendingDrawer("edit-spending-account")
    setIsActionsDrawerOpen(false)
  }

  const openDeleteAccountAlert = () => {
    setPendingDrawer("delete-account")
    setIsActionsDrawerOpen(false)
  }

  const stopUsingSelectedSpendingAccount = () => {
    if (
      !selectedAccount ||
      selectedAccount.purpose !== "spending" ||
      selectedAccount.status === "inactive"
    ) {
      return
    }

    const inactiveAccount: Account = {
      ...selectedAccount,
      status: "inactive",
    }

    setAccountItems((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === inactiveAccount.id ? inactiveAccount : account
      )
    )
    setSelectedAccount(inactiveAccount)
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

    if (!open && pendingDrawer === "delete-account") {
      setPendingDrawer(null)
      setIsDeleteAccountAlertOpen(true)
    }
  }

  return (
    <>
      <AccountActionsDrawer
        account={selectedAccount}
        open={isActionsDrawerOpen}
        onAdjustBalance={openAdjustBalanceDrawer}
        onDeleteAccount={openDeleteAccountAlert}
        onEditSpendingAccount={openEditSpendingAccountDrawer}
        onStopUsingSpendingAccount={stopUsingSelectedSpendingAccount}
        onOpenChange={setIsActionsDrawerOpen}
        onOpenChangeComplete={handleActionsDrawerChangeComplete}
      >
        <div className="min-w-0 space-y-6">
          {accountGroups.map((group) => {
            const groupAccounts = accountItems.filter(
              (account) => account.purpose === group.purpose
            )
            const EmptyIcon = group.emptyIcon
            const openAddAccountDrawer = () => {
              if (group.purpose === "spending") {
                setIsAddSpendingAccountDrawerOpen(true)
                return
              }

              setIsAddSavingsAccountDrawerOpen(true)
            }

            return (
              <section key={group.purpose} className="space-y-3">
                <div className="flex items-center justify-between gap-3 px-1">
                  <h2 className="text-base font-semibold">
                    {group.label}
                  </h2>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={openAddAccountDrawer}
                  >
                    <PlusIcon data-icon="inline-start" />
                    Thêm
                  </Button>
                </div>

                {groupAccounts.length > 0 ? (
                  <Card className="gap-0 py-0">
                    <CardContent className="px-0">
                      {groupAccounts.map((account, accountIndex) => (
                        <div key={account.id}>
                          {accountIndex > 0 && (
                            <Separator className="mx-4 bg-foreground/5 data-horizontal:w-auto" />
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
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-dashed py-0">
                    <CardContent className="flex min-h-40 flex-col items-center justify-center px-5 py-8 text-center sm:px-8">
                      <div className="flex size-11 items-center justify-center rounded-2xl border bg-background text-muted-foreground shadow-xs">
                        <EmptyIcon className="size-5" aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-sm font-semibold">
                        {group.emptyTitle}
                      </p>
                      <p className="mt-1.5 max-w-sm text-sm text-pretty text-muted-foreground">
                        {group.emptyDescription}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </section>
            )
          })}
        </div>
      </AccountActionsDrawer>

      <AddSpendingAccountDrawer
        open={isAddSpendingAccountDrawerOpen}
        onOpenChange={setIsAddSpendingAccountDrawerOpen}
      />

      <AddSavingsAccountDrawer
        accounts={accountItems}
        open={isAddSavingsAccountDrawerOpen}
        onOpenChange={setIsAddSavingsAccountDrawerOpen}
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

      <DeleteAccountAlertDialog
        account={selectedAccount}
        open={isDeleteAccountAlertOpen}
        onOpenChange={setIsDeleteAccountAlertOpen}
      />
    </>
  )
}
