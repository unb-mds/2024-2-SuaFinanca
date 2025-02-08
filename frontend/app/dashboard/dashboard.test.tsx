/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Dashboard from "../dashboard/page"; // Certifique-se que o caminho está correto
import { useRouter } from "next/navigation";

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
    render(<Dashboard />);
    
    // Aguarda e verifica se o header contém "Olá, Usuário Teste"
    await waitFor(() => {
      expect(screen.getByText(/Olá,\s*Usuário Teste/)).toBeInTheDocument();
    });
  });

  test("Redireciona para /login se não houver username no localStorage", async () => {
    render(<Dashboard />);
    
    // Aguarda que o router seja chamado com "/login"
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  test("Alterna classe da sidebar ao clicar no botão de toggle", () => {
    // Define o username para garantir que o Dashboard seja renderizado
    localStorage.setItem("username", "Usuário Teste");
    const { container } = render(<Dashboard />);
    
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
    // Define os dados de teste de acordo com a implementação do componente
    localStorage.setItem("token", "token123");
    localStorage.setItem("username", "Usuário Teste");
    sessionStorage.setItem("algumaChave", "algumValor");
    
    const { container } = render(<Dashboard />);
    
    // Seleciona o botão de logout pelo seletor de classe, pois não há data-testid
    const logoutButton = container.querySelector(".logout-button");
    
    // Clica no botão de logout (se encontrado)
    if (logoutButton) {
      fireEvent.click(logoutButton);
    }
    
    // Verifica se os itens foram removidos do storage e se o redirecionamento foi disparado
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("username")).toBeNull();
    expect(sessionStorage.length).toBe(0);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});