"use client";

import { useState } from "react";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    password: "",
    confirmPassword: "",
    datadenascimento: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não correspondem!");
      return;
    }

    console.log({
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      email: formData.email,
      password: formData.password,
      datadenascimento: formData.datadenascimento,
    });

    setError(""); // Limpa o erro caso tenha
    alert("Usuário registrado com sucesso!");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registrar</h1>
        {error && <p className="error-message">{error}</p>} {/* Mensagem de erro */}
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
        <div>
          <input
            type="date"
            placeholder="Data de nascimento"
            name="datadenascimento"
            value={formData.datadenascimento}
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
