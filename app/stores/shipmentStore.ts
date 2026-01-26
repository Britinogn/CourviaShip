import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IShipment, ITrackingShipment } from '@/types'
import { ShipmentStatus } from '@/types'

export const useShipmentStore = defineStore('shipment', () => {
    // --- State ---
    const shipments = ref<IShipment[]>([])
    const trackingShipment = ref<ITrackingShipment | null>(null)
    const pending = ref(false)
    const error = ref<string | null>(null)

    // --- Getters / Computed ---
    const totalShipments = computed(() => shipments.value.length)

    const deliveredShipments = computed(() =>
        shipments.value.filter(s => s.status === ShipmentStatus.Delivered)
    )

    const inTransitShipments = computed(() =>
        shipments.value.filter(s =>
        [
            ShipmentStatus.InTransit,
            ShipmentStatus.EnRoute,
            ShipmentStatus.AtHub,
            ShipmentStatus.OutForDelivery
        ].includes(s.status)
        )
    )

    // --- Actions (state setters / clearers) ---
    const setShipments = (newShipments: IShipment[]) => {
        shipments.value = newShipments
    }

    const setTrackingShipment = (shipment: ITrackingShipment) => {
        trackingShipment.value = shipment
    }

    const clearShipments = () => {
        shipments.value = []
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

    // --- Return everything ---
    return {
        shipments,
        trackingShipment,
        pending,
        error,
        totalShipments,
        deliveredShipments,
        inTransitShipments,
        setShipments,
        setTrackingShipment,
        clearShipments,
        clearTrackingShipment,
        setPending,
        setError
    }
})
