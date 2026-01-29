<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div
      class="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-scale-in"
    >
      <h2 class="text-xl font-bold text-black mb-2">
        Delete shipment
      </h2>

      <p class="text-gray-600 mb-6">
        Are you sure you want to delete shipment
        <span class="font-mono font-semibold text-black">
          {{ trackingId }}
        </span>?
        This action cannot be undone.
      </p>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          @click="$emit('confirm')"
          class="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  trackingId?: string
}>()

defineEmits<{
  cancel: []
  confirm: []
}>()
</script>

<style scoped>
@keyframes scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.15s ease-out;
}
</style>
