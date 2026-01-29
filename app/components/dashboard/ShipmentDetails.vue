<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Shipment Receipt</h1>

    <div v-if="shipment">
      <p><strong>Tracking ID:</strong> {{ shipment.trackingId }}</p>
      <p><strong>Sender:</strong> {{ shipment.sender?.name }}</p>
      <p><strong>Receiver:</strong> {{ shipment.receiver?.name }}</p>
      <p><strong>Status:</strong> {{ shipment.status }}</p>

      <div class="mt-6">
        <h2 class="font-semibold text-xl mb-2">Receipt</h2>
        <iframe
          v-if="receiptPdf"
          :src="`data:application/pdf;base64,${receiptPdf}`"
          class="w-full h-[600px] border"
        ></iframe>
        <p v-else>No receipt available.</p>
      </div>
    </div>

    <div v-else>
      <p>Loading shipment...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const shipment = ref<any>(null)
const receiptPdf = ref<string | null>(null)

onMounted(() => {
  // Pass shipment details via route query or state
  shipment.value = route?.query?.shipment ? JSON.parse(route.query.shipment as string) : null
  receiptPdf.value = route?.query?.receiptPdf as string || null
})
</script>
