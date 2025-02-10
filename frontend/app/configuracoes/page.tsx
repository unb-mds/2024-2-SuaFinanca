"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaUser, FaPencilAlt } from "react-icons/fa";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "./configuracoes.css";

export default function Configuracoes() {
  const { isAuthenticated, username, logout } = useAuth();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [email, setEmail] = useState("exemplo@gmail.com");
  const [password, setPassword] = useState("senhasegura123");

  const handleDeleteAccount = () => {
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuário não autenticado!");
        return;
      }
      
      await axios.delete("http://localhost:8000/user/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      await logout();
      alert("Conta apagada com sucesso!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erro ao apagar conta:", error);
      alert("Erro ao apagar conta. Tente novamente.");
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar as configurações</p>
          <Link href="/dashboard">
            <button>Voltar para o Dashboard</button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="config-container">
        <div className="config-card">
          <div className="header-section">
            <Link href="/dashboard" className="back-button">
              <FaArrowLeft />
            </Link>
            <h1 className="page-title">Configurações</h1>
          </div>

          <div className="avatar-container">
            <div className="avatar">
              <FaUser />
            </div>
            <div className="edit-icon">
              <FaPencilAlt size={12} />
            </div>
          </div>

          <h2 className="greeting">Olá, {username}</h2>

          <div className="input-field">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>

          <div className="input-field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
          </div>

          <button className="delete-button" onClick={handleDeleteAccount}>
            Apagar conta!
          </button>
        </div>

        {showDeleteAlert && (
          <div className="alert-overlay">
            <div className="alert-dialog">
              <h3 className="alert-title">Atenção!</h3>
              <p className="alert-message">
                Tem certeza que deseja apagar sua conta? Esta ação não pode ser desfeita e todos os seus dados serão
                perdidos permanentemente.
              </p>
              <div className="alert-buttons">
                <button className="alert-cancel" onClick={() => setShowDeleteAlert(false)}>
                  Cancelar
                </button>
                <button className="alert-confirm" onClick={confirmDelete}>
                  Sim, apagar conta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
