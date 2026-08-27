import type { ReactNode } from "react"

type TransactionContentPanelProps = {
  children?: ReactNode
}

export function TransactionContentPanel({
  children,
}: TransactionContentPanelProps) {
  return (
    <div className="relative mt-5 flex min-h-64 w-full flex-1 rounded-t-4xl bg-background">
      {children}
    </div>
  )
}
