"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Dashboard from "./dashboard/page"
import Login from "./login/page"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
    // Check if showLogin parameter is present in URL
    const shouldShowLogin = searchParams.get("showLogin") === "true"
    if (shouldShowLogin) {
      setShowLogin(true)
    }
  }, [searchParams])

  const handleLoginClick = () => {
    setShowLogin(true)
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setShowLogin(false)
  }

  const handleLoginClose = () => {
    setShowLogin(false)
    // Remove the showLogin parameter from URL
    const url = new URL(window.location.href)
    url.searchParams.delete("showLogin")
    window.history.replaceState({}, "", url.toString())
  }

  return (
    <div className="app-container">
      <Dashboard isAuthenticated={isAuthenticated} onLoginClick={handleLoginClick} />
      {showLogin && (
        <div className="login-overlay">
          <div className="login-modal">
            <button className="close-button" onClick={handleLoginClose}>
              ×
            </button>
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  )
}

