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
    actionClassName:
      "bg-sky-500 text-white hover:bg-sky-500/90 dark:bg-sky-600 dark:hover:bg-sky-600/90",
  },
  {
    value: "borrow",
    label: "Đi vay",
    icon: LandmarkIcon,
    triggerClassName:
      "border-amber-500 bg-amber-500/[0.07] text-amber-700 hover:bg-amber-500/[0.07] aria-expanded:bg-amber-500/[0.07] dark:border-amber-400 dark:bg-amber-400/[0.07] dark:text-amber-400 dark:hover:bg-amber-400/[0.07] dark:aria-expanded:bg-amber-400/[0.07]",
    selectedItemClassName:
      "bg-amber-500/[0.07] text-amber-700 focus:bg-amber-500/[0.07] focus:text-amber-700 **:text-amber-700 dark:bg-amber-400/[0.07] dark:text-amber-400 dark:focus:bg-amber-400/[0.07] dark:focus:text-amber-400 dark:**:text-amber-400",
    accentTextClassName: "text-amber-500 dark:text-amber-400",
    actionClassName:
      "bg-amber-400 text-amber-950 hover:bg-amber-400/90 dark:bg-amber-500 dark:hover:bg-amber-500/90",
  },
  {
    value: "transfer",
    label: "Chuyển khoản",
    icon: ArrowLeftRightIcon,
    triggerClassName:
      "border-violet-500 bg-violet-500/[0.07] text-violet-600 hover:bg-violet-500/[0.07] aria-expanded:bg-violet-500/[0.07] dark:border-violet-400 dark:bg-violet-400/[0.07] dark:text-violet-400 dark:hover:bg-violet-400/[0.07] dark:aria-expanded:bg-violet-400/[0.07]",
    selectedItemClassName:
      "bg-violet-500/[0.07] text-violet-600 focus:bg-violet-500/[0.07] focus:text-violet-600 **:text-violet-600 dark:bg-violet-400/[0.07] dark:text-violet-400 dark:focus:bg-violet-400/[0.07] dark:focus:text-violet-400 dark:**:text-violet-400",
    accentTextClassName: "text-violet-500 dark:text-violet-400",
    actionClassName:
      "bg-violet-500 text-white hover:bg-violet-500/90 dark:bg-violet-600 dark:hover:bg-violet-600/90",
  },
] as const

export type TransactionType = (typeof transactionTypes)[number]["value"]

export function getTransactionTypeOption(value: TransactionType) {
  return (
    transactionTypes.find((transactionType) => transactionType.value === value) ??
    transactionTypes[0]
  )
}
