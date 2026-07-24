<template>
  <div
    class="group relative flex flex-col lg:flex-row lg:items-center gap-4 p-4 sm:p-5 lg:p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-600 hover:shadow-xl transition-all duration-300"
    :class="{ 'opacity-60 pointer-events-none': isDeleting }"
  >
    <!-- Left Info -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
      
      <!-- Tracking ID -->
      <div class="sm:min-w-[160px] lg:min-w-[180px] shrink-0">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
          <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Tracking ID</p>
        </div>
        <p class="font-mono font-bold text-black text-sm sm:text-base ml-10 truncate">
          {{ shipment.trackingId }}
        </p>
      </div>

      <!-- Sender & Receiver -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 min-w-0">
        <!-- From -->
        <div class="min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">From</p>
          </div>
          <p class="font-bold text-black text-sm truncate ml-8">{{ shipment.sender?.name || 'N/A' }}</p>
          <p class="text-sm text-gray-600 truncate ml-8">
            {{ shipment.sender?.city || 'N/A' }}, {{ shipment.sender?.country || 'N/A' }}
          </p>
        </div>

        <!-- To -->
        <div class="min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">To</p>
          </div>
          <p class="font-bold text-black text-sm truncate ml-8">{{ shipment.receiver?.name || 'N/A' }}</p>
          <p class="text-sm text-gray-600 truncate ml-8">
            {{ shipment.receiver?.city || 'N/A' }}, {{ shipment.receiver?.country || 'N/A' }}
          </p>
        </div>
      </div>

      <!-- Status -->
      <div class="shrink-0">
        <span
          :class="getStatusClass(shipment.status)"
          class="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-block"
        >
          {{ shipment.status }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 sm:gap-3 w-full lg:w-auto shrink-0">
      <button
        @click="$emit('edit', shipment)"
        :disabled="isDeleting"
        class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span>Edit</span>
      </button>

      <button
        @click="handleDelete"
        :disabled="isDeleting"
        class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-red-600 text-red-600 font-bold hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        <svg
          class="w-4 h-4"
          :class="{ 'animate-pulse': isDeleting }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span>{{ isDeleting ? 'Deleting...' : 'Delete' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IShipment } from '@/types'

const props = defineProps<{
  shipment: IShipment
}>()

const emit = defineEmits<{
  edit: [shipment: IShipment]
  delete: [trackingId: string]
}>()

const isDeleting = ref(false)

const handleDelete = () => {
  isDeleting.value = true
  emit('delete', props.shipment.trackingId)
  setTimeout(() => {
    isDeleting.value = false
  }, 2000)
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'Delivered': 'bg-green-100 text-green-700 border border-green-200',
    'InTransit': 'bg-blue-100 text-blue-700 border border-blue-200',
    'Registered': 'bg-gray-100 text-gray-700 border border-gray-200',
    'PickedUp': 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    'EnRoute': 'bg-purple-100 text-purple-700 border border-purple-200',
    'InCustoms': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    'AtHub': 'bg-orange-100 text-orange-700 border border-orange-200',
    'OutForDelivery': 'bg-teal-100 text-teal-700 border border-teal-200',
    'Delayed': 'bg-red-100 text-red-700 border border-red-200',
    'Cancelled': 'bg-gray-600 text-white border border-gray-600',
    'Exception': 'bg-red-600 text-white border border-red-600',
  }
  return classes[status] || 'bg-gray-100 text-gray-700 border border-gray-200'
}
</script>