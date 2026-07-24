<template>
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  const dashboardStore = useDashboardStore()
  
  const chartData = computed(() => {
    const timePeriod = dashboardStore.overview?.timePeriod
  
    return {
      labels: ['Today', 'This Week', 'This Month', 'Last 30 Days'],
      datasets: [{
        label: 'Shipments',
        data: [
          timePeriod?.today ?? 0,
          timePeriod?.thisWeek ?? 0,
          timePeriod?.thisMonth ?? 0,
          timePeriod?.last30Days ?? 0,
        ],
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#16a34a',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    }
  })
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#111827',
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    height: 240px;
    width: 100%;
  }
  
  @media (min-width: 640px) {
    .chart-container {
      height: 300px;
    }
  }
  </style>