"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  FaHome,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaExchangeAlt,
  FaBullseye,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaSync,
} from "react-icons/fa"
import "./dashboard.css"

interface DashboardProps {
  isAuthenticated?: boolean
  onLoginClick?: (redirectUrl?: string) => void
  children?: React.ReactNode
}

export default function Dashboard({ isAuthenticated: propIsAuthenticated, onLoginClick, children }: DashboardProps) {
  const [username, setUsername] = useState<string>("")
  const [isAuthenticated, setIsAuthenticated] = useState(propIsAuthenticated)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication status on mount and when prop changes
    const token = localStorage.getItem("token")
    const storedUsername = localStorage.getItem("username")
    setIsAuthenticated(!!token)
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [propIsAuthenticated]) //Fixed unnecessary dependency

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    sessionStorage.clear()
    setIsAuthenticated(false)
    setUsername("")
    router.push("/")
  }

  const handleProtectedLink = (e: React.MouseEvent, path: string) => {
    if (!isAuthenticated) {
      e.preventDefault()
      router.push("/login?redirect=" + encodeURIComponent(path))
    }
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <FaSync className="logo-icon" />
          <h2>Sua Finança</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link href="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>
                <FaHome /> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/saldo"
                className={pathname === "/saldo" ? "active" : ""}
                onClick={(e) => handleProtectedLink(e, "/saldo")}
              >
                <FaWallet /> <span>Saldo</span>
              </Link>
            </li>
            <li>
              <Link
                href="/receitas"
                className={pathname === "/receitas" ? "active" : ""}
                onClick={(e) => handleProtectedLink(e, "/receitas")}
              >
                <FaArrowUp /> <span>Receitas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/despesas"
                className={pathname === "/despesas" ? "active" : ""}
                onClick={(e) => handleProtectedLink(e, "/despesas")}
              >
                <FaArrowDown /> <span>Despesas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/relatorios"
                className={pathname === "/relatorios" ? "active" : ""}
                onClick={(e) => handleProtectedLink(e, "/relatorios")}
              >
                <FaChartLine /> <span>Relatórios</span>
              </Link>
            </li>
            <li>
              <Link
                href="/transacoes"
                className={pathname === "/transacoes" ? "active" : ""}
                onClick={(e) => handleProtectedLink(e, "/transacoes")}
              >
                <FaExchangeAlt /> <span>Transações</span>
              </Link>
            </li>
            <li>
              <Link
                href="/metas"
                className={pathname === "/metas" ? "active" : ""}
                onClick={(e) => handleProtectedLink(e, "/metas")}
              >
                <FaBullseye /> <span>Metas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/configuracoes"
                className={pathname === "/configuracoes" ? "active" : ""}
                onClick={(e) => handleProtectedLink(e, "/configuracoes")}
              >
                <FaCog /> <span>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
        {isAuthenticated ? (
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Sair</span>
          </button>
        ) : (
          <button className="login-button" onClick={() => router.push("/login")}>
            <FaUser /> <span>Entrar</span>
          </button>
        )}
      </aside>

      <div className="main-content">
        {children || (
          <>
            <header className="main-header">
              <h2>{isAuthenticated ? `Olá, ${username}` : "Bem-vindo ao Sua Finança"}</h2>
            </header>

            <div className="card-container">
              <div className="card">
                <h3>Saldo Atual</h3>
                <p>{isAuthenticated ? "R$ 0,00" : "******"}</p>
              </div>
              <div className="card">
                <h3>Receitas</h3>
                <p>{isAuthenticated ? "R$ 0,00" : "******"}</p>
              </div>
              <div className="card">
                <h3>Despesas</h3>
                <p>{isAuthenticated ? "R$ 0,00" : "******"}</p>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="login-prompt">
                <p>Faça login para acessar todos os recursos</p>
                <button onClick={() => router.push("/login")}>Entrar</button>
              </div>
            )}

            {isAuthenticated && (
              <div className="sections">
                <div className="section">
                  <h3>Receitas</h3>
                  <div className="content">
                    <p>Nenhuma receita registrada</p>
                  </div>
                </div>
                <div className="section">
                  <h3>Despesas</h3>
                  <div className="content">
                    <p>Nenhuma despesa registrada</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

