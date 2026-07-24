<template>
  <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
    <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
      {{ title }}
    </h3>
    <div class="h-64 sm:h-80">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ title: string }>()
</script>