<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-black mb-2">Shipments</h1>
            <p class="text-gray-600 text-lg">Manage and track all your shipments</p>
          </div>
          <button 
            @click="openCreateModal" 
            class="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Shipment</span>
          </button>
        </div>

        <!-- Stats Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div class="bg-green-50 rounded-xl p-4 border border-green-100">
            <p class="text-sm text-green-700 font-medium mb-1">Total Shipments</p>
            <p class="text-3xl font-bold text-green-600">{{ shipments.length }}</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p class="text-sm text-blue-700 font-medium mb-1">In Transit</p>
            <p class="text-3xl font-bold text-blue-600">{{ inTransitCount }}</p>
          </div>
          <div class="bg-green-50 rounded-xl p-4 border border-green-100">
            <p class="text-sm text-green-700 font-medium mb-1">Delivered</p>
            <p class="text-3xl font-bold text-green-600">{{ deliveredCount }}</p>
          </div>
          <div class="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p class="text-sm text-orange-700 font-medium mb-1">Pending</p>
            <!-- <p class="text-3xl font-bold text-orange-600">{{ pendingCount }}</p> -->
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="relative">
          <div class="animate-spin rounded-full h-20 w-20 border-4 border-gray-200"></div>
          <div class="animate-spin rounded-full h-20 w-20 border-4 border-green-600 border-t-transparent absolute top-0"></div>
        </div>
        <p class="text-black text-xl font-medium mt-6">Loading Shipments...</p>
        <p class="text-gray-500 mt-2">Please wait</p>
      </div>

      <!-- Shipments Grid -->
      <div v-else-if="shipments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="shipment in shipments" 
          :key="shipment.trackingId" 
          class="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:-translate-y-2 shadow-sm hover:shadow-2xl"
        >
          <!-- Status Badge -->
          <div class="bg-black px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-400 font-medium">Tracking ID</p>
                <p class="text-white font-bold text-sm">{{ shipment.trackingId }}</p>
              </div>
            </div>
            <span :class="getStatusClass(shipment.status)" class="px-3 py-1.5 rounded-lg text-xs font-bold">
              {{ shipment.status }}
            </span>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Route Info -->
            <div class="space-y-4 mb-6">
              <!-- From -->
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-centershrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-gray-500 font-medium mb-1">FROM</p>
                  <p class="text-black font-bold">{{ shipment.sender?.name || 'N/A' }}</p>
                  <p class="text-sm text-gray-600">{{ shipment.sender?.city || 'N/A' }}, {{ shipment.sender?.country || 'N/A' }}</p>
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
                <div class="flex-1">
                  <p class="text-xs text-gray-500 font-medium mb-1">TO</p>
                  <p class="text-black font-bold">{{ shipment.receiver?.name || 'N/A' }}</p>
                  <p class="text-sm text-gray-600">{{ shipment.receiver?.city || 'N/A' }}, {{ shipment.receiver?.country || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- Delivery Date -->
            <div class="bg-gray-50 rounded-xl p-4 mb-4">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="text-xs text-gray-500 font-medium">Estimated Delivery</p>
                  <p class="text-sm text-black font-bold">{{ formatDate(shipment.estimatedDelivery) }}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <button 
                @click="openUpdateModal(shipment)" 
                class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all font-semibold group"
              >
                <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span class="text-sm">Edit</span>
              </button>
              <button 
                @click="confirmDelete(shipment)" 
                class="flex items-center justify-center gap-2 px-4 py-3 bg-white text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all font-semibold group"
              >
                <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-black mb-2">No shipments yet</h3>
        <p class="text-gray-600 mb-6 text-lg">Get started by creating your first shipment</p>
        <button 
          @click="openCreateModal"
          class="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold shadow-lg transition-all"
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
// const pendingCount = computed(() => 
//   shipments.value.filter(s => s.status === 'Pending').length
// )

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

async function handleSave(payload: any) {  // Changed from fd: FormData to payload: any
  try {
    if (selectedShipment.value?.trackingId) {
      // Use trackingId for updates instead of _id
      const { error } = await updateShipment(selectedShipment.value.trackingId, payload)
      if (error) throw new Error(error)
    } else {
      const { error } = await createShipment(payload)
      if (error) throw new Error(error)
    }
    await fetchShipments()
  } catch (err) {
    console.error('Save failed:', err)
  } finally {
    closeModal()
  }
}

function confirmDelete(shipment: IShipment) {
  shipmentToDelete.value = shipment
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!shipmentToDelete.value?.trackingId) return
  try {
    // Use trackingId for deletion
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
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

onMounted(fetchShipments)
</script>