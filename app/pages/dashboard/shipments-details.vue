<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto p-6">

      <!-- Back link -->
      <NuxtLink
        to="/dashboard/shipments"
        class="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors mb-8"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shipments
      </NuxtLink>

      <!-- Loading -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-32">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent absolute top-0"></div>
        </div>
        <p class="text-gray-700 text-lg font-medium mt-6">Loading shipment...</p>
      </div>

      <!-- Error -->
      <div v-else-if="fetchError" class="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Could not load this shipment</h3>
        <p class="text-gray-600">{{ fetchError }}</p>
      </div>

      <!-- Content -->
      <div v-else-if="shipment" class="space-y-8">

        <!-- ===== HEADER ===== -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-gray-900 to-black px-8 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-5">
              <div class="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/30">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div>
                <p class="text-gray-400 text-sm font-medium">Tracking Number</p>
                <p class="text-white text-2xl font-bold tracking-wide">{{ shipment.trackingId }}</p>
              </div>
            </div>

            <span
              :class="getStatusClass(shipment.status)"
              class="px-5 py-2.5 rounded-xl text-sm font-bold self-start sm:self-auto"
            >
              {{ shipment.status }}
            </span>
          </div>

          <!-- Quick info row -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border-b border-gray-100">
            <div>
              <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Registered</p>
              <p class="font-semibold text-gray-900">{{ formatDate(shipment.registeredAt) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Est. Delivery</p>
              <p class="font-semibold text-gray-900">{{ formatDate(shipment.estimatedDelivery) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Weight</p>
              <p class="font-semibold text-gray-900">{{ shipment.package?.weightKg || '—' }} kg</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Quantity</p>
              <p class="font-semibold text-gray-900">{{ shipment.package?.quantity || 1 }}</p>
            </div>
          </div>

          <!-- Route visual -->
          <div class="px-8 py-6 flex items-center gap-4 text-sm">
            <div class="flex-1">
              <p class="text-xs text-gray-500 font-medium mb-0.5">Origin</p>
              <p class="font-semibold text-gray-900">
                {{ shipment.origin?.city }}, {{ shipment.origin?.country }}
              </p>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <div class="w-12 h-px bg-gray-300"></div>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div class="w-12 h-px bg-gray-300"></div>
            </div>
            <div class="flex-1 text-right">
              <p class="text-xs text-gray-500 font-medium mb-0.5">Destination</p>
              <p class="font-semibold text-gray-900">
                {{ shipment.destination?.city }}, {{ shipment.destination?.country }}
              </p>
            </div>
          </div>
        </div>

        <!-- ===== SENDER / RECEIVER / PACKAGE ===== -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Sender -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-900">Sender</h3>
            </div>
            <div class="space-y-1.5 text-sm">
              <p class="font-bold text-lg text-gray-900">{{ shipment.sender?.name || 'N/A' }}</p>
              <p class="text-gray-600">{{ shipment.sender?.email }}</p>
              <p class="text-gray-600">{{ shipment.sender?.phoneNumber }}</p>
              <p v-if="shipment.sender?.companyName" class="text-gray-500 italic">{{ shipment.sender.companyName }}</p>
              <div class="pt-3 mt-3 border-t border-gray-100 text-gray-600">
                <p>{{ shipment.sender?.address }}</p>
                <p>{{ shipment.sender?.city }}, {{ shipment.sender?.country }}</p>
                <p v-if="shipment.sender?.zipCode">{{ shipment.sender.zipCode }}</p>
              </div>
            </div>
          </div>

          <!-- Receiver -->
          <div class="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-900">Receiver</h3>
            </div>
            <div class="space-y-1.5 text-sm">
              <p class="font-bold text-lg text-gray-900">{{ shipment.receiver?.name || 'N/A' }}</p>
              <p class="text-gray-600">{{ shipment.receiver?.email }}</p>
              <p class="text-gray-600">{{ shipment.receiver?.phoneNumber }}</p>
              <p v-if="shipment.receiver?.companyName" class="text-gray-500 italic">{{ shipment.receiver.companyName }}</p>
              <div class="pt-3 mt-3 border-t border-green-100 text-gray-600">
                <p>{{ shipment.receiver?.address }}</p>
                <p>{{ shipment.receiver?.city }}, {{ shipment.receiver?.country }}</p>
                <p v-if="shipment.receiver?.zipCode">{{ shipment.receiver.zipCode }}</p>
              </div>
            </div>
          </div>

          <!-- Package -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-900">Package</h3>
            </div>
            <div class="space-y-3 text-sm">
              <p class="text-gray-800">{{ shipment.package?.description || 'N/A' }}</p>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-gray-50 rounded-xl p-3">
                  <p class="text-xs text-gray-500">Weight</p>
                  <p class="font-bold text-gray-900">{{ shipment.package?.weightKg }} kg</p>
                </div>
                <div class="bg-gray-50 rounded-xl p-3">
                  <p class="text-xs text-gray-500">Dimensions</p>
                  <p class="font-bold text-gray-900">{{ shipment.package?.dimensions }}</p>
                </div>
              </div>
              <p v-if="shipment.package?.declaredValue" class="text-gray-600">
                Declared value: <span class="font-semibold">${{ shipment.package.declaredValue }}</span>
              </p>
              <div class="flex gap-2 pt-1">
                <span v-if="shipment.package?.isFragile" class="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg">Fragile</span>
                <span v-if="shipment.package?.requiresSignature" class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">Signature Required</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== CURRENT LOCATION ===== -->
        <div v-if="shipment.currentLocation" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Current Location</p>
          <div class="bg-green-50 border border-green-100 rounded-xl p-5">
            <p class="font-bold text-gray-900 text-lg">
              {{ shipment.currentLocation.city }}, {{ shipment.currentLocation.country }}
            </p>
            <p v-if="shipment.currentLocation.address" class="text-gray-600 mt-1">
              {{ shipment.currentLocation.address }}
            </p>
          </div>
        </div>

        <!-- ===== RECEIPT SECTION ===== -->
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-2xl font-bold text-gray-900">Shipping Receipt</h2>
            <div class="flex gap-3">
              <button
                @click="printReceipt"
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button
                @click="printReceipt"
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>

          <!-- The actual printable receipt -->
          <div id="receipt-content" class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <!-- Receipt Header -->
            <div class="bg-black px-10 py-8 relative">
              <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 28px 28px;"></div>
              <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h1 class="text-3xl font-bold text-white">CourviaShip</h1>
                  <p class="text-gray-400 mt-1">Official Shipping Receipt</p>
                </div>
                <div class="text-left sm:text-right">
                  <p class="text-gray-400 text-sm">Receipt #</p>
                  <p class="text-white font-mono font-bold text-xl">{{ shipment.trackingId }}</p>
                </div>
              </div>

              <div class="relative mt-8 grid grid-cols-2 gap-6 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
                <div>
                  <p class="text-gray-400 text-sm mb-1">Registration Date</p>
                  <p class="text-white font-semibold">{{ formatDateLong(shipment.registeredAt) }}</p>
                </div>
                <div>
                  <p class="text-gray-400 text-sm mb-1">Estimated Delivery</p>
                  <p class="text-white font-semibold">{{ formatDateLong(shipment.estimatedDelivery) }}</p>
                </div>
              </div>
            </div>

            <!-- Receipt Body -->
            <div class="p-8 md:p-10 space-y-8">
              <!-- Tracking banner -->
              <div class="bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div class="flex-1">
                  <p class="text-sm font-bold text-green-700 mb-1">TRACKING NUMBER</p>
                  <p class="text-2xl md:text-3xl font-mono font-bold text-green-900">{{ shipment.trackingId }}</p>
                </div>
                <div class="px-5 py-2.5 bg-green-600 rounded-xl self-start">
                  <span class="text-white font-bold text-sm">{{ shipment.status }}</span>
                </div>
              </div>

              <!-- Parties -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Sender</p>
                  <p class="font-bold text-lg text-gray-900">{{ shipment.sender?.name }}</p>
                  <p class="text-gray-600 text-sm mt-1">{{ shipment.sender?.email }}</p>
                  <p class="text-gray-600 text-sm">{{ shipment.sender?.phoneNumber }}</p>
                  <div class="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                    <p>{{ shipment.sender?.address }}</p>
                    <p>{{ shipment.sender?.city }}, {{ shipment.sender?.country }}</p>
                  </div>
                </div>

                <div class="bg-green-50 rounded-2xl p-6 border border-green-200">
                  <p class="text-xs font-bold text-green-700 uppercase tracking-wider mb-4">Receiver</p>
                  <p class="font-bold text-lg text-gray-900">{{ shipment.receiver?.name }}</p>
                  <p class="text-gray-600 text-sm mt-1">{{ shipment.receiver?.email }}</p>
                  <p class="text-gray-600 text-sm">{{ shipment.receiver?.phoneNumber }}</p>
                  <div class="mt-4 pt-4 border-t border-green-200 text-sm text-gray-600">
                    <p>{{ shipment.receiver?.address }}</p>
                    <p>{{ shipment.receiver?.city }}, {{ shipment.receiver?.country }}</p>
                  </div>
                </div>
              </div>

              <!-- Package summary -->
              <div class="border border-gray-200 rounded-2xl p-6">
                <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">Package Details</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="bg-gray-50 rounded-xl p-4 text-center">
                    <p class="text-xs text-gray-500 mb-1">Weight</p>
                    <p class="text-xl font-bold text-gray-900">{{ shipment.package?.weightKg }} kg</p>
                  </div>
                  <div class="bg-gray-50 rounded-xl p-4 text-center">
                    <p class="text-xs text-gray-500 mb-1">Dimensions</p>
                    <p class="text-lg font-bold text-gray-900">{{ shipment.package?.dimensions }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-xl p-4 text-center">
                    <p class="text-xs text-gray-500 mb-1">Qty</p>
                    <p class="text-xl font-bold text-gray-900">{{ shipment.package?.quantity || 1 }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-xl p-4 text-center">
                    <p class="text-xs text-gray-500 mb-1">Value</p>
                    <p class="text-lg font-bold text-gray-900">${{ shipment.package?.declaredValue || '—' }}</p>
                  </div>

                  
                </div>
                <p class="text-xs text-gray-500 mb-1">Description</p>
                <p class="mt-5 font-bold text-gray-700">{{ shipment.package?.description }}</p>
              </div>

              <!-- Footer note -->
              <div class="bg-gray-50 rounded-2xl p-6 text-sm text-gray-600">
                <p>
                  This receipt confirms that the shipment has been registered with CourviaShip.
                  Please keep this document for your records.
                </p>
                <div class="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
                  <p><span class="font-semibold text-gray-900">Support:</span> support@courviaship.com</p>
                  <p><span class="font-semibold text-gray-900">Track:</span> {{ siteName }}/tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShipments } from '@/composables/useShipments'
import type { IShipment } from '@/types'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const { getShipmentAdminByTrackingId } = useShipments()

const shipment = ref<IShipment | null>(null)
const isLoading = ref(true)
const fetchError = ref<string | null>(null)

async function fetchShipment() {
  isLoading.value = true
  fetchError.value = null
  try {
    const trackingId = route.params.trackingId as string
    const { data, error } = await getShipmentAdminByTrackingId(trackingId)
    if (error || !data) {
      fetchError.value = error || 'Failed to load shipment'
      return
    }
    shipment.value = data
  } catch (err) {
    console.error(err)
    fetchError.value = 'Something went wrong loading this shipment.'
  } finally {
    isLoading.value = false
  }
}

const formatDate = (date?: Date | string) => {
  if (!date) return 'N/A'
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))
}

const formatDateLong = (date?: Date | string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    Delivered: 'bg-green-100 text-green-800',
    InTransit: 'bg-blue-100 text-blue-800',
    EnRoute: 'bg-blue-100 text-blue-800',
    OutForDelivery: 'bg-purple-100 text-purple-800',
    Pending: 'bg-orange-100 text-orange-800',
    Cancelled: 'bg-red-100 text-red-800',
    Delayed: 'bg-yellow-100 text-yellow-800',
    Registered: 'bg-gray-100 text-gray-800',
    PickedUp: 'bg-blue-100 text-blue-800',
    InCustoms: 'bg-yellow-100 text-yellow-800',
    AtHub: 'bg-blue-100 text-blue-800',
    Exception: 'bg-red-100 text-red-800',
  }
  return map[status] || 'bg-gray-100 text-gray-800'
}

const printReceipt = () => {
  window.print()
}

onMounted(fetchShipment)
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  #receipt-content,
  #receipt-content * {
    visibility: visible;
  }
  #receipt-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    box-shadow: none !important;
    border: none !important;
  }
}
</style>