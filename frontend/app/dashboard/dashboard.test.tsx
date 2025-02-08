/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Dashboard from "../dashboard/page"; // Certifique-se de que o caminho está correto
import { useRouter } from "next/navigation";

// Mock do AuthContext usando o mock manual criado em __mocks__
jest.mock("frontend/app/contexts/mocks/AuthContext.tsx");

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
    localStorage.setItem("username", "Usuário Teste");
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Olá,\s*Usuário Teste/)).toBeInTheDocument();
    });
  });

  test("Redireciona para /login se não houver username no localStorage", async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  test("Alterna classe da sidebar ao clicar no botão de toggle", () => {
    localStorage.setItem("username", "Usuário Teste");
    const { container } = render(<Dashboard />);
    
    const toggleButton = container.querySelector(".toggle-button");
    const sidebar = container.querySelector(".sidebar");
    
    expect(sidebar?.className).toContain("open");
    
    if (toggleButton) {
      fireEvent.click(toggleButton);
    }
    
    expect(sidebar?.className).toContain("closed");
  });

  test("Limpa localStorage e sessionStorage ao clicar no botão de logout", () => {
    localStorage.setItem("token", "token123");
    localStorage.setItem("username", "Usuário Teste");
    sessionStorage.setItem("algumaChave", "algumValor");
    
    const { container } = render(<Dashboard />);
    
    const logoutButton = container.querySelector(".logout-button");
    
    if (logoutButton) {
      fireEvent.click(logoutButton);
    }
    
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("username")).toBeNull();
    expect(sessionStorage.length).toBe(0);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});