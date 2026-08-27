import {
  CarIcon,
  CoffeeIcon,
  CookieIcon,
  CroissantIcon,
  EllipsisIcon,
  ShoppingBasketIcon,
  SoupIcon,
  UtensilsIcon,
} from "lucide-react"

export const expenseCategories = [
  { value: "breakfast", label: "Ăn sáng", icon: CroissantIcon },
  { value: "lunch", label: "Ăn trưa", icon: UtensilsIcon },
  { value: "dinner", label: "Ăn tối", icon: SoupIcon },
  { value: "groceries", label: "Đi chợ", icon: ShoppingBasketIcon },
  { value: "snacks", label: "Ăn vặt", icon: CookieIcon },
  { value: "cafe", label: "Cafe", icon: CoffeeIcon },
  { value: "transport", label: "Di chuyển", icon: CarIcon },
  { value: "other", label: "Khác", icon: EllipsisIcon },
] as const

export type ExpenseCategory = (typeof expenseCategories)[number]["value"]

export function isExpenseCategory(value: string): value is ExpenseCategory {
  return expenseCategories.some((category) => category.value === value)
}
