import {
  BadgeDollarSignIcon,
  BriefcaseBusinessIcon,
  ChartNoAxesCombinedIcon,
  EllipsisIcon,
  GiftIcon,
  HandCoinsIcon,
} from "lucide-react"

import { TransactionAccountOptions } from "../../transaction-account-options"
import {
  TransactionCategoryOptions,
  type TransactionCategory,
} from "../../transaction-category-options"

const incomeCategories = [
  { value: "salary", label: "Lương", icon: BadgeDollarSignIcon },
  { value: "bonus", label: "Thưởng", icon: GiftIcon },
  { value: "business", label: "Tài xỉu", icon: BriefcaseBusinessIcon },
  { value: "investment", label: "Đầu tư", icon: ChartNoAxesCombinedIcon },
  { value: "gift", label: "Được tặng", icon: HandCoinsIcon },
  { value: "other", label: "Khác", icon: EllipsisIcon },
] as const satisfies readonly TransactionCategory[]

export function IncomeTransactionFields() {
  return (
    <>
      <TransactionCategoryOptions categories={incomeCategories} />
      <TransactionAccountOptions />
    </>
  )
}
