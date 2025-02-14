"use client";


import { useState, useEffect } from "react";
import { FaWallet, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import Login from "../login/page";

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


export default function Dashboard() {
  const { isAuthenticated, username } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

  // Armazenam as transações filtradas do mês
  const [receitas, setReceitas] = useState<any[]>([]);
  const [despesas, setDespesas] = useState<any[]>([]);

  // Saldo total (todas as transações de todos os meses)
  const [saldoTotal, setSaldoTotal] = useState(0);

  // Dicionário de categorias, caso queira usar por ID ou exibir de outras formas
  const [, setCategorias] = useState<{ [key: string]: string }>({});

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchTransacoes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/recent?limit=100`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar transações: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Resposta da API de transações:", data);

        if (!data || !data.recent || !Array.isArray(data.recent.transaction)) {
          throw new Error("Resposta inválida da API: estrutura inesperada");
        }

        const transacoes = data.recent.transaction;

        // Filtra receitas e despesas do mês selecionado
        const receitasMes = transacoes.filter(
          (item: any) =>
            item.type === "INCOME" && new Date(item.date).getMonth() === currentMonthIndex
        );

        const despesasMes = transacoes.filter(
          (item: any) =>
            item.type === "EXPENSE" && new Date(item.date).getMonth() === currentMonthIndex
        );

        setReceitas(receitasMes);
        setDespesas(despesasMes);

        // Calcula o saldo total (considerando todos os meses)
        const saldoTotalCalculado = transacoes.reduce((total: number, t: any) => {
          return t.type === "INCOME" ? total + t.amount : total - t.amount;
        }, 0);

        setSaldoTotal(saldoTotalCalculado);

        // Em paralelo, busca todas as categorias (caso queira usá-las)
        fetchCategorias();
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar categorias: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Resposta da API de categorias:", data);

        if (!data || !data.category || !Array.isArray(data.category)) {
          throw new Error("Estrutura da API inesperada para categorias.");
        }

        // Cria um dicionário { [idCategoria]: nomeCategoria }
        const categoryMap: { [key: string]: string } = {};
        data.category.forEach((cat: any) => {
          categoryMap[cat.id] = cat.name;
        });

        setCategorias(categoryMap);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchTransacoes();
  }, [currentMonthIndex, token, isAuthenticated, BASE_URL]);

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };


  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : months.length - 1
    );
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex < months.length - 1 ? prevIndex + 1 : 0
    );
  };


  return (
    <Layout>
      <div className="dashboard-content">
        <div className="dashboard-header">

          <div className="month-selector">
            <button onClick={previousMonth} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{months[currentMonthIndex]}</span>
            <button onClick={nextMonth} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>
          <div className="welcome-message">
            Olá, {isAuthenticated ? username : "visitante"}

          </div>
        </div>

        <div className="cards-grid">
          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Saldo Total</h3>
                <FaWallet className="card-icon" />
              </div>
              <p className="card-value">

                {isAuthenticated ? `R$ ${saldoTotal.toFixed(2)}` : "****"}

              </p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Receitas (Mês)</h3>
                <FaArrowUp className="card-icon income" />
              </div>
              <p className="card-value">

                {isAuthenticated
                  ? `R$ ${receitas.reduce((sum, r) => sum + r.amount, 0).toFixed(2)}`
                  : "****"}

              </p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Despesas (Mês)</h3>
                <FaArrowDown className="card-icon expense" />
              </div>
              <p className="card-value">

                {isAuthenticated
                  ? `R$ ${despesas.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}`
                  : "****"}

              </p>
            </div>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="dashboard-sections">
            {/* Listagem de Receitas */}
            <div className="section-card">
              <h3>Receitas</h3>
              <ul>
                {receitas.length > 0 ? (
                  receitas.map((receita, index) => (
                    <li key={index}>
                      {/* Data da transação */}
                      {new Date(receita.date).toLocaleDateString("pt-BR")} -{" "}
                      {/* Exibe o categoryName direto da transação, ou "Sem categoria" */}
                      {receita.categoryName || "Sem categoria"}: R${" "}
                      {receita.amount.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <p>Nenhuma receita registrada</p>
                )}
              </ul>
            </div>

            {/* Listagem de Despesas */}
            <div className="section-card">
              <h3>Despesas</h3>
              <ul>
                {despesas.length > 0 ? (
                  despesas.map((despesa, index) => (
                    <li key={index}>
                      {new Date(despesa.date).toLocaleDateString("pt-BR")} -{" "}
                      {despesa.categoryName || "Sem categoria"}: R${" "}
                      {despesa.amount.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <p>Nenhuma despesa registrada</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="login-prompt">
            <p>Faça login para acessar todos os recursos</p>
            <button onClick={() => setShowLogin(true)}>Entrar</button>
          </div>
        )}

        {showLogin && (
          <div className="login-overlay">

            <Login onLoginSuccess={handleLoginSuccess} />

          </div>
        )}
      </div>
    </Layout>
  );
}
