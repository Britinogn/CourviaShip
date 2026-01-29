<template>
  <div class="h-full flex items-center justify-center text-gray-500">
    <p>Status chart placeholder (use a real chart library here)</p>
  </div>
</template>

<script setup lang="ts">
// import { defineProps } from 'vue'
const props = defineProps<{ data: Array<{ _id: string; count: number }> }>()
</script>
