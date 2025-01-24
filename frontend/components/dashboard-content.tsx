import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardContent() {
  return (
    <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="bg-white rounded-full px-6 py-2 shadow-sm">
          <span className="text-lg">Olá, Exemplo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="rounded-3xl shadow-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-lg font-medium mb-2">Saldo Atual</p>
              <p className="text-3xl font-bold">R$ 0,00</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-lg font-medium mb-2">Receitas</p>
              <p className="text-3xl font-bold">R$ 0,00</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowUpCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-lg font-medium mb-2">Despesas</p>
              <p className="text-3xl font-bold">R$ 0,00</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowDownCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-6 h-80">
            {" "}
            {/* Increased height to 80 (20rem) */}
            <h3 className="text-xl font-semibold mb-4">Receita</h3>
            {/* Add chart or content here */}
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-6 h-80">
            {" "}
            {/* Increased height to 80 (20rem) */}
            <h3 className="text-xl font-semibold mb-4">Despesas</h3>
            {/* Add chart or content here */}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

