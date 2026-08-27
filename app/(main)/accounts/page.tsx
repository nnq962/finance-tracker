import { AccountList } from "./_components/account-list";
import { AccountSummary } from "./_components/account-summary";
import type { Account } from "@/types/account";

const accounts: Account[] = [
  {
    id: "checking-account",
    name: "Vietcombank",
    balance: 28_450_000,
    type: "bank",
    purpose: "spending",
    institutionId: "vietcombank",
    institutionCode: "VCB",
  },
  {
    id: "cash-wallet",
    name: "Tiền mặt",
    balance: 3_250_000,
    type: "cash",
    purpose: "spending",
  },
  {
    id: "digital-wallet",
    name: "Ví MoMo",
    balance: 12_850_000,
    type: "wallet",
    purpose: "spending",
    status: "inactive",
    institutionId: "momo",
  },
];

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
