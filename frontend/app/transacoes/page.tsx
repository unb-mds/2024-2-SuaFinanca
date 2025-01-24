import { Sidebar } from "@/components/sidebar"
import { TransactionsContent } from "@/components/transactions-content"

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="w-64 flex-shrink-0" />
      <TransactionsContent />
    </div>
  )
}

