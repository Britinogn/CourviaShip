<template>
  <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h3>
    <div class="h-80">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>
