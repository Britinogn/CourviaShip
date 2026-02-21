<template>
  <div class="h-full flex flex-col gap-6 py-2 overflow-y-auto">
    
    <!-- Top Origins -->
    <div>
      <h4 class="text-sm font-bold text-gray-700 mb-3">Top Origins</h4>
      <div class="flex flex-col gap-2">
        <div v-for="item in dashboardStore.overview?.topOrigins" :key="item.country" class="flex items-center gap-3">
          <span class="text-xs text-gray-600 w-28 shrink-0">{{ item.country }}</span>
          <div class="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              class="h-full bg-green-500 rounded-full transition-all duration-500"
              :style="{ width: getBarWidth(item.count, dashboardStore.overview?.topOrigins) }"
            ></div>
          </div>
          <span class="text-xs font-bold text-gray-700 w-6 text-right">{{ item.count }}</span>
        </div>
      </div>
    </div>

    <!-- Top Destinations -->
    <div>
      <h4 class="text-sm font-bold text-gray-700 mb-3">Top Destinations</h4>
      <div class="flex flex-col gap-2">
        <div v-for="item in dashboardStore.overview?.topDestinations" :key="item.country" class="flex items-center gap-3">
          <span class="text-xs text-gray-600 w-28 shrink-0">{{ item.country }}</span>
          <div class="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              class="h-full bg-blue-500 rounded-full transition-all duration-500"
              :style="{ width: getBarWidth(item.count, dashboardStore.overview?.topDestinations) }"
            ></div>
          </div>
          <span class="text-xs font-bold text-gray-700 w-6 text-right">{{ item.count }}</span>
        </div>
      </div>
    </div>

    <div v-if="!dashboardStore.overview?.topOrigins?.length" class="text-center text-gray-400 text-sm">
      No data available
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CountryCount } from '@/types'

const dashboardStore = useDashboardStore()

const getBarWidth = (count: number, data?: CountryCount[]) => {
  const max = Math.max(...(data ?? []).map(d => d.count), 1)
  return `${(count / max) * 100}%`
}
</script>