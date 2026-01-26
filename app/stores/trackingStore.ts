import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ITrackingShipment } from '@/types'

export const useTrackingStore = defineStore('tracking', () => {
    // --- State ---
    const trackingShipment = ref<ITrackingShipment | null>(null)
    const pending = ref(false)
    const error = ref<string | null>(null)

    // --- Getters / Computed ---
    const isTracking = computed(() => !!trackingShipment.value)
    const currentStatus = computed(() => trackingShipment.value?.status || null)
    const isDelayed = computed(() => trackingShipment.value?.status === 'Delayed')

    // --- Actions ---
    const setTrackingShipment = (shipment: ITrackingShipment) => {
        trackingShipment.value = shipment
    }

    const clearTrackingShipment = () => {
        trackingShipment.value = null
    }

    const setPending = (value: boolean) => {
        pending.value = value
    }

    const setError = (message: string | null) => {
        error.value = message
    }

    // --- Return state, getters, actions ---
    return {
        trackingShipment,
        pending,
        error,
        isTracking,
        currentStatus,
        isDelayed,
        setTrackingShipment,
        clearTrackingShipment,
        setPending,
        setError
    }
})
