export type AccountType = "bank" | "cash" | "wallet"
export type AccountPurpose = "spending" | "savings"

export type Account = {
  id: string
  name: string
  description?: string
  balance: number
  type: AccountType
  purpose: AccountPurpose
  institutionCode?: string
}
