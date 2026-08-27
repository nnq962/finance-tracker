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
    panelClassName: "bg-rose-400 dark:bg-rose-800/80",
    actionClassName:
      "bg-rose-400 text-foreground hover:bg-rose-400/80 dark:bg-rose-800/80 dark:hover:bg-rose-800/70",
  },
  {
    value: "income",
    label: "Thu tiền",
    icon: ArrowDownIcon,
    panelClassName: "bg-emerald-400 dark:bg-emerald-800/80",
    actionClassName:
      "bg-emerald-400 text-foreground hover:bg-emerald-400/80 dark:bg-emerald-800/80 dark:hover:bg-emerald-800/70",
  },
  {
    value: "lend",
    label: "Cho vay",
    icon: HandCoinsIcon,
    panelClassName: "bg-sky-400 dark:bg-sky-800/80",
    actionClassName:
      "bg-sky-400 text-foreground hover:bg-sky-400/80 dark:bg-sky-800/80 dark:hover:bg-sky-800/70",
  },
  {
    value: "borrow",
    label: "Đi vay",
    icon: LandmarkIcon,
    panelClassName: "bg-amber-400 dark:bg-amber-800/80",
    actionClassName:
      "bg-amber-400 text-foreground hover:bg-amber-400/80 dark:bg-amber-800/80 dark:hover:bg-amber-800/70",
  },
  {
    value: "transfer",
    label: "Chuyển khoản",
    icon: ArrowLeftRightIcon,
    panelClassName: "bg-violet-400 dark:bg-violet-800/80",
    actionClassName:
      "bg-violet-400 text-foreground hover:bg-violet-400/80 dark:bg-violet-800/80 dark:hover:bg-violet-800/70",
  },
] as const

export type TransactionType = (typeof transactionTypes)[number]["value"]
