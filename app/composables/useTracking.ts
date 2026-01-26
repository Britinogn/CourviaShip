import type { ITrackingShipment } from "~/types";
import { apiClient } from "~/utils/api";
import { useTrackingStore } from "~/stores/trackingStore";

export function useTracking() {
    const trackingStore = useTrackingStore()

    async function trackShipment(trackingId: string) {
        try {
            trackingStore.setPending(true)
            trackingStore.setError(null)

            const data = await $fetch<ITrackingShipment>(`/tracking/${trackingId}`, {
                ...apiClient()
            })

            trackingStore.setTrackingShipment(data)

            return {
                data,
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