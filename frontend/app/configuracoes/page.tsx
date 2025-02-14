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
  const [isEditingName, setIsEditingName] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

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

      await axios.delete(`${BASE_URL}/user/delete`, {
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

  const { setUsername } = useAuth(); // Adicione isso para atualizar o contexto

const handleNameEdit = async () => {
  if (!newUsername.trim()) return;
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado!");
      return;
    }

    const response = await axios.patch(
      `${BASE_URL}/user/update`,
      { name: newUsername }, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      alert("Nome atualizado com sucesso!");
      setIsEditingName(false);
      
      // Atualiza o nome no contexto de autenticação para refletir em toda a aplicação
      setUsername(newUsername);
    } else {
      alert("Erro ao atualizar nome.");
    }
  } catch (error) {
    console.error("Erro ao atualizar nome:", error);
    alert("Erro ao atualizar nome. Tente novamente.");
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
            <div className="edit-icon" onClick={() => setIsEditingName(true)}>
              <FaPencilAlt size={12} />
            </div>
          </div>

          {isEditingName ? (
            <div className="input-field">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                autoFocus
              />
            </div>
          ) : (
            <h2 className="greeting">Olá, {username}</h2>
          )}

          <div className="input-field">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>

          <div className="input-field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
          </div>

          {isEditingName ? (
            <button className="save-button" onClick={handleNameEdit}>
              Salvar nome
            </button>
          ) : (
            <button className="delete-button" onClick={handleDeleteAccount}>
              Apagar conta!
            </button>
          )}
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