// frontend/app/contexts/__mocks__/AuthContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

export type AuthContextType = {
  user: { name: string; email: string } | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

// Cria um contexto dummy com um valor padrão
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Em um ambiente de testes, não queremos que esse erro ocorra
    // Retorne um valor dummy ou apenas não lance o erro
    return {
      user: { name: "Dummy User", email: "dummy@example.com" },
      login: async () => {},
      logout: async () => {},
    };
  }
  return context;
};

// Um Provider dummy que apenas renderiza os children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dummyValue: AuthContextType = {
    user: { name: "Dummy User", email: "dummy@example.com" },
    login: async () => {},
    logout: async () => {},
  };
  return (
    <AuthContext.Provider value={dummyValue}>
      {children}
    </AuthContext.Provider>
  );
};