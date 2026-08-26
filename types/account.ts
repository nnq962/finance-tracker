export type AccountType = "bank" | "cash" | "wallet"
export type AccountPurpose = "spending" | "savings"
export type AccountStatus = "active" | "inactive"

export type Account = {
  id: string
  name: string
  description?: string
  balance: number
  type: AccountType
  purpose: AccountPurpose
  status?: AccountStatus
  institutionId?: string
  institutionCode?: string
  progress?: number
  excludeFromReports?: boolean
}
