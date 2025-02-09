"use client"

import React from "react"
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
  FaBars,
  FaTimes,
} from "react-icons/fa"
import { useAuth } from "../contexts/AuthContext"
import "../dashboard/dashboard.css"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, username, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? "visible" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="logo">
          <FaSync className="logo-icon" />
          <h2>Sua Finança</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link href="/dashboard">
                <FaHome /> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/saldo" className={isAuthenticated ? "" : "disabled"}>
                <FaWallet /> <span>Saldo</span>
              </Link>
            </li>
            <li>
              <Link href="/receitas" className={isAuthenticated ? "" : "disabled"}>
                <FaArrowUp /> <span>Receitas</span>
              </Link>
            </li>
            <li>
              <Link href="/despesas" className={isAuthenticated ? "" : "disabled"}>
                <FaArrowDown /> <span>Despesas</span>
              </Link>
            </li>
            <li>
              <Link href="/relatorios" className={isAuthenticated ? "" : "disabled"}>
                <FaChartLine /> <span>Relatórios</span>
              </Link>
            </li>
            <li>
              <Link href="/transacoes" className={isAuthenticated ? "" : "disabled"}>
                <FaExchangeAlt /> <span>Transações</span>
              </Link>
            </li>
            <li>
              <Link href="/metas" className={isAuthenticated ? "" : "disabled"}>
                <FaBullseye /> <span>Metas</span>
              </Link>
            </li>
            <li>
              <Link href="/configuracoes" className={isAuthenticated ? "" : "disabled"}>
                <FaCog /> <span>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
        {isAuthenticated ? (
          <button className="logout-button" onClick={logout}>
            <FaSignOutAlt /> <span>Sair</span>
          </button>
        ) : (
          <button className="login-button">
            <FaUser /> <span>Entrar</span>
          </button>
        )}
      </aside>

      <div className="main-content">{children}</div>
    </div>
  )
}

