"use client"

import { ArrowDownCircle, ArrowUpCircle, ChevronLeft, ChevronRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TransactionsTable } from "@/components/transactions-table"
import Link from "next/link"

export function TransactionsContent() {
  return (
    <main className="flex-1 p-8">
      <div className="flex flex-col items-center justify-center mb-8 h-[100px]">
        <Link href="/">
          <Button className="bg-[#4CAF50] text-white rounded-full px-12 py-6 h-auto hover:bg-[#45a049] text-xl font-medium flex items-center justify-center w-64">
            Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="text-lg font-medium border-2 border-[#4CAF50] text-[#4CAF50] rounded-full px-6 py-2">
            Dezembro 2024
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <TransactionsTable />
        </div>

        <div className="space-y-6">
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
      </div>
    </main>
  )
}

