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

const chartData = computed(() => ({
    labels: dashboardStore.shipmentsByTimePeriod.map(t => t._id),
    datasets: [{
        label: 'Shipments',
        data: dashboardStore.shipmentsByTimePeriod.map(t => t.count),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
    }]
}))

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