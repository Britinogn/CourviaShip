<template>
  <div
    class="flex items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition"
  >
    <!-- Left Info -->
    <div class="flex flex-col md:flex-row md:items-center gap-4 flex-1">
      <!-- Tracking ID -->
      <div class="min-w-[180px]">
        <p class="text-xs text-gray-500 font-semibold">Tracking ID</p>
        <p class="font-mono font-bold text-black">{{ shipment.trackingId }}</p>
      </div>

      <!-- Sender -->
      <div class="flex-1">
        <p class="text-xs text-gray-500 font-semibold">Sender</p>
        <p class="font-bold text-black truncate">
          {{ shipment.sender?.name || 'N/A' }}
        </p>
      </div>

      <!-- Receiver -->
      <div class="flex-1">
        <p class="text-xs text-gray-500 font-semibold">Receiver</p>
        <p class="font-bold text-black truncate">
          {{ shipment.receiver?.name || 'N/A' }}
        </p>
      </div>
    </div>

    <!-- Actions -->
    <button
      @click="$emit('delete', shipment.trackingId)"
      class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-red-600 text-red-600 font-semibold hover:bg-red-50 transition"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M4 7h16" />
      </svg>
      <span class="hidden sm:inline">Delete</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IShipment } from '@/types'

defineProps<{
  shipment: IShipment
}>()

defineEmits<{
  delete: [trackingId: string]
}>()
</script>
