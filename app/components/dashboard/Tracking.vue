<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2">
              Track Shipments
            </h1>
            <p class="text-gray-600 text-sm sm:text-base lg:text-lg">
              Monitor and manage all your shipments in real-time
            </p>
          </div>

          <div class="bg-green-50 px-5 py-3 sm:px-6 sm:py-4 rounded-xl border border-green-100 w-full sm:w-auto text-center sm:text-left">
            <p class="text-xs sm:text-sm text-green-700 font-medium mb-0.5">Total Shipments</p>
            <p class="text-2xl sm:text-3xl font-bold text-green-600">{{ shipments.length }}</p>
          </div>
        </div>
      </div>

      <!-- Search & Filter Bar -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6">
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div class="relative flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by tracking ID, sender, or receiver..."
              class="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-sm sm:text-base"
            />
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button
            @click="refreshShipments"
            :disabled="isRefreshing"
            class="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
          >
            <svg
              class="w-5 h-5"
              :class="{ 'animate-spin': isRefreshing }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ isRefreshing ? 'Refreshing...' : 'Refresh' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="bg-white rounded-2xl p-4 sm:p-6 animate-pulse"
        >
          <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div class="h-16 sm:h-20 w-full sm:w-48 bg-gray-200 rounded-xl"></div>
            <div class="flex-1 space-y-3">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="h-10 w-full sm:w-28 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>

      <!-- Shipments List -->
      <div v-else-if="filteredShipments.length > 0" class="space-y-4">
        <TrackingRow
          v-for="shipment in filteredShipments"
          :key="shipment.trackingId"
          :shipment="shipment"
          @edit="openUpdateModal"
          @delete="(id: string) => confirmDelete(shipments.find(s => s.trackingId === id)!)"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-8 sm:p-10 lg:p-12 text-center"
      >
        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>

        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {{ searchQuery ? 'No shipments found' : 'No shipments yet' }}
        </h3>
        <p class="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
          {{ searchQuery ? 'Try adjusting your search query' : 'Your shipments will appear here once they are created' }}
        </p>

        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all text-sm sm:text-base"
        >
          Clear Search
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
import TrackingRow from '@/components/modals/TrackingModal.vue'
import ShipmentModal from '@/components/modals/ShipmentModal.vue'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import { useShipments } from '@/composables/useShipments'
import type { IShipment } from '@/types'

const { getAllShipment, updateShipment, deleteShipment } = useShipments()

const shipments = ref<IShipment[]>([])
const isLoading = ref(false)
const isRefreshing = ref(false)
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedShipment = ref<IShipment | null>(null)
const shipmentToDelete = ref<IShipment | null>(null)
const searchQuery = ref('')

const filteredShipments = computed(() => {
  if (!searchQuery.value) return shipments.value
  const query = searchQuery.value.toLowerCase()
  return shipments.value.filter(shipment =>
    shipment.trackingId?.toLowerCase().includes(query) ||
    shipment.sender?.name?.toLowerCase().includes(query) ||
    shipment.receiver?.name?.toLowerCase().includes(query) ||
    shipment.sender?.city?.toLowerCase().includes(query) ||
    shipment.receiver?.city?.toLowerCase().includes(query)
  )
})

async function fetchShipments() {
  isLoading.value = true
  try {
    const { data } = await getAllShipment()
    shipments.value = data || []
  } catch (error) {
    console.error('Failed to fetch shipments:', error)
  } finally {
    isLoading.value = false
  }
}

async function refreshShipments() {
  isRefreshing.value = true
  try {
    const { data } = await getAllShipment()
    shipments.value = data || []
  } catch (error) {
    console.error('Failed to refresh shipments:', error)
  } finally {
    isRefreshing.value = false
  }
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
  try {
    if (selectedShipment.value?.trackingId) {
      const { error } = await updateShipment(selectedShipment.value.trackingId, payload)
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

onMounted(fetchShipments)
</script>