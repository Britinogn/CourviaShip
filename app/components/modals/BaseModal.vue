<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="handleClose"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="handleClose" />
        
        <!-- Modal Container -->
        <div
          class="relative bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-hidden"
          :class="sizeClasses"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-linear-to-r from-green-50 to-green-100">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ title }}
            </h2>
            <button
              @click="handleClose"
              class="p-2 hover:bg-white/50 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
            <slot />
          </div>

          <!-- Footer (optional) -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
  closeOnBackdrop: true
})

const emit = defineEmits<{
  close: []
}>()

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-md'
    case 'md': return 'max-w-2xl'
    case 'lg': return 'max-w-4xl'
    case 'xl': return 'max-w-6xl'
    case 'full': return 'max-w-7xl'
    default: return 'max-w-4xl'
  }
})

const handleClose = () => {
  if (props.closeOnBackdrop) {
    emit('close')
  }
}

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}
</style>