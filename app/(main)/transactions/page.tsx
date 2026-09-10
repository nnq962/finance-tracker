import {
  PageDescription,
  PageHeader,
  PageShell,
  PageTitle,
} from "@/components/page-shell"

import { TransactionEntryForm } from "./_components/transaction-entry-form"

export default function TransactionsPage() {
  return (
    <PageShell>
      <PageHeader>
        <PageTitle>Giao dịch</PageTitle>
        <PageDescription>
          Ghi lại thu, chi, chuyển khoản và các khoản vay nợ
        </PageDescription>
      </PageHeader>
      <TransactionEntryForm />
    </PageShell>
  )
}
