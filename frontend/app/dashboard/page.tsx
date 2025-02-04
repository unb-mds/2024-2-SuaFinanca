"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
  FaBars,
  FaUser,
} from "react-icons/fa"
import "./dashboard.css"

interface DashboardProps {
  isAuthenticated?: boolean
  onLoginClick?: () => void
}

export default function Dashboard({ isAuthenticated, onLoginClick }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [username, setUsername] = useState("")
  const router = useRouter()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    sessionStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const handleProtectedLink = (e: React.MouseEvent, path: string) => {
    if (!isAuthenticated) {
      e.preventDefault()
      if (onLoginClick) {
        onLoginClick()
      }
    }
  }

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="logo">
          <h2>Sua Finança</h2>
          <button className="toggle-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link href="/dashboard">
                <FaHome /> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/saldo" onClick={(e) => handleProtectedLink(e, "/saldo")}>
                <FaWallet /> <span>Saldo</span>
              </Link>
            </li>
            <li>
              <Link href="/receitas" onClick={(e) => handleProtectedLink(e, "/receitas")}>
                <FaArrowUp /> <span>Receitas</span>
              </Link>
            </li>
            <li>
              <Link href="/despesas" onClick={(e) => handleProtectedLink(e, "/despesas")}>
                <FaArrowDown /> <span>Despesas</span>
              </Link>
            </li>
            <li>
              <Link href="/relatorios" onClick={(e) => handleProtectedLink(e, "/relatorios")}>
                <FaChartLine /> <span>Relatórios</span>
              </Link>
            </li>
            <li>
              <Link href="/transacoes" onClick={(e) => handleProtectedLink(e, "/transacoes")}>
                <FaExchangeAlt /> <span>Transações</span>
              </Link>
            </li>
            <li>
              <Link href="/metas" onClick={(e) => handleProtectedLink(e, "/metas")}>
                <FaBullseye /> <span>Metas</span>
              </Link>
            </li>
            <li>
              <Link href="/configuracoes" onClick={(e) => handleProtectedLink(e, "/configuracoes")}>
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
          <button className="login-button" onClick={onLoginClick}>
            <FaUser /> <span>Entrar</span>
          </button>
        )}
      </aside>

      <div className="main-content">
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
            <button onClick={onLoginClick}>Entrar</button>
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
      </div>
    </div>
  )
}

