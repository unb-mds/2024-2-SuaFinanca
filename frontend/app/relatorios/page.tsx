"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight, FaDownload } from "react-icons/fa"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import "./relatorios.css"
import Dashboard from "../dashboard/page"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Relatorios() {
  const [currentMonth, setCurrentMonth] = useState("Dezembro 2024")

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
          boxWidth: 15,
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
    // Add month navigation logic here
  }

  const nextMonth = () => {
    // Add month navigation logic here
  }

  const handleDownloadAll = () => {
    // Add download logic here
  }

  return (
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
            <span className="current-month">{currentMonth}</span>
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
  )
}

