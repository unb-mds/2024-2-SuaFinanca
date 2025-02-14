// components/PageWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  let pageClass = "";

  if (pathname.startsWith("/despesas")) {
    pageClass = "despesas-page";
  } else if (pathname.startsWith("/receitas")) {
    pageClass = "receitas-page";
  } else if (pathname.startsWith("/saldo")) {
    pageClass = "saldo-page";
  } else if (pathname.startsWith("/relatorios")) {
    pageClass = "relatorios-page";
  } else if (pathname.startsWith("/transacoes")) {
    pageClass = "transacoes-page";
  } else if (pathname.startsWith("/metas")) {
    pageClass = "metas-page";
  } else if (pathname.startsWith("/configuracoes")) {
    pageClass = "configuracoes-page";
  }
  // Adicione outros condicionais conforme suas rotas, se necessário.

  return <div className={pageClass}>{children}</div>;
}
