import {
  BanknoteIcon,
  CreditCardIcon,
  LandmarkIcon,
  SmartphoneIcon,
} from "lucide-react"

export const transferAccounts = [
  {
    value: "cash",
    name: "Tiền mặt",
    type: "Ví tiền",
    balance: 3_250_000,
    icon: BanknoteIcon,
  },
  {
    value: "mb-bank",
    name: "MB Bank",
    type: "Tài khoản chi tiêu",
    balance: 12_500_000,
    icon: LandmarkIcon,
  },
  {
    value: "momo",
    name: "Ví MoMo",
    type: "Ví điện tử",
    balance: 1_800_000,
    icon: SmartphoneIcon,
  },
  {
    value: "techcombank",
    name: "Techcombank",
    type: "Tài khoản chi tiêu",
    balance: 24_000_000,
    icon: CreditCardIcon,
  },
] as const

export type TransferAccountId = (typeof transferAccounts)[number]["value"]

export function getTransferAccount(accountId: TransferAccountId) {
  return transferAccounts.find((account) => account.value === accountId)!
}
