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
    institutionCode: "VCB",
  },
  {
    id: "savings-account",
    name: "Sổ tiết kiệm Techcombank",
    description: "Kỳ hạn 6 tháng",
    balance: 85_000_000,
    type: "bank",
    purpose: "savings",
    institutionCode: "TCB",
  },
  {
    id: "savings-account2",
    name: "Sổ tiết kiệm Techcombank",
    description: "Kỳ hạn 6 tháng",
    balance: 15_000_000,
    type: "bank",
    purpose: "savings",
    institutionCode: "TCB",
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:items-start">
        <AccountSummary accounts={accounts} />
        <AccountList accounts={accounts} />
      </div>
    </div>
  );
}
