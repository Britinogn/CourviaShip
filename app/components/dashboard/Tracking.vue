<template>
  <div class="max-w-5xl mx-auto p-6 space-y-4">
    <h1 class="text-3xl font-bold text-black mb-6">Track Shipments</h1>

    <TrackingRow
      v-for="shipment in shipments"
      :key="shipment.trackingId"
      :shipment="shipment"
      @delete="openDeleteModal"
    />

    <ConfirmDeleteModal
      :open="isDeleteModalOpen"
      :tracking-id="selectedTrackingId"
      @cancel="closeDeleteModal"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TrackingRow from '@/components/modals/TrackingModal.vue'
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue'
import { useShipments } from '@/composables/useShipments'
import type { IShipment } from '@/types'

const { getAllShipment, deleteShipment } = useShipments()

const shipments = ref<IShipment[]>([])

const isDeleteModalOpen = ref(false)
// const selectedTrackingId = ref<string | null>(null)
const selectedTrackingId = ref<string | undefined>(undefined)


onMounted(async () => {
  const { data } = await getAllShipment()
  shipments.value = data || []
})

function openDeleteModal(trackingId: string) {
  selectedTrackingId.value = trackingId
  isDeleteModalOpen.value = true
}

function closeDeleteModal() {
   isDeleteModalOpen.value = false
  selectedTrackingId.value = undefined
}

async function handleDeleteConfirm() {
  if (!selectedTrackingId.value) return

  await deleteShipment(selectedTrackingId.value)

  shipments.value = shipments.value.filter(
    s => s.trackingId !== selectedTrackingId.value
  )

  closeDeleteModal()
}
</script>
