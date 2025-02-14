
// components/Layout.tsx
"use client";

import React, { useState} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import "../dashboard/dashboard.css";

import Login from "../login/page";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated,  logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const handleLoginClick = () => {
    setShowLoginModal(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  // Determine the theme based on the current route
  const themeClass = pathname.startsWith("/despesas") ? "despesas-page" : "receitas-page";


  return (
    <div className={`dashboard-container ${themeClass}`}>
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
              <Link
                href="/receitas"
                className={isAuthenticated ? "" : "disabled"}
              >
                <FaArrowUp /> <span>Receitas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/despesas"
                className={isAuthenticated ? "" : "disabled"}
              >
                <FaArrowDown /> <span>Despesas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/relatorios"
                className={isAuthenticated ? "" : "disabled"}
              >
                <FaChartLine /> <span>Relatórios</span>
              </Link>
            </li>
            <li>
              <Link
                href="/transacoes"
                className={isAuthenticated ? "" : "disabled"}
              >
                <FaExchangeAlt /> <span>Transações</span>
              </Link>
            </li>
            <li>
              <Link href="/metas" className={isAuthenticated ? "" : "disabled"}>
                <FaBullseye /> <span>Metas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/configuracoes"
                className={isAuthenticated ? "" : "disabled"}
              >
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
          <button className="login-button" onClick={handleLoginClick}>
            <FaUser /> <span>Entrar</span>
          </button>
        )}
      </aside>


      <div className="main-content">
        {children}

        {/* Login Modal */}
        {showLoginModal && (
          <div className="login-overlay">
            <div className="login-modal">
              <button className="close-button" onClick={() => setShowLoginModal(false)}>
                ×
              </button>
              <Login onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

