import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IShipment, StatusCount, CountryCount, TimePeriod, Route, DashboardOverview} from '@/types'



export const useDashboardStore = defineStore('dashboard', () => {
    // --- State ---
    const overview = ref<DashboardOverview | null>(null)
    const totalShipments = ref<number>(0)
    const statusBreakdown = ref<StatusCount[]>([])
    const recentShipments = ref<IShipment[]>([])
    const shipmentsByCountry = ref<CountryCount[]>([])
    const shipmentsByTimePeriod = ref<TimePeriod[]>([])
    const popularRoutes = ref<Route[]>([])
    const pending = ref(false)
    const error = ref<string | null>(null)

    // --- Computed ---
    const hasData = computed(() => !!overview.value)
    
    // const deliveredCount = computed(() => {
    //     return statusBreakdown.value.find(s => s._id === 'Delivered')?.count || 0
    // })

    // const inTransitCount = computed(() => {
    //     return statusBreakdown.value.find(s => s._id === 'InTransit')?.count || 0
    // })

    const deliveredCount = computed(() => {
    return statusBreakdown.value.find(s => s.status === 'Delivered')?.count || 0
    })

    const inTransitCount = computed(() => {
        return statusBreakdown.value.find(s => s.status === 'InTransit')?.count || 0
    })

    const pendingCount = computed(() => {
        return statusBreakdown.value.find(s => s.status === 'Pending')?.count || 0
    })

    const topCountry = computed(() => {
        return shipmentsByCountry.value[0]?.country || 'N/A'
    })

    const topRoute = computed(() => {
        return popularRoutes.value[0]?.route || 'N/A'
    })

    // --- Actions ---
    // const setOverview = (data: DashboardOverview) => {
    //     overview.value = data
    //     totalShipments.value = data.totalShipments
    //     statusBreakdown.value = data.statusBreakdown
    //     recentShipments.value = data.recentShipments
    //     shipmentsByCountry.value = data.shipmentsByCountry
    //     shipmentsByTimePeriod.value = data.shipmentsByTimePeriod
    //     popularRoutes.value = data.popularRoutes
    // }
    const setOverview = (data: any) => {
    overview.value = data
    totalShipments.value = data.totalShipments
    statusBreakdown.value = data.shipmentsByStatus    
    recentShipments.value = data.recentShipments
    shipmentsByCountry.value = data.topOrigins         
    shipmentsByTimePeriod.value = data.timePeriod    
    popularRoutes.value = data.popularRoutes
}

    const setTotalShipments = (count: number) => {
        totalShipments.value = count
    }

    const setStatusBreakdown = (data: StatusCount[]) => {
        statusBreakdown.value = data
    }

    const setRecentShipments = (shipments: IShipment[]) => {
        recentShipments.value = shipments
    }

    const setShipmentsByCountry = (data: CountryCount[]) => {
        shipmentsByCountry.value = data
    }

    const setShipmentsByTimePeriod = (data: TimePeriod[]) => {
        shipmentsByTimePeriod.value = data
    }

    const setPopularRoutes = (routes: Route[]) => {
        popularRoutes.value = routes
    }

    const setPending = (value: boolean) => {
        pending.value = value
    }

    const setError = (message: string | null) => {
        error.value = message
    }

    const clearDashboard = () => {
        overview.value = null
        totalShipments.value = 0
        statusBreakdown.value = []
        recentShipments.value = []
        shipmentsByCountry.value = []
        shipmentsByTimePeriod.value = []
        popularRoutes.value = []
        error.value = null
    }

    // --- Return ---
    return {
        // State
        overview,
        totalShipments,
        statusBreakdown,
        recentShipments,
        shipmentsByCountry,
        shipmentsByTimePeriod,
        popularRoutes,
        pending,
        error,

        // Computed
        hasData,
        deliveredCount,
        inTransitCount,
        pendingCount,
        topCountry,
        topRoute,

        // Actions
        setOverview,
        setTotalShipments,
        setStatusBreakdown,
        setRecentShipments,
        setShipmentsByCountry,
        setShipmentsByTimePeriod,
        setPopularRoutes,
        setPending,
        setError,
        clearDashboard
    }
})