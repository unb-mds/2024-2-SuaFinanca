"use client";


import { useState, useEffect } from "react";
import "next/link";
import { FaArrowLeft, FaPlus, FaDollarSign, FaWallet } from "react-icons/fa";
import "./saldo.css";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";


export default function Contas() {
  const { isAuthenticated } = useAuth();
  const [accounts, ] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchSaldo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/recent?limit=100`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar saldo: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.recent || !Array.isArray(data.recent.transaction)) {
          throw new Error("Resposta inválida da API: estrutura inesperada");
        }

        const transacoes = data.recent.transaction;
        const saldoCalculado = transacoes.reduce((total, t) => {
          return t.type === "INCOME" ? total + t.amount : total - t.amount;
        }, 0);

        setSaldoTotal(saldoCalculado);
      } catch (error) {
        console.error("Erro ao carregar saldo:", error);
      }
    };

    fetchSaldo();
  }, [token, isAuthenticated, BASE_URL]);

  const handleDownloadAll = () => {
    alert("Saldo ainda não implementado.");

  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar o saldo</p>
          <Link href="/dashboard">
            <button>Voltar para o Dashboard</button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="content-area">
          <div className="header-section">
            <Link href="/dashboard" className="back-button">
              <FaArrowLeft />
            </Link>
            <h1 className="page-title">Saldo</h1>
          </div>

          <div className="accounts-grid">
            <button className="new-account-card" onClick={handleDownloadAll}>
              <div className="new-account-content">
                <FaPlus className="plus-icon" />
                <span>Novo saldo</span>
              </div>
            </button>
            {accounts.map((account) => (
              <div key={account.id} className="account-card">
                <h3>{account.name}</h3>
                <p className="balance">R$ {account.balance.toFixed(2)}</p>
                <p className="account-type">{account.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card current-balance">
            <h3>Saldo Atual</h3>

            <p className="amount">R$ {saldoTotal.toFixed(2)}</p>

            <div className="icon">
              <FaDollarSign />
            </div>
          </div>
          <div className="summary-card expected-balance">
            <h3>Saldo Previsto</h3>
            <p className="amount">R$ 0,00</p>
            <div className="icon">
              <FaWallet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
