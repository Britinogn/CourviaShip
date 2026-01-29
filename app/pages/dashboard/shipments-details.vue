<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="relative">
        <div class="animate-spin rounded-full h-20 w-20 border-4 border-gray-200"></div>
        <div class="animate-spin rounded-full h-20 w-20 border-4 border-green-600 border-t-transparent absolute top-0"></div>
      </div>
      <p class="text-black text-xl font-medium mt-6">Loading Receipt...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto p-6">
      <div class="bg-red-50 border-2 border-red-200 rounded-3xl p-10 text-center">
        <div class="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h3 class="text-3xl font-bold text-red-900 mb-3">Receipt Not Found</h3>
        <p class="text-lg text-red-700 mb-8">{{ error }}</p>
        <NuxtLink to="/dashboard/shipments" class="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Shipments
        </NuxtLink>
      </div>
    </div>

    <!-- Receipt Content -->
    <div v-else-if="shipment" class="max-w-6xl mx-auto p-6 space-y-6">
      <!-- Success Banner -->
      <div class="bg-green-50 border-2 border-green-200 rounded-2xl p-6 animate-fade-in">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-green-900 mb-1">Shipment Created Successfully!</h2>
            <p class="text-green-700">Your shipment has been registered and a receipt has been generated.</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4">
        <NuxtLink to="/dashboard/shipments" class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Shipments
        </NuxtLink>
        <button @click="printReceipt" class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-black text-black rounded-xl font-bold hover:bg-gray-50 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
          Print Receipt
        </button>
        <button @click="downloadReceipt" class="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Download PDF
        </button>
      </div>

      <!-- Receipt Card -->
      <div id="receipt-content" class="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden animate-slide-up">
        <!-- Receipt Header -->
        <div class="bg-black px-10 py-8 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h1 class="text-4xl font-bold text-white mb-2">CourviaShip</h1>
                <p class="text-gray-300">Shipping Receipt</p>
              </div>
              <div class="text-right">
                <p class="text-gray-400 text-sm mb-1">Receipt #</p>
                <p class="text-white font-mono font-bold text-lg">{{ shipment.trackingId }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div>
                <p class="text-gray-300 text-sm mb-1">Registration Date</p>
                <p class="text-white font-bold">{{ formatDate(shipment.registeredAt) }}</p>
              </div>
              <div>
                <p class="text-gray-300 text-sm mb-1">Estimated Delivery</p>
                <p class="text-white font-bold">{{ formatDate(shipment.estimatedDelivery) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Receipt Body -->
        <div class="p-10 space-y-8">
          <!-- Tracking Info -->
          <div class="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm text-green-700 font-bold mb-1">TRACKING NUMBER</p>
                <p class="text-3xl font-mono font-bold text-green-900">{{ shipment.trackingId }}</p>
              </div>
              <div class="px-6 py-3 bg-green-600 rounded-xl">
                <span class="text-white font-bold text-sm">{{ shipment.status }}</span>
              </div>
            </div>
          </div>

          <!-- Shipment Route -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Sender -->
            <div class="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900">SENDER</h3>
              </div>
              <div class="space-y-2 text-gray-700">
                <p class="font-bold text-black text-lg">{{ shipment.sender.name }}</p>
                <p>{{ shipment.sender.email }}</p>
                <p>{{ shipment.sender.phoneNumber }}</p>
                <p v-if="shipment.sender.companyName" class="text-sm italic">{{ shipment.sender.companyName }}</p>
                <div class="pt-2 border-t border-gray-300 mt-3">
                  <p>{{ shipment.sender.address }}</p>
                  <p>{{ shipment.sender.city }}, {{ shipment.sender.country }}</p>
                  <p v-if="shipment.sender.zipCode">{{ shipment.sender.zipCode }}</p>
                </div>
              </div>
            </div>

            <!-- Receiver -->
            <div class="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-green-900">RECEIVER</h3>
              </div>
              <div class="space-y-2 text-green-900">
                <p class="font-bold text-black text-lg">{{ shipment.receiver.name }}</p>
                <p>{{ shipment.receiver.email }}</p>
                <p>{{ shipment.receiver.phoneNumber }}</p>
                <p v-if="shipment.receiver.companyName" class="text-sm italic">{{ shipment.receiver.companyName }}</p>
                <div class="pt-2 border-t border-green-300 mt-3">
                  <p>{{ shipment.receiver.address }}</p>
                  <p>{{ shipment.receiver.city }}, {{ shipment.receiver.country }}</p>
                  <p v-if="shipment.receiver.zipCode">{{ shipment.receiver.zipCode }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Package Details -->
          <div class="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">PACKAGE DETAILS</h3>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-500 font-bold mb-1">WEIGHT</p>
                <p class="text-2xl font-bold text-gray-900">{{ shipment.package.weightKg }} kg</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-500 font-bold mb-1">DIMENSIONS</p>
                <p class="text-lg font-bold text-gray-900">{{ shipment.package.dimensions }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-500 font-bold mb-1">QUANTITY</p>
                <p class="text-2xl font-bold text-gray-900">{{ shipment.package.quantity || 1 }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-500 font-bold mb-1">DECLARED VALUE</p>
                <p class="text-lg font-bold text-gray-900">${{ shipment.package.declaredValue || 'N/A' }}</p>
              </div>
            </div>
            <div class="mt-6 bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500 font-bold mb-2">DESCRIPTION</p>
              <p class="text-gray-900">{{ shipment.package.description }}</p>
            </div>
            <div v-if="shipment.package.isFragile || shipment.package.requiresSignature" class="mt-4 flex gap-3">
              <span v-if="shipment.package.isFragile" class="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-bold">
                ⚠️ FRAGILE
              </span>
              <span v-if="shipment.package.requiresSignature" class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold">
                ✍️ SIGNATURE REQUIRED
              </span>
            </div>
          </div>

          <!-- Receipt Footer -->
          <div class="border-t-2 border-gray-200 pt-6">
            <div class="bg-gray-50 rounded-xl p-6">
              <p class="text-sm text-gray-600 mb-4">
                This receipt confirms that your shipment has been registered with CourviaShip. 
                Please retain this receipt for your records. For any inquiries, contact our support team.
              </p>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-500 mb-1">CONTACT SUPPORT</p>
                  <p class="text-black font-bold">support@courviaship.com</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500 mb-1">TRACK YOUR SHIPMENT</p>
                  <p class="text-black font-bold">www.courviaship.com/tracking</p>
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


definePageMeta({
    middleware: 'auth',
    layout: 'dashboard' 
})

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShipments } from '@/composables/useShipments'
import type { IShipment } from '@/types'

const route = useRoute()
//const router = useRouter()
const { getShipmentAdminByTrackingId } = useShipments()

const shipment = ref<IShipment | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const trackingId = route.params.trackingId as string
  
  if (!trackingId) {
    error.value = 'No tracking ID provided'
    isLoading.value = false
    return
  }

  try {
    const { data, error: fetchError } = await getShipmentAdminByTrackingId(trackingId)
    
    if (fetchError || !data) {
      error.value = fetchError || 'Failed to load shipment'
      return
    }

    shipment.value = data
  } catch (err: any) {
    error.value = err.message || 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
})

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const printReceipt = () => {
  window.print()
}

const downloadReceipt = () => {
  // You can implement PDF generation here using libraries like jsPDF or html2pdf
  // For now, we'll use the print functionality
  window.print()
}

useSeoMeta({
  title: `Receipt - ${shipment.value?.trackingId || 'Shipment'}`,
  description: 'Shipment receipt and details'
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

/* Print styles */
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
  }
}
</style>