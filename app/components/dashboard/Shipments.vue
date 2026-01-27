<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-3xl font-bold text-(--text-strong)">Shipments Management</h1>
        <p class="text-(--text-muted) mt-2">Manage all your shipments in one place</p>
      </div>
      <button 
        @click="openCreateModal" 
        class="flex items-center gap-2 bg-(--brand-primary) text-(--btn-text-on-primary) px-4 py-2 rounded-lg font-medium hover:bg-(--brand-primary-600) transition-all transform hover:-translate-y-0.5"
      >
        <PlusIcon class="w-5 h-5" />
        <span>New Shipment</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-(--accent-secondary) mb-4"></div>
      <p class="var(--text-light) text-lg">Loading Shipments...</p>
    </div>

    <!-- Shipments Grid -->
    <div v-else-if="shipments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="shipment in shipments" 
        :key="shipment.trackingId" 
        class="bg-(--bg-card) border border-(--border-color) rounded-xl overflow-hidden transition-all hover:-translate-y-1 shadow-md hover:shadow-lg"
      >
        <!-- Content -->
        <div class="p-5">
          <h3 class="text-lg font-semibold text-(--text-strong) mb-1">
            {{ shipment.trackingId }}
          </h3>
          <p class="text-sm text-(--brand-primary) font-medium mb-2">
            {{ shipment.status }}
          </p>
          <div class="text-sm text-(--text-primary) mb-4">
            <p><span class="font-medium">From:</span> {{ shipment.sender.name }} ({{ shipment.sender.city }}, {{ shipment.sender.country }})</p>
            <p><span class="font-medium">To:</span> {{ shipment.receiver.name }} ({{ shipment.receiver.city }}, {{ shipment.receiver.country }})</p>
          </div>
          <p class="text-sm text-(--text-muted) mb-4">
            Est. Delivery: {{ formatDate(shipment.estimatedDelivery) }}
          </p>

          <!-- Actions -->
          <div class="flex gap-3 mt-4">
            <button 
              @click="openUpdateModal(shipment)" 
              class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-(--bg-sidebar) text-(--text-primary) rounded-lg hover:bg-(--bg-navbar) transition-colors text-sm font-medium"
            >
              <PencilIcon class="w-4 h-4" />
              Edit
            </button>
            <button 
              @click="confirmDelete(shipment)" 
              class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-transparent text-(--status-sold) border border-(--status-sold) rounded-lg hover:bg-(--status-sold)/10 transition-colors text-sm font-medium"
            >
              <TrashIcon class="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-(--bg-sidebar) rounded-lg">
      <p class="text-(--text-muted) text-lg mb-4">No shipments yet</p>
      <button 
        @click="openCreateModal"
        class="px-4 py-2 bg-(--brand-primary) text-(--btn-text-on-primary) rounded-lg hover:bg-(--brand-primary-600)"
      >
        Create Your First Shipment
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <ShipmentModal
      v-if="showModal"
      :isOpen="showModal"
      :shipment="selectedShipment"
      @close="closeModal"
      @save="handleSave"
    />

    <!-- Delete Confirmation Modal -->
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
import { ref, onMounted } from 'vue'
import { useShipments } from '@/composables/useShipments' // your composable
import ShipmentModal from '@/components/modals/ShipmentModal.vue'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import type { IShipment } from '@/types'

const { getAllShipment, createShipment, updateShipment, deleteShipment } = useShipments()

// State
const shipments = ref<IShipment[]>([])
const isLoading = ref(false)
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedShipment = ref<IShipment | null>(null)
const shipmentToDelete = ref<IShipment | null>(null)

// Fetch shipments
async function fetchShipments() {
  isLoading.value = true
  try {
    const { data } = await getAllShipment()
    shipments.value = data
  } finally {
    isLoading.value = false
  }
}


// Modal open/close
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

// Save handler (plain object from modal)
async function handleSave(data: any) {
  try {
    if (selectedShipment.value?._id) {
      await updateShipment(selectedShipment.value._id, data)
    } else {
      await createShipment(data)
    }
    await fetchShipments()
  } catch (err) {
    console.error('Save failed:', err)
  } finally {
    closeModal()
  }
}

// Delete
function confirmDelete(shipment: IShipment) {
  shipmentToDelete.value = shipment
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!shipmentToDelete.value?._id) return
  try {
    await deleteShipment(shipmentToDelete.value._id)
    await fetchShipments()
  } catch (err) {
    console.error('Delete failed:', err)
  } finally {
    showDeleteModal.value = false
    shipmentToDelete.value = null
  }
}

// Date formatter
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))
}

// Load on mount
onMounted(fetchShipments)
</script>