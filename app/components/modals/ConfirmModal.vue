<template>
  <div class="fixed inset-0 bg-(--bg-color)/50 flex items-center justify-center z-50 p-4">
    <div class="bg-(--bg-card) rounded-lg max-w-md w-full p-6 shadow-md border border-(--border-strong)">
      <h2 class="text-xl font-bold text-(--text-strong) mb-2">Confirm Deletion</h2>
      
      <p class="text-(--text-muted) mb-4">
        Are you sure you want to delete this shipment? This action cannot be undone.
      </p>

      <div class="bg-(--bg-sidebar) p-3 rounded-md mb-6 text-center">
        <span class="text-sm font-medium text-(--text-strong)">Tracking ID:</span>
        <span class="ml-2 font-mono text-(--brand-accent)">{{ shipment?.trackingId || 'N/A' }}</span>
      </div>

      <div class="flex gap-3">
        <button
          @click="onCancel"
          class="flex-1 px-4 py-2 border border-(--border-strong) text-(--text-primary) rounded-lg hover:bg-(--bg-sidebar) transition"
        >
          Cancel
        </button>

        <button
          @click="onConfirm"
          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          Delete Shipment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IShipment } from '@/types'  // using your exact type

interface DeleteModalProps {
  shipment?: IShipment | null  // shipment to delete (we only need trackingId)
}

const props = defineProps<DeleteModalProps>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const onConfirm = () => emit('confirm')
const onCancel = () => emit('cancel')
</script>