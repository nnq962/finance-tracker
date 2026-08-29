import type { Account } from "@/types/account"

export const accounts: Account[] = [
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
    purpose: "savings",
    status: "inactive",
    institutionId: "momo",
  },
]
