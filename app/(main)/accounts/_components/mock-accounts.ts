type AccountBase = {
  id: string
  name: string
  balance: number
  icon:
    | "wallet"
    | "landmark"
    | "credit-card"
    | "vault"
    | "calendar-clock"
    | "badge-percent"
}

export type SpendingAccount = AccountBase & {
  type: "spending"
}

export type SavingsAccount = AccountBase & {
  type: "savings"
  bank: string
  interestRate: number
  termMonths: number
  maturityDate: string
}

export type Account = SpendingAccount | SavingsAccount

export type AccountGroup =
  | {
      id: "spending"
      name: string
      accounts: SpendingAccount[]
    }
  | {
      id: "savings"
      name: string
      accounts: SavingsAccount[]
    }

export const accountGroups: AccountGroup[] = [
  {
    id: "spending",
    name: "Chi tiêu",
    accounts: [
      {
        id: "cash-wallet",
        name: "Ví tiền mặt",
        balance: 3_000_000,
        icon: "wallet",
        type: "spending",
      },
      {
        id: "payment-account",
        name: "Tài khoản thanh toán",
        balance: 17_000_000,
        icon: "landmark",
        type: "spending",
      },
      {
        id: "prepaid-card",
        name: "Thẻ trả trước",
        balance: 10_000_000,
        icon: "credit-card",
        type: "spending",
      },
    ],
  },
  {
    id: "savings",
    name: "Tiết kiệm",
    accounts: [
      {
        id: "emergency-fund",
        name: "Tiết kiệm online",
        balance: 30_000_000,
        icon: "vault",
        type: "savings",
        bank: "Vietcombank",
        interestRate: 4.7,
        termMonths: 6,
        maturityDate: "15/12/2026",
      },
      {
        id: "travel-savings",
        name: "Tiết kiệm tích lũy",
        balance: 15_000_000,
        icon: "calendar-clock",
        type: "savings",
        bank: "Techcombank",
        interestRate: 5.2,
        termMonths: 12,
        maturityDate: "20/06/2027",
      },
      {
        id: "long-term-savings",
        name: "Tiền gửi dài hạn",
        balance: 25_000_000,
        icon: "badge-percent",
        type: "savings",
        bank: "MB Bank",
        interestRate: 5.8,
        termMonths: 24,
        maturityDate: "05/09/2028",
      },
    ],
  },
]

export function getAccountGroupBalance(group: AccountGroup) {
  return group.accounts.reduce((total, account) => total + account.balance, 0)
}
