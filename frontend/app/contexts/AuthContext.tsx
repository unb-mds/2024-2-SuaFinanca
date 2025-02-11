import React, { createContext, useContext, ReactNode } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  username: string;
  user: { name: string; email: string } | null;
  // A função login agora aceita dois parâmetros: token e name.
  login: (token: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Se houver um "username" salvo no localStorage, usaremos ele; caso contrário, usaremos "Default Username".
  const username =
    typeof window !== "undefined" && localStorage.getItem("username")
      ? localStorage.getItem("username")!
      : "Default Username";

  const dummyValue: AuthContextType = {
    isAuthenticated: username !== "Default Username", // Se for diferente do default, considera autenticado
    username,
    user: { name: username, email: "default@example.com" },
    login: async (token: string, name: string) => {
      // Implementação dummy de login: salva os dados no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", name);
    },
    logout: async () => {
      // Implementação dummy de logout: remove os dados do localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      sessionStorage.clear();
    }
  };

  return (
    <AuthContext.Provider value={dummyValue}>
      {children}
    </AuthContext.Provider>
  );
};