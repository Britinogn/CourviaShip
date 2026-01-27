import type { IShipment, IShipmentResponse, ITrackingShipment } from "~/types";
import { apiClient } from "~/utils/api";
import { useShipmentStore } from "~/stores/shipmentStore";

export function useShipments() {
    const shipmentStore = useShipmentStore()

    async function getAllShipment() {
        try {
            shipmentStore.setPending(true)
            shipmentStore.setError(null)

            const data = await $fetch<IShipment[]>('/shipments', {
                ...apiClient(),
                method: 'GET',
                // body: shipment
            })

            shipmentStore.setShipments(data)

            return {
                data,
                error: null
            }
        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch shipments'
            shipmentStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            shipmentStore.setPending(false)
        }
    }

    async function getShipmentById(trackingId:string) {
        try {
            shipmentStore.setPending(true)
            shipmentStore.setError(null)

            const data = await $fetch<ITrackingShipment>(`/shipments/${trackingId}`, {
                ...apiClient()
            })

            shipmentStore.setTrackingShipment(data)

            return{
                data,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to fetch shipments by Id'
            return {
                data: null,
                error : errorMessage
            }
        } finally{
            shipmentStore.setPending(false)
        }
    }

    async function createShipment(shipment: Omit<IShipment, 'trackingId' | 'userId'> ) {
        try {
            shipmentStore.setPending(true)
            shipmentStore.setError(null)

            const data = await $fetch<IShipmentResponse >('/shipments', {
                ...apiClient(),
                method: 'POST',
                body: shipment
            })

            shipmentStore.addShipment(data.shipment)

            return {
                data,
                error: null
            }

        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to add shipments'
            shipmentStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            shipmentStore.setPending(false)
        }
    }

    async function updateShipment(trackingId: string, shipment: Omit<IShipment, 'trackingId' | 'userId'> ) {
        try {
            shipmentStore.setPending(true)
            shipmentStore.setError(null)

            const data = await $fetch <IShipmentResponse>( `/shipments/${trackingId}` , {
                ...apiClient(),
                method: 'PATCH',
                body: shipment
            })

            shipmentStore.updateShipment(trackingId, data.shipment)

            return {
                data,
                error: null
            }


        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to update shipments'
            shipmentStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            shipmentStore.setPending(false)
        }
    }

    async function deleteShipment(trackingId:string) {
        try {
            shipmentStore.setPending(true)
            shipmentStore.setError(null)

            const data = await $fetch <IShipmentResponse>( `/shipments/${trackingId}` , {
                ...apiClient(),
                method: 'DELETE',
            })

            shipmentStore.deleteShipment(trackingId)

            return {
                data,
                error: null
            }
            
        } catch (error: any) {
            const errorMessage = error.data?.message || error.message || 'Failed to delete shipment'
            shipmentStore.setError(errorMessage)
            
            return {
                data: null,
                error: errorMessage
            }
        } finally {
            shipmentStore.setPending(false)
        }
    }

    return {
        getAllShipment,
        getShipmentById,
        createShipment,
        updateShipment,
        deleteShipment
    }
}