import { LandmarkIcon, WalletCardsIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ItemGroup } from "@/components/ui/item"

import { SavingsAccountItem, SpendingAccountItem } from "./account-item"
import type { AccountGroup } from "./mock-accounts"

export function AccountGroupCard({ group }: { group: AccountGroup }) {
  const isEmpty = group.accounts.length === 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
        <CardDescription>
          {group.id === "spending"
            ? "Số dư sẵn sàng để sử dụng"
            : "Các khoản tiền gửi có kỳ hạn"}
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">{group.accounts.length} tài khoản</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                {group.id === "spending" ? (
                  <WalletCardsIcon />
                ) : (
                  <LandmarkIcon />
                )}
              </EmptyMedia>
              <EmptyTitle className="text-sm">
                {group.id === "spending"
                  ? "Chưa có tài khoản chi tiêu"
                  : "Chưa có sổ tiết kiệm"}
              </EmptyTitle>
              <EmptyDescription>
                {group.id === "spending"
                  ? "Các tài khoản dùng cho chi tiêu sẽ xuất hiện tại đây."
                  : "Các khoản tiền gửi có kỳ hạn sẽ xuất hiện tại đây."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ItemGroup>
            {group.id === "spending"
              ? group.accounts.map((account) => (
                  <SpendingAccountItem key={account.id} account={account} />
                ))
              : group.accounts.map((account) => (
                  <SavingsAccountItem key={account.id} account={account} />
                ))}
          </ItemGroup>
        )}
      </CardContent>
    </Card>
  )
}
