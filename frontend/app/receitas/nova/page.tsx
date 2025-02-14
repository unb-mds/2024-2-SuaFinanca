"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import "./nova-receita.css";
import { useAuth } from "../../contexts/AuthContext";

export default function NovaReceita() {
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

        // Mapeia o campo "name" de cada categoria retornada
        setCategoriasExistentes(data.category.map((c: any) => c.name));
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategorias();
  }, [token, isAuthenticated, BASE_URL]);

  // Criar categoria se não existir
  const criarCategoria = async (categoriaNome: string) => {
    // Se não houver nome ou já existir na lista, simplesmente retorne
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

      // Retorna o nome da categoria criada
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

    // Definir a data correta com base na seleção do usuário
    let formattedDate = new Date().toISOString().split("T")[0];
    if (dataPagamento === "ONTEM") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      formattedDate = yesterday.toISOString().split("T")[0];
    } else if (dataPagamento === "OUTROS") {
      formattedDate = dataPersonalizada;
    }

    // Criar categoria antes de cadastrar a receita
    const categoriaFinal = await criarCategoria(categoria);
    if (!categoriaFinal) {
      alert("Erro ao definir a categoria.");
      return;
    }

    // Ajuste aqui: agora usamos "categoryName" em vez de "category"
    const payload = {
      type: "INCOME",
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
        throw new Error(
          `Erro ao criar receita: ${errorData.message || response.statusText}`
        );
      }

      alert("Receita criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar receita:", error);
      alert("Erro ao criar receita. Tente novamente.");
    }

  };

  return (
    <div className="new-transaction-container">
      <div className="new-transaction-card">
        <div className="header-section">
          <Link href="/receitas" className="back-button">
            <FaArrowLeft />
          </Link>
          <h1>Nova Receita</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="value-input">
            <span className="currency">R$</span>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="date-selector">
            <button
              type="button"
              className={dataPagamento === "HOJE" ? "active" : ""}
              onClick={() => setDataPagamento("HOJE")}
            >
              HOJE
            </button>
            <button
              type="button"
              className={dataPagamento === "ONTEM" ? "active" : ""}
              onClick={() => setDataPagamento("ONTEM")}
            >
              ONTEM
            </button>
            <button
              type="button"
              className={dataPagamento === "OUTROS" ? "active" : ""}
              onClick={() => setDataPagamento("OUTROS")}
            >
              OUTROS
            </button>
          </div>


          {dataPagamento === "OUTROS" && (
            <div className="input-field">
              <input
                type="date"
                value={dataPersonalizada}
                onChange={(e) => setDataPersonalizada(e.target.value)}
              />
            </div>
          )}

          {/* Select para escolher categoria existente */}
          <div className="input-field">
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecione uma categoria...</option>
              {categoriasExistentes.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de texto para digitar nova categoria */}
          <div className="input-field">
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Ou digite uma nova categoria"
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição da receita"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              Salvar Receita

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
