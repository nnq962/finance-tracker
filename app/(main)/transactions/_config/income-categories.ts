import {
  AwardIcon,
  BriefcaseBusinessIcon,
  CircleDollarSignIcon,
  EllipsisIcon,
  GiftIcon,
  TrendingUpIcon,
} from "lucide-react"

export const incomeCategories = [
  { value: "income", label: "Tiền vào", icon: CircleDollarSignIcon },
  { value: "salary", label: "Lương", icon: BriefcaseBusinessIcon },
  { value: "bonus", label: "Thưởng", icon: AwardIcon },
  { value: "gift", label: "Được cho", icon: GiftIcon },
  { value: "interest", label: "Tiền lãi", icon: TrendingUpIcon },
  { value: "other", label: "Khác", icon: EllipsisIcon },
] as const

export type IncomeCategory = (typeof incomeCategories)[number]["value"]

export function isIncomeCategory(value: string): value is IncomeCategory {
  return incomeCategories.some((category) => category.value === value)
}
