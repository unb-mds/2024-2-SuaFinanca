"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  FaBars
} from "react-icons/fa";
import "./dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push("/login");
    }
  }, [router]);

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
              <Link href="/saldo">
                <FaWallet /> <span>Saldo</span>
              </Link>
            </li>
            <li>
              <Link href="/receitas">
                <FaArrowUp /> <span>Receitas</span>
              </Link>
            </li>
            <li>
              <Link href="/despesas">
                <FaArrowDown /> <span>Despesas</span>
              </Link>
            </li>
            <li>
              <Link href="/relatorios">
                <FaChartLine /> <span>Relatórios</span>
              </Link>
            </li>
            <li>
              <Link href="/transacoes">
                <FaExchangeAlt /> <span>Transações</span>
              </Link>
            </li>
            <li>
              <Link href="/metas">
                <FaBullseye /> <span>Metas</span>
              </Link>
            </li>
            <li>
              <Link href="/configuracoes">
                <FaCog /> <span>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> <span>Sair</span>
        </button>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h2>Olá, {username}</h2>
        </header>

        <div className="card-container">
          <div className="card">
            <h3>Saldo Atual</h3>
            <p>R$ 0,00</p>
          </div>
          <div className="card">
            <h3>Receitas</h3>
            <p>R$ 0,00</p>
          </div>
          <div className="card">
            <h3>Despesas</h3>
            <p>R$ 0,00</p>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Dashboard;
