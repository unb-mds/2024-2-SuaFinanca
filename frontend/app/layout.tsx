import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./contexts/AuthContext"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sua Finança",
  description: "Gerencie suas finanças pessoais",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

