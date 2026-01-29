<template>
  <div 
    class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
    @click.self="$emit('cancel')"
  >
    <div 
      class="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-scaleIn border-2 border-gray-100"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-8 py-6 bg-black border-b-4 border-red-600">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">
            {{ title || 'Confirm Action' }}
          </h2>
        </div>
        <button 
          @click="$emit('cancel')"
          class="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all text-white"
          aria-label="Close"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-8 py-8">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-gray-900 text-lg font-medium leading-relaxed">{{ message }}</p>
            <p class="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center gap-4 px-8 py-6 bg-gray-50 border-t-2 border-gray-100">
        <button 
          @click="$emit('cancel')"
          class="flex-1 px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all border-2 border-gray-200 text-lg"
        >
          Cancel
        </button>
        <button 
          @click="$emit('confirm')"
          class="flex-1 px-6 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg text-lg"
        >
          {{ confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  message: string
  confirmText?: string
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.2s ease-out;
}
</style>