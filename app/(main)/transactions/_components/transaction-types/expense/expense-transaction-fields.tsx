import {
  BusFrontIcon,
  CoffeeIcon,
  MoonStarIcon,
  ShoppingBagIcon,
  SoupIcon,
  UtensilsIcon,
} from "lucide-react"

import { TransactionAccountOptions } from "../../transaction-account-options"
import {
  TransactionCategoryOptions,
  type TransactionCategory,
} from "../../transaction-category-options"

const expenseCategories = [
  { value: "breakfast", label: "Ăn sáng", icon: CoffeeIcon },
  { value: "lunch", label: "Ăn trưa", icon: SoupIcon },
  { value: "dinner", label: "Ăn tối", icon: MoonStarIcon },
  { value: "coffee", label: "Cà phê", icon: UtensilsIcon },
  { value: "transport", label: "Di chuyển", icon: BusFrontIcon },
  { value: "shopping", label: "Mua sắm", icon: ShoppingBagIcon },
] as const satisfies readonly TransactionCategory[]

export function ExpenseTransactionFields() {
  return (
    <>
      <TransactionCategoryOptions categories={expenseCategories} />
      <TransactionAccountOptions />
    </>
  )
}
