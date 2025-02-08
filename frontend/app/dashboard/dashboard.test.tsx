/// <reference types="@testing-library/jest-dom" />
import React, { createContext, useContext, ReactNode } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Dashboard from "../dashboard/page"; // Ajuste o caminho se necessário
import { useRouter } from "next/navigation";

// --- Dummy Auth Provider (inline) ---
// Cria um contexto dummy com um valor mínimo para simular um AuthProvider
const DummyAuthContext = createContext({
  user: { name: "Dummy User", email: "dummy@example.com" },
  login: async () => {},
  logout: async () => {},
});

// Cria o DummyAuthProvider que envolve os children com o DummyAuthContext.Provider
const DummyAuthProvider = ({ children }: { children: ReactNode }) => {
  const dummyValue = {
    user: { name: "Dummy User", email: "dummy@example.com" },
    login: async () => {},
    logout: async () => {},
  };
  return (
    <DummyAuthContext.Provider value={dummyValue}>
      {children}
    </DummyAuthContext.Provider>
  );
};

// (Opcional) Se seu código utiliza um hook useAuth para consumir esse contexto, você pode exportá-lo:
export const useAuth = () => {
  return useContext(DummyAuthContext);
};
// --- Fim do Dummy Auth Provider ---

// Mock do hook do Next.js (App Router)
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Dashboard Component", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    localStorage.clear();
    sessionStorage.clear();
  });

  test("Renderiza corretamente o username do localStorage", async () => {
    // Define o username no localStorage
    localStorage.setItem("username", "Usuário Teste");

    // Renderiza o Dashboard envolvido no DummyAuthProvider
    render(
      <DummyAuthProvider>
        <Dashboard />
      </DummyAuthProvider>
    );
    
    // Aguarda e verifica se o header contém "Olá, Usuário Teste"
    await waitFor(() => {
      expect(screen.getByText(/Olá,\s*Usuário Teste/)).toBeInTheDocument();
    });
  });

  test("Redireciona para /login se não houver username no localStorage", async () => {
    render(
      <DummyAuthProvider>
        <Dashboard />
      </DummyAuthProvider>
    );
    
    // Aguarda que o router seja chamado com "/login"
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  test("Alterna classe da sidebar ao clicar no botão de toggle", () => {
    // Define o username para garantir que o Dashboard seja renderizado
    localStorage.setItem("username", "Usuário Teste");
    const { container } = render(
      <DummyAuthProvider>
        <Dashboard />
      </DummyAuthProvider>
    );
    
    // Seleciona os elementos usando os seletores de classe (pois não há data-testid)
    const toggleButton = container.querySelector(".toggle-button");
    const sidebar = container.querySelector(".sidebar");
    
    // Verifica se inicialmente a sidebar tem a classe "open"
    expect(sidebar?.className).toContain("open");
    
    // Clica no botão de toggle (se encontrado)
    if (toggleButton) {
      fireEvent.click(toggleButton);
    }
    
    // Verifica se, após o clique, a sidebar possui a classe "closed"
    expect(sidebar?.className).toContain("closed");
  });

  test("Limpa localStorage e sessionStorage ao clicar no botão de logout", () => {
    // Define os dados de teste conforme o componente remove: as chaves "token" e "username"
    localStorage.setItem("token", "token123");
    localStorage.setItem("username", "Usuário Teste");
    sessionStorage.setItem("algumaChave", "algumValor");
    
    const { container } = render(
      <DummyAuthProvider>
        <Dashboard />
      </DummyAuthProvider>
    );
    
    // Seleciona o botão de logout usando o seletor de classe
    const logoutButton = container.querySelector(".logout-button");
    
    // Clica no botão de logout (se encontrado)
    if (logoutButton) {
      fireEvent.click(logoutButton);
    }
    
    // Verifica se os itens foram removidos do localStorage e sessionStorage,
    // e se o redirecionamento para "/login" foi disparado
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("username")).toBeNull();
    expect(sessionStorage.length).toBe(0);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});