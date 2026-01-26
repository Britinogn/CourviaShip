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

    // Optional: Add more useful computed properties
    const pendingShipments = computed(() =>
        shipments.value.filter(s => s.status === ShipmentStatus.AtHub)
    )

    const cancelledShipments = computed(() =>
        shipments.value.filter(s => s.status === ShipmentStatus.Cancelled)
    )

    // --- Actions ---
    const setShipments = (newShipments: IShipment[]) => {
        shipments.value = newShipments
    }

    const setTrackingShipment = (shipment: ITrackingShipment) => {
        trackingShipment.value = shipment
    }

    const clearShipments = () => {
        shipments.value = []
        error.value = null
    }

    const clearTrackingShipment = () => {
        trackingShipment.value = null
        error.value = null
    }

    const setPending = (value: boolean) => {
        pending.value = value
    }

    const setError = (message: string | null) => {
        error.value = message
    }

    // Optional: Add shipment by ID
    const addShipment = (shipment: IShipment) => {
        shipments.value.push(shipment)
    }

    // const updateShipment = (id: string, updates: Partial<IShipment>) => {
    //     const index = shipments.value.findIndex(s => s._id === id)
    //     if (index !== -1) {
    //         shipments.value[index] = { ...shipments.value[index], ...updates }
    //     }
    // }

    const updateShipment = (trackingId: string, updates: Partial<IShipment>) => {
        shipments.value = shipments.value.map(s => 
            s._id === trackingId ? { ...s, ...updates } : s
        )
    }

    const deleteShipment = (trackingId: string) => {
        shipments.value = shipments.value.filter(s => s._id !== trackingId)
    }

    // --- Return ---
    return {
        // State (consider making readonly)
        shipments,
        trackingShipment,
        pending,
        error,
        
        // Computed
        totalShipments,
        deliveredShipments,
        inTransitShipments,
        pendingShipments,
        cancelledShipments,
        
        // Actions
        setShipments,
        setTrackingShipment,
        clearShipments,
        clearTrackingShipment,
        setPending,
        setError,
        addShipment,
        updateShipment,
        deleteShipment
    }
})