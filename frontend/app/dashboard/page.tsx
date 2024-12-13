"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    console.log("Nome recuperado do localStorage:", storedUsername);
  
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push("/login");
    }
  }, [router]);
  
  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? "<<" : ">>"}
        </button>
        <div className="menu-content">
          {isSidebarOpen && <h2>Menu</h2>}
          <ul>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/saldo">Saldo</Link></li>
            <li><Link href="/receitas">Receitas</Link></li>
            <li><Link href="/despesas">Despesas</Link></li>
            <li><Link href="/relatorios">Relatórios</Link></li>
            <li><Link href="/transacoes">Transações</Link></li>
            <li><Link href="/metas">Metas</Link></li>
            <li><Link href="/configuracoes">Configurações</Link></li>
          </ul>
        </div>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h2>Bem-vindo(a), {username} ao Dashboard</h2>
          <button onClick={handleLogout}>Sair</button>
        </header>

        <div className="card-container">
          <div className="card">Saldo Atual: R$0,00</div>
          <div className="card">Receitas: R$0,00</div>
          <div className="card">Despesas: R$0,00</div>
        </div>

        <div className="sections">
          <div className="section">
            <h3>Receita</h3>
            <p>Detalhes das receitas aparecerão aqui.</p>
          </div>
          <div className="section">
            <h3>Despesa</h3>
            <p>Detalhes das despesas aparecerão aqui.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
