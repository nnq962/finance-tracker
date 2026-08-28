import {
  ArrowDownIcon,
  ArrowLeftRightIcon,
  ArrowUpIcon,
  HandCoinsIcon,
  LandmarkIcon,
} from "lucide-react"

export const transactionTypes = [
  {
    value: "expense",
    label: "Chi tiền",
    icon: ArrowUpIcon,
    triggerClassName:
      "border-[#FF5B7F] bg-[#FF5B7F]/[0.07] text-[#FF5B7F] hover:bg-[#FF5B7F]/[0.07] aria-expanded:bg-[#FF5B7F]/[0.07] dark:border-[#FF5B7F] dark:bg-[#FF5B7F]/[0.07] dark:text-[#FF5B7F] dark:hover:bg-[#FF5B7F]/[0.07] dark:aria-expanded:bg-[#FF5B7F]/[0.07]",
    selectedItemClassName:
      "bg-[#FF5B7F]/[0.07] text-[#FF5B7F] focus:bg-[#FF5B7F]/[0.07] focus:text-[#FF5B7F] **:text-[#FF5B7F]",
    accentTextClassName: "text-[#FF5B7F]",
    accentIconClassName: "bg-[#FF5B7F]/[0.07] text-[#FF5B7F]",
    actionClassName:
      "bg-[#FF5B7F] text-white hover:bg-[#FF5B7F]/90",
  },
  {
    value: "income",
    label: "Thu tiền",
    icon: ArrowDownIcon,
    triggerClassName:
      "border-emerald-500 bg-emerald-500/[0.07] text-emerald-600 hover:bg-emerald-500/[0.07] aria-expanded:bg-emerald-500/[0.07] dark:border-emerald-400 dark:bg-emerald-400/[0.07] dark:text-emerald-400 dark:hover:bg-emerald-400/[0.07] dark:aria-expanded:bg-emerald-400/[0.07]",
    selectedItemClassName:
      "bg-emerald-500/[0.07] text-emerald-600 focus:bg-emerald-500/[0.07] focus:text-emerald-600 **:text-emerald-600 dark:bg-emerald-400/[0.07] dark:text-emerald-400 dark:focus:bg-emerald-400/[0.07] dark:focus:text-emerald-400 dark:**:text-emerald-400",
    accentTextClassName: "text-emerald-500 dark:text-emerald-400",
    accentIconClassName:
      "bg-emerald-500/[0.07] text-emerald-600 dark:bg-emerald-400/[0.07] dark:text-emerald-400",
    actionClassName:
      "bg-emerald-500 text-white hover:bg-emerald-500/90 dark:bg-emerald-600 dark:hover:bg-emerald-600/90",
  },
  {
    value: "lend",
    label: "Cho vay",
    icon: HandCoinsIcon,
    triggerClassName:
      "border-sky-500 bg-sky-500/[0.07] text-sky-600 hover:bg-sky-500/[0.07] aria-expanded:bg-sky-500/[0.07] dark:border-sky-400 dark:bg-sky-400/[0.07] dark:text-sky-400 dark:hover:bg-sky-400/[0.07] dark:aria-expanded:bg-sky-400/[0.07]",
    selectedItemClassName:
      "bg-sky-500/[0.07] text-sky-600 focus:bg-sky-500/[0.07] focus:text-sky-600 **:text-sky-600 dark:bg-sky-400/[0.07] dark:text-sky-400 dark:focus:bg-sky-400/[0.07] dark:focus:text-sky-400 dark:**:text-sky-400",
    accentTextClassName: "text-sky-500 dark:text-sky-400",
    accentIconClassName:
      "bg-sky-500/[0.07] text-sky-600 dark:bg-sky-400/[0.07] dark:text-sky-400",
    actionClassName:
      "bg-sky-500 text-white hover:bg-sky-500/90 dark:bg-sky-600 dark:hover:bg-sky-600/90",
  },
  {
    value: "borrow",
    label: "Đi vay",
    icon: LandmarkIcon,
    triggerClassName:
      "border-orange-500 bg-orange-500/[0.07] text-orange-600 hover:bg-orange-500/[0.07] aria-expanded:bg-orange-500/[0.07] dark:border-orange-400 dark:bg-orange-400/[0.07] dark:text-orange-400 dark:hover:bg-orange-400/[0.07] dark:aria-expanded:bg-orange-400/[0.07]",
    selectedItemClassName:
      "bg-orange-500/[0.07] text-orange-600 focus:bg-orange-500/[0.07] focus:text-orange-600 **:text-orange-600 dark:bg-orange-400/[0.07] dark:text-orange-400 dark:focus:bg-orange-400/[0.07] dark:focus:text-orange-400 dark:**:text-orange-400",
    accentTextClassName: "text-orange-500 dark:text-orange-400",
    accentIconClassName:
      "bg-orange-500/[0.07] text-orange-600 dark:bg-orange-400/[0.07] dark:text-orange-400",
    actionClassName:
      "bg-orange-500 text-white hover:bg-orange-500/90 dark:bg-orange-600 dark:hover:bg-orange-600/90",
  },
  {
    value: "transfer",
    label: "Chuyển khoản",
    icon: ArrowLeftRightIcon,
    triggerClassName:
      "border-blue-500 bg-blue-500/[0.07] text-blue-600 hover:bg-blue-500/[0.07] aria-expanded:bg-blue-500/[0.07] dark:border-blue-400 dark:bg-blue-400/[0.07] dark:text-blue-400 dark:hover:bg-blue-400/[0.07] dark:aria-expanded:bg-blue-400/[0.07]",
    selectedItemClassName:
      "bg-blue-500/[0.07] text-blue-600 focus:bg-blue-500/[0.07] focus:text-blue-600 **:text-blue-600 dark:bg-blue-400/[0.07] dark:text-blue-400 dark:focus:bg-blue-400/[0.07] dark:focus:text-blue-400 dark:**:text-blue-400",
    accentTextClassName: "text-blue-500 dark:text-blue-400",
    accentIconClassName:
      "bg-blue-500/[0.07] text-blue-600 dark:bg-blue-400/[0.07] dark:text-blue-400",
    actionClassName:
      "bg-blue-500 text-white hover:bg-blue-500/90 dark:bg-blue-600 dark:hover:bg-blue-600/90",
  },
] as const

export type TransactionType = (typeof transactionTypes)[number]["value"]

export function getTransactionTypeOption(value: TransactionType) {
  return (
    transactionTypes.find((transactionType) => transactionType.value === value) ??
    transactionTypes[0]
  )
}
