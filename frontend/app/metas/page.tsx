"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight, FaPlus, FaBullseye, FaCheckCircle } from "react-icons/fa"
import "./metas.css"
import Dashboard from "../dashboard/page"

export default function Metas() {
  const [currentMonth, setCurrentMonth] = useState("Dezembro 2024")
  const [goals, setGoals] = useState([])

  const previousMonth = () => {
    // Add month navigation logic here
  }

  const nextMonth = () => {
    // Add month navigation logic here
  }

  const handleNewGoal = () => {
    // Add new goal logic here
  }

  return (
      <div className="page-container">
        <div className="content-area">
          <div className="header-section">
            <Link href="/dashboard" className="back-button">
              <FaArrowLeft />
            </Link>
            <h1 className="page-title">Metas</h1>
          </div>

          <div className="month-selector">
            <button onClick={previousMonth} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{currentMonth}</span>
            <button onClick={nextMonth} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>

          <div className="goals-grid">
            <button className="new-goal-card" onClick={handleNewGoal}>
              <div className="new-goal-content">
                <FaPlus className="plus-icon" />
                <span>Nova Meta</span>
              </div>
            </button>
            {goals.map((goal) => (
              // Goals will be rendered here
              <div key={goal.id} className="goal-card">
                {/* Goal details */}
              </div>
            ))}
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <h3>Saldo Atual</h3>
            <p className="amount">R$ 0,00</p>
            <div className="icon">
              <FaBullseye />
            </div>
          </div>
          <div className="summary-card">
            <h3>Metas Concluídas</h3>
            <p className="amount">0</p>
            <div className="icon">
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>
  )
}

