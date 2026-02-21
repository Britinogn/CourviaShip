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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
                // timePeriod?.last60Days ?? 0,
            ],
            borderColor: '#16a34a',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            tension: 0.4,
            fill: true
        }]
    }
})

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
</script>

<style scoped>
.chart-container {
    height: 300px;
    width: 100%;
}
</style>