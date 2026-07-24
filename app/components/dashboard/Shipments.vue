<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2">Shipments</h1>
            <p class="text-gray-600 text-sm sm:text-base lg:text-lg">Manage and track all your shipments</p>
          </div>
          <button 
            @click="openCreateModal" 
            class="flex items-center justify-center gap-2 sm:gap-3 bg-green-600 text-white px-5 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Shipment</span>
          </button>
        </div>

        <!-- Stats Bar -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div class="bg-green-50 rounded-xl p-3 sm:p-4 border border-green-100">
            <p class="text-xs sm:text-sm text-green-700 font-medium mb-1">Total Shipments</p>
            <p class="text-2xl sm:text-3xl font-bold text-green-600">{{ shipments.length }}</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-100">
            <p class="text-xs sm:text-sm text-blue-700 font-medium mb-1">In Transit</p>
            <p class="text-2xl sm:text-3xl font-bold text-blue-600">{{ inTransitCount }}</p>
          </div>
          <div class="bg-green-50 rounded-xl p-3 sm:p-4 border border-green-100">
            <p class="text-xs sm:text-sm text-green-700 font-medium mb-1">Delivered</p>
            <p class="text-2xl sm:text-3xl font-bold text-green-600">{{ deliveredCount }}</p>
          </div>
          <div class="bg-yellow-50 rounded-xl p-3 sm:p-4 border border-yellow-100">
            <p class="text-xs sm:text-sm text-yellow-700 font-medium mb-1">In Customs</p>
            <p class="text-2xl sm:text-3xl font-bold text-yellow-600">{{ inCustomsCount }}</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-16 sm:py-20">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-gray-200"></div>
          <div class="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-green-600 border-t-transparent absolute top-0"></div>
        </div>
        <p class="text-black text-lg sm:text-xl font-medium mt-5 sm:mt-6">Loading Shipments...</p>
        <p class="text-gray-500 mt-1 text-sm">Please wait</p>
      </div>

      <!-- Shipments Grid -->
      <div v-else-if="shipments.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <div 
          v-for="shipment in shipments" 
          :key="shipment.trackingId" 
          class="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 sm:hover:-translate-y-2 shadow-sm hover:shadow-xl"
        >
          <!-- Status Badge Header -->
          <div class="bg-black px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 sm:w-10 sm:h-10 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div class="min-w-0">
                <p class="text-[11px] sm:text-xs text-gray-400 font-medium">Tracking ID</p>
                <p class="text-white font-bold text-xs sm:text-sm truncate">{{ shipment.trackingId }}</p>
              </div>
            </div>
            <span :class="getStatusClass(shipment.status)" class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold shrink-0">
              {{ shipment.status }}
            </span>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-6">
            <!-- Route Info -->
            <div class="space-y-4 mb-5 sm:mb-6">
              <!-- From -->
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">FROM</p>
                  <p class="text-black font-bold text-sm sm:text-base truncate">{{ shipment.sender?.name || 'N/A' }}</p>
                  <p class="text-xs sm:text-sm text-gray-600 truncate">{{ shipment.sender?.city || 'N/A' }}, {{ shipment.sender?.country || 'N/A' }}</p>
                </div>
              </div>

              <!-- Divider -->
              <div class="flex items-center gap-2">
                <div class="h-px bg-gray-200 flex-1"></div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div class="h-px bg-gray-200 flex-1"></div>
              </div>

              <!-- To -->
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">TO</p>
                  <p class="text-black font-bold text-sm sm:text-base truncate">{{ shipment.receiver?.name || 'N/A' }}</p>
                  <p class="text-xs sm:text-sm text-gray-600 truncate">{{ shipment.receiver?.city || 'N/A' }}, {{ shipment.receiver?.country || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- Delivery Date -->
            <div class="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="text-xs text-gray-500 font-medium">Estimated Delivery</p>
                  <p class="text-sm text-black font-bold">{{ formatDate(shipment.estimatedDelivery) }}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 sm:gap-3">
              <NuxtLink
                :to="`/dashboard/shipments-details/${shipment.trackingId}`"
                class="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View</span>
              </NuxtLink>

              <button 
                @click="openUpdateModal(shipment)" 
                class="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all font-semibold text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>

              <button 
                @click="confirmDelete(shipment)" 
                class="flex items-center justify-center px-3 py-2.5 sm:px-4 sm:py-3 bg-white text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all font-semibold"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 sm:py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300 px-4">
        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-black mb-2">No shipments yet</h3>
        <p class="text-gray-600 mb-6 text-sm sm:text-base">Get started by creating your first shipment</p>
        <button 
          @click="openCreateModal"
          class="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold shadow-lg transition-all text-sm sm:text-base"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Your First Shipment</span>
        </button>
      </div>
    </div>

    <!-- Modals -->
    <ShipmentModal
      v-if="showModal"
      :isOpen="showModal"
      :shipment="selectedShipment"
      :isSaving="isSaving"
      @close="closeModal"
      @save="handleSave"
    />

    <ConfirmModal
      v-if="showDeleteModal"
      title="Delete Shipment"
      :message="`Are you sure you want to delete shipment ${shipmentToDelete?.trackingId || 'unknown'}? This action cannot be undone.`"
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useShipments } from '@/composables/useShipments'
import ShipmentModal from '@/components/modals/ShipmentModal.vue'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import type { IShipment } from '@/types'

const { getAllShipment, createShipment, updateShipment, deleteShipment } = useShipments()

const shipments = ref<IShipment[]>([])
const isLoading = ref(false)
const showModal = ref(false)
const isSaving = ref(false)
const showDeleteModal = ref(false)
const selectedShipment = ref<IShipment | null>(null)
const shipmentToDelete = ref<IShipment | null>(null)

// Computed stats
const inTransitCount = computed(() => 
  shipments.value.filter(s => ['InTransit', 'EnRoute', 'OutForDelivery'].includes(s.status)).length
)
const deliveredCount = computed(() => 
  shipments.value.filter(s => s.status === 'Delivered').length
)
const inCustomsCount = computed(() => 
  shipments.value.filter(s => s.status === 'InCustoms').length
)

async function fetchShipments() {
  isLoading.value = true
  try {
    const { data, error } = await getAllShipment()
    if (error) {
      console.error('Fetch error:', error)
      return
    }
    shipments.value = data || []
  } catch (err) {
    console.error('Unexpected fetch error:', err)
  } finally {
    isLoading.value = false
  }
}

function openCreateModal() {
  selectedShipment.value = null
  showModal.value = true
}

function openUpdateModal(shipment: IShipment) {
  selectedShipment.value = { ...shipment }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedShipment.value = null
}

async function handleSave(payload: any) {
  isSaving.value = true
  try {
    if (selectedShipment.value?.trackingId) {
      const { error } = await updateShipment(selectedShipment.value.trackingId, payload)
      if (error) throw new Error(error)
    } else {
      const { data, error } = await createShipment(payload)
      if (error) throw new Error(error)

      const pdfBuffer = data?.shipment?.receiptPdf || data?.receiptPdf
      if (pdfBuffer?.data) {
        downloadPdf(pdfBuffer.data, data?.shipment?.trackingId || 'courviaship')
      }
    }
    await fetchShipments()
    closeModal()
  } catch (err) {
    console.error('Save failed:', err)
  } finally {
    isSaving.value = false
  }
}

function downloadPdf(bufferData: number[], trackingId: string) {
  const uint8Array = new Uint8Array(bufferData)
  const blob = new Blob([uint8Array], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `receipt-${trackingId}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

function confirmDelete(shipment: IShipment) {
  shipmentToDelete.value = shipment
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!shipmentToDelete.value?.trackingId) return
  try {
    const { error } = await deleteShipment(shipmentToDelete.value.trackingId)
    if (error) throw new Error(error)
    await fetchShipments()
  } catch (err) {
    console.error('Delete failed:', err)
  } finally {
    showDeleteModal.value = false
    shipmentToDelete.value = null
  }
}

const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'Delivered': 'bg-green-100 text-green-700',
    'InTransit': 'bg-blue-100 text-blue-700',
    'EnRoute': 'bg-blue-100 text-blue-700',
    'OutForDelivery': 'bg-purple-100 text-purple-700',
    'Pending': 'bg-orange-100 text-orange-700',
    'Cancelled': 'bg-red-100 text-red-700',
    'Delayed': 'bg-yellow-100 text-yellow-700',
    'InCustoms': 'bg-yellow-100 text-yellow-700',
    'Registered': 'bg-gray-100 text-gray-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

onMounted(fetchShipments)
</script>