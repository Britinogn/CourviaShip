import type { IShipment, StatusCount, CountryCount, TimePeriodCount, Route, DashboardOverview} from '@/types'
import { apiClient } from "~/utils/api";
import { useDashboardStore } from "~/stores/dashboardStore";

export function useDashboard() {
    const dashboardStore = useDashboardStore()

    // ─── GET DASHBOARD OVERVIEW (All stats in one call) ───
    async function getDashboardOverview() {
        try {
            dashboardStore.setPending(true)
            dashboardStore.setError(null)

            const data = await $fetch<DashboardOverview>('/dashboard/overview', {
                ...apiClient()
            })

            dashboardStore.setOverview(data)

            return {
                data,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch dashboard overview'
            dashboardStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            dashboardStore.setPending(false)
        }
    }

    // ─── GET TOTAL SHIPMENTS COUNT ───
    async function getTotalShipments() {
        try {
            dashboardStore.setPending(true)
            dashboardStore.setError(null)

            const data = await $fetch<{ totalShipments: number }>('/dashboard/total', {
                ...apiClient()
            })

            dashboardStore.setTotalShipments(data.totalShipments)

            return {
                data: data.totalShipments,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch total shipments'
            dashboardStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            dashboardStore.setPending(false)
        }
    }

    // ─── GET SHIPMENTS BY STATUS ───
    async function getShipmentsByStatus() {
        try {
            dashboardStore.setPending(true)
            dashboardStore.setError(null)

            const data = await $fetch<StatusCount[]>('/dashboard/status', {
                ...apiClient()
            })

            dashboardStore.setStatusBreakdown(data)

            return {
                data,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch shipments by status'
            dashboardStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            dashboardStore.setPending(false)
        }
    }

    // ─── GET RECENT SHIPMENTS ───
    async function getRecentShipments(limit: number = 10) {
        try {
            dashboardStore.setPending(true)
            dashboardStore.setError(null)

            const data = await $fetch<IShipment[]>(`/dashboard/recent?limit=${limit}`, {
                ...apiClient()
            })

            dashboardStore.setRecentShipments(data)

            return {
                data,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch recent shipments'
            dashboardStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            dashboardStore.setPending(false)
        }
    }

    // ─── GET SHIPMENTS BY COUNTRY ───
    async function getShipmentsByCountry() {
        try {
            dashboardStore.setPending(true)
            dashboardStore.setError(null)

            const data = await $fetch<CountryCount[]>('/dashboard/country', {
                ...apiClient()
            })

            dashboardStore.setShipmentsByCountry(data)

            return {
                data,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch shipments by country'
            dashboardStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            dashboardStore.setPending(false)
        }
    }

    // ─── GET SHIPMENTS BY TIME PERIOD ───
    async function getShipmentsByTimePeriod() {
        try {
            dashboardStore.setPending(true)
            dashboardStore.setError(null)

            const data = await $fetch<TimePeriodCount[]>('/dashboard/time-period', {
                ...apiClient()
            })

            dashboardStore.setShipmentsByTimePeriod(data)

            return {
                data,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch shipments by time period'
            dashboardStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            dashboardStore.setPending(false)
        }
    }

    // ─── GET POPULAR ROUTES ───
    async function getPopularRoutes(limit: number = 10) {
        try {
            dashboardStore.setPending(true)
            dashboardStore.setError(null)

            const data = await $fetch<Route[]>(`/dashboard/routes?limit=${limit}`, {
                ...apiClient()
            })

            dashboardStore.setPopularRoutes(data)

            return {
                data,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch popular routes'
            dashboardStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            dashboardStore.setPending(false)
        }
    }

    return {
        getDashboardOverview,
        getTotalShipments,
        getShipmentsByStatus,
        getRecentShipments,
        getShipmentsByCountry,
        getShipmentsByTimePeriod,
        getPopularRoutes
    }
}