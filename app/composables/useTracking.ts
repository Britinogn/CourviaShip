import type { ITrackingShipment } from "~/types";
import { apiClient } from "~/utils/api";
import { useTrackingStore } from "~/stores/trackingStore";

export function useTracking() {
    const trackingStore = useTrackingStore()

    async function trackShipment(trackingId: string) {
        try {
            trackingStore.setPending(true)
            trackingStore.setError(null)

            const response = await $fetch<any>(`/tracking/${trackingId}`, {
                ...apiClient()
            })

            // Backend returns { success, data: { ... actual shipment } }
            if (!response.success || !response.data) {
                throw new Error(response.message || 'No shipment found')
            }

            // Extract the inner data object
            const shipmentData = response.data

            // Optional: Validate shape if you want strict typing
            trackingStore.setTrackingShipment(shipmentData as ITrackingShipment)

            return {
                data: shipmentData,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to track shipment'
            trackingStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            trackingStore.setPending(false)
        }
    }

    return {
        trackShipment
    }
}