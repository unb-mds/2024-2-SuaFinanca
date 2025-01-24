"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowLeft,
  BarChart3,
  Home,
  LogOut,
  Settings,
  Target,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen bg-[#4CAF50]", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-3xl font-semibold tracking-tight text-white">Sua Finança</h2>
          <Button variant="ghost" size="icon" className="ml-auto text-white rounded-full" asChild>
            <Link href="#">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
        </div>
        <div className="space-y-1">
          <nav className="grid gap-1 px-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all",
                pathname === "/" ? "bg-white/10" : "",
              )}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <Wallet className="h-5 w-5" />
              <span>Saldo</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <ArrowUpCircle className="h-5 w-5" />
              <span>Receitas</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <ArrowDownCircle className="h-5 w-5" />
              <span>Despesas</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Relatórios</span>
            </Link>
            <Link
              href="/transacoes"
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all",
                pathname === "/transacoes" ? "bg-white/10" : "",
              )}
            >
              <RefreshCcw className="h-5 w-5" />
              <span>Transação</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <Target className="h-5 w-5" />
              <span>Metas</span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="mt-auto fixed bottom-4 space-y-1 px-2">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair!</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-2xl px-3 py-2 text-white hover:bg-white/10 transition-all"
        >
          <Settings className="h-5 w-5" />
          <span>Configurações</span>
        </Link>
      </div>
    </div>
  )
}

