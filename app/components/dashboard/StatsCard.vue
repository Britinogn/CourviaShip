<template>
  <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between">
    <div>
      <p class="text-sm font-medium text-gray-600">{{ title }}</p>
      <p class="text-3xl font-bold text-gray-900 mt-2">{{ count }}</p>
    </div>
    <div :class="iconBackground">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ title: string; count: number; iconColor: string }>()

const iconBackground = computed(() => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 p-3 rounded-full',
    green: 'bg-green-100 text-green-600 p-3 rounded-full',
    orange: 'bg-orange-100 text-orange-600 p-3 rounded-full',
    red: 'bg-red-100 text-red-600 p-3 rounded-full',
    purple: 'bg-purple-100 text-purple-600 p-3 rounded-full',
  }
  return colors[props.iconColor] || 'bg-gray-100 text-gray-600 p-3 rounded-full'
})
</script>
