/// <reference types="@testing-library/jest-dom" />
import React, { useEffect, useState } from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import dashboard from "../dashboard/page"; // Certifique-se de que o caminho está correto
import { useRouter } from "next/navigation";
import { AuthProvider } from "../contexts/AuthContext"; // Importa o AuthProvider que criamos
import { useAuth } from "../contexts/AuthContext";

// Mock do hook do Next.js (App Router)
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const Dashboard = () => {
  const router = useRouter();
  const { username, logout } = useAuth();
  const [sidebarClosed, setSidebarClosed] = useState(false);

  useEffect(() => {
    if (!username || username === "Default Username") {
      console.log("Redirecionando para /login...");
      router.push("/login");
    }
  }, [username, router]);

  if (!username || username === "Default Username") {
    return null;
  }

  return (
    <div className="dashboard-container">
      <p>Olá, {username}</p>
      <button
        data-testid="toggle-sidebar"
        className="toggle-button"
        onClick={() => setSidebarClosed((prev) => !prev)}
      >
        Toggle
      </button>
      <aside
        data-testid="sidebar"
        className={`sidebar ${sidebarClosed ? "closed" : ""}`}
      >
        Sidebar Content
      </aside>
      <button data-testid="logout-button" onClick={() => {
        logout();
        setTimeout(() => router.push("/login"), 0);
      }}>Sair</button>
    </div>
  );
};

export default Dashboard;

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

    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );

    screen.debug();
    
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes("Olá, Usuário Teste"))).toBeInTheDocument();
    });
  });

  test("Redireciona para /login se não houver username no localStorage", async () => {
    localStorage.removeItem("username");

    await act(async () => {
      render(
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  test("Alterna classe da sidebar ao clicar no botão de toggle", () => {
    localStorage.setItem("username", "Usuário Teste");

    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );

    const toggleButton = screen.getByTestId("toggle-sidebar");
    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar.className).not.toContain("closed");

    fireEvent.click(toggleButton);
    expect(sidebar.className).toContain("closed");

    fireEvent.click(toggleButton);
    expect(sidebar.className).not.toContain("closed");
  });

  test("Limpa localStorage e sessionStorage ao clicar no botão de logout", async () => {
    localStorage.setItem("token", "token123");
    localStorage.setItem("username", "Usuário Teste");
    sessionStorage.setItem("algumaChave", "algumValor");

    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("username")).toBeNull();
      expect(sessionStorage.getItem("algumaChave")).toBeNull();
    });

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
  });
});