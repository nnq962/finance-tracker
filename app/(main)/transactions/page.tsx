import { TransactionEditor } from "./_components/transaction-editor"
import { accounts } from "@/lib/data/accounts"

export default function TransactionsPage() {
  return <TransactionEditor accounts={accounts} />
}
