import {
  ArrowLeftRightIcon,
  CircleDollarSignIcon,
  HandshakeIcon,
  ShoppingBasketIcon,
} from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const transactionTypes = [
  { value: "expense", label: "Chi tiêu", icon: ShoppingBasketIcon },
  { value: "income", label: "Thu tiền", icon: CircleDollarSignIcon },
  { value: "transfer", label: "Chuyển", icon: ArrowLeftRightIcon },
  { value: "debt", label: "Vay nợ", icon: HandshakeIcon },
] as const

export type TransactionType = (typeof transactionTypes)[number]["value"]

type TransactionTypeTabsProps = {
  value: TransactionType
  onValueChange: (value: TransactionType) => void
}

export function TransactionTypeTabs({
  value,
  onValueChange,
}: TransactionTypeTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) =>
        onValueChange(nextValue as TransactionType)
      }
    >
      <div className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <TabsList variant="line" className="w-full min-w-max">
          {transactionTypes.map((type) => {
            const Icon = type.icon

            return (
              <TabsTrigger key={type.value} value={type.value}>
                <Icon />
                {type.label}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </div>
    </Tabs>
  )
}
