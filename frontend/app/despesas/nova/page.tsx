"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import "./nova-despesa.css";
import { useAuth } from "../../contexts/AuthContext";

export default function NovaDespesa() {
  const { isAuthenticated } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  const [valor, setValor] = useState("0.00");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriasExistentes, setCategoriasExistentes] = useState<string[]>([]);
  const [dataPagamento, setDataPagamento] = useState("HOJE");
  const [dataPersonalizada, setDataPersonalizada] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (!isAuthenticated || !token) return;

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
        if (!data || !data.category || !Array.isArray(data.category)) {
          throw new Error("Estrutura da API inesperada para categorias.");
        }

        setCategoriasExistentes(data.category.map((c: any) => c.name));
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategorias();
  }, [token, isAuthenticated, BASE_URL]);

  const criarCategoria = async (categoriaNome: string) => {
    if (!categoriaNome || categoriasExistentes.includes(categoriaNome)) {
      return categoriaNome;
    }

    try {
      const response = await fetch(`${BASE_URL}/category`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoriaNome }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar categoria: ${response.statusText}`);
      }

      setCategoriasExistentes((prev) => [...prev, categoriaNome]);
      return categoriaNome;
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !token) {
      alert("Usuário não autenticado! Faça login para continuar.");
      return;
    }

    let formattedDate = new Date().toISOString().split("T")[0];
    if (dataPagamento === "ONTEM") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      formattedDate = yesterday.toISOString().split("T")[0];
    } else if (dataPagamento === "OUTROS") {
      formattedDate = dataPersonalizada;
    }

    const categoriaFinal = await criarCategoria(categoria);
    if (!categoriaFinal) {
      alert("Erro ao definir a categoria.");
      return;
    }

    const payload = {
      type: "EXPENSE",
      amount: parseFloat(valor),
      categoryName: categoriaFinal,
      description: descricao,
      date: formattedDate,
    };

    try {
      const response = await fetch(`${BASE_URL}/transaction`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao criar despesa: ${errorData.message || response.statusText}`);
      }

      alert("Despesa criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar despesa:", error);
      alert("Erro ao criar despesa. Tente novamente.");
    }

  };

  return (
    <div className="new-transaction-container">
      <div className="new-transaction-card">
        <div className="header-section">
          <Link href="/despesas" className="back-button">
            <FaArrowLeft />
          </Link>
          <h1 className="page-title">Nova Despesa</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="value-input">
            <span className="currency">R$</span>
            <input type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0.00" />
          </div>

          <div className="date-selector">
            <button type="button" className={dataPagamento === "HOJE" ? "active" : ""} onClick={() => setDataPagamento("HOJE")}>HOJE</button>
            <button type="button" className={dataPagamento === "ONTEM" ? "active" : ""} onClick={() => setDataPagamento("ONTEM")}>ONTEM</button>
            <button type="button" className={dataPagamento === "OUTROS" ? "active" : ""} onClick={() => setDataPagamento("OUTROS")}>OUTROS</button>
          </div>

          {dataPagamento === "OUTROS" && (
            <div className="input-field">
              <input type="date" value={dataPersonalizada} onChange={(e) => setDataPersonalizada(e.target.value)} />
            </div>
          )}


          <div className="input-field">
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecione uma categoria...</option>
              {categoriasExistentes.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>


          <div className="input-field">
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ou digite uma nova categoria" />
          </div>

          <div className="input-field">
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Digite a descrição da despesa" />
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button danger">Salvar Despesa</button>
          </div>
        </form>
      </div>
    </div>
  );
}

