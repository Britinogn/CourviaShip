<template>
  <div class="h-full flex flex-col justify-center gap-3 py-2">
    <div v-for="item in props.data" :key="item.status" class="flex items-center gap-3">
      <span class="text-xs text-gray-600 w-28 shrink-0">{{ item.status }}</span>
      <div class="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500"
          :class="getBarColor(item.status)"
          :style="{ width: getBarWidth(item.count) }"
        ></div>
      </div>
      <span class="text-xs font-bold text-gray-700 w-6 text-right">{{ item.count }}</span>
    </div>

    <div v-if="!props.data || props.data.length === 0" class="text-center text-gray-400 text-sm">
      No data available
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatusCount } from '@/types'

const props = defineProps<{ data: StatusCount[] }>()

const getBarWidth = (count: number) => {
  const max = Math.max(...props.data.map(d => d.count), 1)
  return `${(count / max) * 100}%`
}

const getBarColor = (status: string) => {
  const colors: Record<string, string> = {
    Delivered: 'bg-green-500',
    InTransit: 'bg-blue-500',
    Registered: 'bg-gray-400',
    PickedUp: 'bg-indigo-500',
    EnRoute: 'bg-purple-500',
    InCustoms: 'bg-yellow-500',
    AtHub: 'bg-orange-500',
    OutForDelivery: 'bg-teal-500',
    Delayed: 'bg-red-400',
    Cancelled: 'bg-gray-600',
    Exception: 'bg-red-600',
  }
  return colors[status] || 'bg-gray-300'
}
</script>