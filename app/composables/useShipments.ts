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

      const response = await $fetch<any>('/shipments', {
        ...apiClient(),
        method: 'POST',
        body: payload
      });

      // Extract shipment and PDF from response
      const shipment = response.data?.shipment || response.shipment;
      const receiptPdf = response.data?.receiptPdf || response.receiptPdf;

      // Convert PDF buffer to blob URL if it exists
      let pdfBlobUrl = '';
      if (receiptPdf) {
        // If receiptPdf is base64 string
        if (typeof receiptPdf === 'string') {
          const byteCharacters = atob(receiptPdf);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          pdfBlobUrl = URL.createObjectURL(blob);
        }
        // If receiptPdf is already an array buffer
        else if (receiptPdf.data) {
          const blob = new Blob([new Uint8Array(receiptPdf.data)], { type: 'application/pdf' });
          pdfBlobUrl = URL.createObjectURL(blob);
        }
      }

      shipmentStore.addShipment(shipment);

      return {
        data: {
          shipment,
          receiptPdf: pdfBlobUrl
        },
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
        method: 'PATCH', // or PUT - match your backend
        body: payload  // Send JSON directly
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