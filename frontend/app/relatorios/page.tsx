"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight, FaDownload } from "react-icons/fa"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import "./relatorios.css"
import Layout from "../components/Layout"
import { useAuth } from "../contexts/AuthContext"

ChartJS.register(ArcElement, Tooltip, Legend)

const months = [
  "Janeiro ", "Fevereiro ", "Março ", "Abril ", "Maio ", "Junho ",
  "Julho ", "Agosto ", "Setembro ", "Outubro ", "Novembro ", "Dezembro " 
]

export default function Relatorios() {
  const { isAuthenticated } = useAuth()
  const [currentMonthIndex, setCurrentMonthIndex] = useState(months.length - 1)

  const chartData = {
    labels: ["Categoria 1", "Categoria 2", "Categoria 3", "Categoria 4"],
    datasets: [
      {
        data: [25, 25, 25, 25],
        backgroundColor: ["#FFE600", "#FF9900", "#6666FF", "#4CAF50"],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          font: {
            size: 10,
          },
        },
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  }

  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : months.length - 1))
  }

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex < months.length - 1 ? prevIndex + 1 : 0))
  }

  const handleDownloadAll = () => {
    // Add download logic here
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar os relatórios</p>
          <Link href="/dashboard">
            <button>Voltar para o Dashboard</button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="content-area">
          <div className="header-section">
            <Link href="/dashboard" className="back-button">
              <FaArrowLeft />
            </Link>
            <h1 className="page-title">Relatórios</h1>
          </div>

          <div className="month-selector">
            <button onClick={previousMonth} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{months[currentMonthIndex]}</span>
            <button onClick={nextMonth} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>

          <div className="charts-container">
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Conta BB</h3>
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div className="chart-card">
                <h3>Conta Itaú</h3>
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div className="chart-card">
                <h3>Conta NuBank</h3>
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div className="chart-card">
                <h3>Conta PicPay</h3>
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="summary-charts">
              <div className="chart-card">
                <h3>Receitas</h3>
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div className="chart-card">
                <h3>Despesas</h3>
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>

            <button className="download-button" onClick={handleDownloadAll}>
              <FaDownload /> Baixar todos
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

