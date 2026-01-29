// composables/useShipments.ts

import type { IShipment, IShipmentResponse, ITrackingShipment } from "~/types";
import { apiClient } from "~/utils/api";
import { useShipmentStore } from "~/stores/shipmentStore";

export function useShipments() {
  const shipmentStore = useShipmentStore();

  async function getAllShipment() {
    try {
      shipmentStore.setPending(true);
      shipmentStore.setError(null);

      const response = await $fetch<any>('/shipments', {
        ...apiClient(),
        method: 'GET',
      });

      // Handle both direct array and { shipments: [...] } shapes
      const shipmentsData = Array.isArray(response) 
        ? response 
        : response?.data?.shipments || response?.shipments || [];

      shipmentStore.setShipments(shipmentsData);

      return {
        data: shipmentsData,
        error: null
      };
    } catch (error: any) {
      const errorMessage = error.data?.message || error.message || 'Failed to fetch shipments';
      shipmentStore.setError(errorMessage);
      
      return {
        data: null,
        error: errorMessage
      };
    } finally {
      shipmentStore.setPending(false);
    }
  }

  async function getShipmentById(trackingId: string) {
    try {
      shipmentStore.setPending(true);
      shipmentStore.setError(null);

      const data = await $fetch<ITrackingShipment>(`/shipments/${trackingId}`, {
        ...apiClient(),
        method: 'GET',
      });

      shipmentStore.setTrackingShipment(data);

      return {
        data,
        error: null
      };
    } catch (error: any) {
      const errorMessage = error.data?.message || error.message || 'Failed to fetch shipment by ID';
      shipmentStore.setError(errorMessage);
      
      return {
        data: null,
        error: errorMessage
      };
    } finally {
      shipmentStore.setPending(false);
    }
  }

  async function createShipment(payload: any) {
    try {
      shipmentStore.setPending(true);
      shipmentStore.setError(null);

      const response = await $fetch<IShipmentResponse>('/shipments', {
        ...apiClient(),
        method: 'POST',
        body: payload  // Send JSON directly
      });

      shipmentStore.addShipment(response.shipment);

      return {
        data: response,
        error: null
      };
    } catch (error: any) {
      const errorMessage = error.data?.message || error.message || 'Failed to create shipment';
      shipmentStore.setError(errorMessage);
      
      return {
        data: null,
        error: errorMessage
      };
    } finally {
      shipmentStore.setPending(false);
    }
  }

  async function updateShipment(trackingId: string, payload: any) {
    try {
      shipmentStore.setPending(true);
      shipmentStore.setError(null);

      const response = await $fetch<IShipmentResponse>(`/shipments/${trackingId}`, {
        ...apiClient(),
        method: 'PATCH', 
        body: payload 
      });

      shipmentStore.updateShipment(trackingId, response.shipment);

      return {
        data: response,
        error: null
      };
    } catch (error: any) {
      const errorMessage = error.data?.message || error.message || 'Failed to update shipment';
      shipmentStore.setError(errorMessage);
      
      return {
        data: null,
        error: errorMessage
      };
    } finally {
      shipmentStore.setPending(false);
    }
  }

  async function deleteShipment(trackingId: string) {
    try {
      shipmentStore.setPending(true);
      shipmentStore.setError(null);

      const response = await $fetch<IShipmentResponse>(`/shipments/${trackingId}`, {
        ...apiClient(),
        method: 'DELETE',
      });

      shipmentStore.deleteShipment(trackingId);

      return {
        data: response,
        error: null
      };
    } catch (error: any) {
      const errorMessage = error.data?.message || error.message || 'Failed to delete shipment';
      shipmentStore.setError(errorMessage);
      
      return {
        data: null,
        error: errorMessage
      };
    } finally {
      shipmentStore.setPending(false);
    }
  }

  return {
    getAllShipment,
    getShipmentById,
    createShipment,
    updateShipment,
    deleteShipment
  };
}