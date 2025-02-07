// tests/Dashboard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Dashboard from "../components/Dashboard";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
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

  test("Renderiza corretamente o username do localStorage", () => {
    // Arrange: Configuração inicial
    localStorage.setItem("username", "Usuário Teste");
    render(<Dashboard />);

    // Act: Nenhuma ação necessária
    
    // Assert: Verifica se o username foi renderizado corretamente
    expect(screen.getByText("Usuário Teste")).toBeInTheDocument();
  });

  test("Redireciona para /login se não houver username no localStorage", () => {
    // Arrange: Nenhuma configuração adicional necessária
    render(<Dashboard />);

    // Act: Nenhuma ação necessária, apenas renderização
    
    // Assert: Verifica se houve redirecionamento
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  test("Alterna classe da sidebar ao clicar no botão de toggle", () => {
    // Arrange
    render(<Dashboard />);
    const toggleButton = screen.getByTestId("sidebar-toggle");
    const sidebar = screen.getByTestId("sidebar");

    // Act: Clica no botão de toggle
    fireEvent.click(toggleButton);

    // Assert: Verifica se a classe foi alterada
    expect(sidebar).toHaveClass("closed");
  });

  test("Limpa localStorage e sessionStorage ao clicar no botão de logout", () => {
    // Arrange
    localStorage.setItem("authToken", "token123");
    sessionStorage.setItem("sessionData", "data123");
    render(<Dashboard />);
    const logoutButton = screen.getByTestId("logout-button");

    // Act: Clica no botão de logout
    fireEvent.click(logoutButton);

    // Assert: Verifica se os storages foram limpos e se houve redirecionamento
    expect(localStorage.getItem("authToken")).toBeNull();
    expect(sessionStorage.getItem("sessionData")).toBeNull();
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
