import { AccountGroupCard } from "./_components/account-group"
import { AccountSummaryCard } from "./_components/account-summary-card"
import { accountGroups } from "./_components/mock-accounts"

export default function AccountsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Tài khoản</h1>
        <p className="text-sm text-muted-foreground">
          Theo dõi số dư trong các tài khoản của bạn.
        </p>
      </div>

      <AccountSummaryCard groups={accountGroups} />

      <div className="grid gap-6 md:grid-cols-2">
        {accountGroups.map((group) => (
          <AccountGroupCard key={group.id} group={group} />
        ))}
      </div>
    </main>
  )
}
