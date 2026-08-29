import { AccountList } from "./_components/account-list";
import { AccountSummary } from "./_components/account-summary";
import { accounts } from "@/lib/data/accounts";

export default function AccountsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tài khoản</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quản lý các tài khoản và số dư của bạn.
        </p>
      </div>

      <div className="grid gap-6">
        <AccountSummary accounts={accounts} />
        <AccountList accounts={accounts} />
      </div>
    </div>
  );
}
