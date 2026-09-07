import { TransactionEntryForm } from "./_components/transaction-entry-form"

export default function TransactionsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <TransactionEntryForm />
    </main>
  )
}
