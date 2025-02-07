// Dashboard.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "./page"; 
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom"; // Garante os matchers do jest-dom

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Dashboard Component", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    localStorage.clear();
    sessionStorage.clear();
    pushMock.mockClear();
  });

  it("deve renderizar o dashboard com o username armazenado no localStorage", async () => {
    localStorage.setItem("username", "TestUser");
    render(<Dashboard />);
    
    // Debug: imprime o DOM renderizado para ajudar a inspecionar o conteúdo
    screen.debug();
    
    // Tenta encontrar o elemento pelo texto com um timeout aumentado para 2000ms
    const greeting = await screen.findByText(/Olá, TestUser/i, undefined, { timeout: 2000 });
    expect(greeting).toBeInTheDocument();
  });

  it("deve redirecionar para /login se o username não estiver presente no localStorage", async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  it("deve alternar a classe da sidebar ao clicar no botão de toggle", async () => {
    localStorage.setItem("username", "TestUser");
    const { container } = render(<Dashboard />);
    
    // Aguarda que a sidebar esteja presente no DOM
    const sidebar = await waitFor(() => {
      const sb = container.querySelector(".sidebar");
      if (!sb) throw new Error("Sidebar não encontrada");
      return sb;
    });
    
    // Verifica a classe inicial da sidebar
    expect(sidebar.className).toContain("open");
    
    // Seleciona o botão de toggle
    const toggleButton = container.querySelector(".toggle-button");
    if (!toggleButton) throw new Error("Botão de toggle não encontrado");
    
    fireEvent.click(toggleButton);
    
    // Aguarda que a classe da sidebar seja atualizada para "closed"
    await waitFor(() => {
      expect(sidebar.className).toContain("closed");
    });
  });

  it("deve limpar os storages e redirecionar para /login ao clicar no botão de logout", async () => {
    localStorage.setItem("username", "TestUser");
    localStorage.setItem("token", "sometoken");
    render(<Dashboard />);
    
    const logoutButton = screen.getByRole("button", { name: /sair/i });
    fireEvent.click(logoutButton);
    
    await waitFor(() => {
      expect(localStorage.getItem("username")).toBeNull();
      expect(localStorage.getItem("token")).toBeNull();
      expect(sessionStorage.length).toBe(0);
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });
});