"use client";

import { useState } from "react";
import axios from "axios"; // Importa axios
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Adiciona mensagem de sucesso

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação de senha
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não correspondem!");
      return;
    }

    // Prepara os dados para enviar ao back-end
    const userData = {
      name: `${formData.nome} ${formData.sobrenome}`,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Envia a requisição para o back-end
      const response = await axios.post("http://localhost:8000/user", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Usuário criado:", response.data);
      setSuccess("Usuário registrado com sucesso!");
      setError(""); // Limpa mensagens de erro
    } catch (err) {
      console.error("Erro ao criar usuário:", err.response?.data || err.message);
      setError("Ocorreu um erro ao registrar o usuário. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registrar</h1>
        {error && <p className="error-message">{error}</p>} {/* Mensagem de erro */}
        {success && <p className="success-message">{success}</p>} {/* Mensagem de sucesso */}
        <div>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Sobrenome"
            name="sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmar Senha"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button>Registrar</button>
        <div className="login-link">
          <p>
            Já tem uma conta? <a href="/login">Voltar</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
