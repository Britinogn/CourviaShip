<template>
  <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm top-16 left-0 bottom-0 right-0 z-50">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col border border-gray-200">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-linear-to-r from-green-50 to-green-100">
        <h2 class="text-2xl font-bold text-black">
          {{ isEdit ? "Edit Shipment" : "Create New Shipment" }}
        </h2>
        <button
          @click="$emit('close')"
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all text-black text-xl font-bold"
        >
          ✕
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
        <!-- Sender Information -->
        <div class="p-6 rounded-xl border border-gray-200 bg-white">
          <h3 class="text-xl font-bold text-black mb-5">Sender Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Full Name *</label>
              <input v-model="formData.sender.name" type="text" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
              <p v-if="errors.senderName" class="text-red-600 text-xs mt-1">{{ errors.senderName }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Email *</label>
              <input v-model="formData.sender.email" type="email" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Phone Number *</label>
              <input v-model="formData.sender.phoneNumber" type="tel" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Company Name</label>
              <input v-model="formData.sender.companyName" type="text" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold mb-2 text-black">Address *</label>
              <input v-model="formData.sender.address" type="text" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">City *</label>
              <input v-model="formData.sender.city" type="text" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Country *</label>
              <select v-model="formData.sender.country" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition">
                <option value="">Select Country</option>
                <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Zip Code</label>
              <input v-model="formData.sender.zipCode" type="text" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
          </div>
        </div>

        <!-- Receiver Information -->
        <div class="p-6 rounded-xl border border-gray-200 bg-white">
          <h3 class="text-xl font-bold text-black mb-5">Receiver Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Full Name *</label>
              <input v-model="formData.receiver.name" type="text" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Email *</label>
              <input v-model="formData.receiver.email" type="email" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Phone Number *</label>
              <input v-model="formData.receiver.phoneNumber" type="tel" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Company Name</label>
              <input v-model="formData.receiver.companyName" type="text" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold mb-2 text-black">Address *</label>
              <input v-model="formData.receiver.address" type="text" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">City *</label>
              <input v-model="formData.receiver.city" type="text" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Country *</label>
              <select v-model="formData.receiver.country" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition">
                <option value="">Select Country</option>
                <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Zip Code</label>
              <input v-model="formData.receiver.zipCode" type="text" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
          </div>
        </div>

        <!-- Package Information -->
        <div class="p-6 rounded-xl border border-gray-200 bg-white">
          <h3 class="text-xl font-bold text-black mb-5">Package Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Weight (kg) *</label>
              <input v-model.number="formData.package.weightKg" type="number" step="0.01" min="0.01" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Dimensions *</label>
              <input v-model="formData.package.dimensions" type="text" required placeholder="e.g. 50x40x30 cm" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold mb-2 text-black">Description *</label>
              <textarea v-model="formData.package.description" required rows="3" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Declared Value</label>
              <input v-model.number="formData.package.declaredValue" type="number" step="0.01" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Quantity</label>
              <input v-model.number="formData.package.quantity" type="number" min="1" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
            <div class="flex items-center gap-8">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="formData.package.isFragile" class="h-5 w-5 text-green-600 border-gray-300 rounded" />
                <span class="text-black">Fragile</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="formData.package.requiresSignature" class="h-5 w-5 text-green-600 border-gray-300 rounded" />
                <span class="text-black">Requires Signature</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Shipment Details -->
        <div class="p-6 rounded-xl border border-gray-200 bg-white">
          <h3 class="text-xl font-bold text-black mb-5">Shipment Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Status *</label>
              <select v-model="formData.status" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition">
                <option v-for="status in Object.values(ShipmentStatus)" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-black">Estimated Delivery *</label>
              <input v-model="estimatedDeliveryString" type="datetime-local" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:border-green-600 focus:ring-1 focus:ring-green-600 transition" />
            </div>
          </div>
        </div>


        <!-- Buttons -->
        <div class="flex gap-4 pt-6 border-t border-gray-200">
          <button type="button" @click="$emit('close')" class="flex-1 py-3 px-6 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 transition">
            Cancel
          </button>
          <button type="submit" :disabled="isLoading" class="flex-1 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50">
            {{ isLoading ? 'Saving...' : isEdit ? 'Update Shipment' : 'Create Shipment' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { IShipment } from '@/types'
import { ShipmentStatus } from '@/types'  // ← value import (no "type")
import { countries } from '@/utils/countries'

// const shipmentStore = useShipmentStore

const props = defineProps<{
  isOpen: boolean
  shipment?: IShipment | null
}>()

const emit = defineEmits<{
  close: []
  save: [formData: FormData]
}>()

const isEdit = computed(() => !!props.shipment)
const isLoading = ref(false)
const errors = ref<Record<string, string>>({})
const estimatedDeliveryString = ref('')

const formData = ref<IShipment>({
  trackingId: '',
  sender: {
    name: '',
    email: '',
    phoneNumber: '',
    companyName: undefined,
    alternatePhone: undefined,
    address: '',
    city: '',
    country: countries[0] || 'United States' as Country,
    zipCode: undefined
  },
  receiver: {
    name: '',
    email: '',
    phoneNumber: '',
    companyName: undefined,
    alternatePhone: undefined,
    address: '',
    city: '',
    country: countries[0] || 'United States' as Country,
    zipCode: undefined
  },
  package: {
    weightKg: 0,
    dimensions: '',
    description: '',
    declaredValue: undefined,
    quantity: 1,
    isFragile: false,
    requiresSignature: false
  },
  origin: {
    address: '',
    city: '',
    country: countries[0] || 'United States' as Country,
    zipCode: undefined
  },
  destination: {
    address: '',
    city: '',
    country: countries[0] || 'United States' as Country,
    zipCode: undefined
  },
  status: ShipmentStatus.InTransit,
  registeredAt: new Date(),
  estimatedDelivery: new Date(),
  currentLocation: undefined
})

onMounted(() => {
  if (props.shipment) {
    formData.value = { ...props.shipment }
    estimatedDeliveryString.value = new Date(props.shipment.estimatedDelivery).toISOString().slice(0, 16)
  } else {
    estimatedDeliveryString.value = new Date().toISOString().slice(0, 16)
  }
})

// Sync watchers (unchanged)
watch(() => formData.value.sender, (sender) => {
  if (sender && formData.value.origin) {
    formData.value.origin = {
      address: sender.address || '',
      city: sender.city || '',
      country: sender.country || countries[0] as Country,
      zipCode: sender.zipCode || undefined
    }
  }
}, { deep: true })

watch(() => formData.value.receiver, (receiver) => {
  if (receiver && formData.value.destination) {
    formData.value.destination = {
      address: receiver.address || '',
      city: receiver.city || '',
      country: receiver.country || countries[0] as Country,
      zipCode: receiver.zipCode || undefined
    }
  }
}, { deep: true })

const validateForm = () => {
  errors.value = {}
  let valid = true

  // Sender
  if (!formData.value.sender.name.trim()) { errors.value.senderName = 'Sender name required'; valid = false }
  if (!formData.value.sender.email.trim()) { errors.value.senderEmail = 'Sender email required'; valid = false }
  if (!formData.value.sender.phoneNumber.trim()) { errors.value.senderPhone = 'Sender phone required'; valid = false }
  if (!formData.value.sender.address.trim()) { errors.value.senderAddress = 'Sender address required'; valid = false }
  if (!formData.value.sender.city.trim()) { errors.value.senderCity = 'Sender city required'; valid = false }
  if (!formData.value.sender.country) { errors.value.senderCountry = 'Sender country required'; valid = false }

  // Receiver
  if (!formData.value.receiver.name.trim()) { errors.value.receiverName = 'Receiver name required'; valid = false }
  if (!formData.value.receiver.email.trim()) { errors.value.receiverEmail = 'Receiver email required'; valid = false }
  if (!formData.value.receiver.phoneNumber.trim()) { errors.value.receiverPhone = 'Receiver phone required'; valid = false }
  if (!formData.value.receiver.address.trim()) { errors.value.receiverAddress = 'Receiver address required'; valid = false }
  if (!formData.value.receiver.city.trim()) { errors.value.receiverCity = 'Receiver city required'; valid = false }
  if (!formData.value.receiver.country) { errors.value.receiverCountry = 'Receiver country required'; valid = false }

  // Package
  if (formData.value.package.weightKg <= 0) { errors.value.weight = 'Weight must be > 0'; valid = false }
  if (!formData.value.package.dimensions.trim()) { errors.value.dimensions = 'Dimensions required'; valid = false }
  if (!formData.value.package.description.trim()) { errors.value.description = 'Package description required'; valid = false }
  if (!formData.value.status) { errors.value.status = 'Status required'; valid = false }

  return valid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true

  const fd = new FormData()

  fd.append('trackingId', formData.value.trackingId || `SHIP-${Date.now().toString().slice(-8)}`)
  fd.append('sender', JSON.stringify(formData.value.sender))
  fd.append('receiver', JSON.stringify(formData.value.receiver))
  fd.append('package', JSON.stringify(formData.value.package))
  fd.append('origin', JSON.stringify(formData.value.origin))
  fd.append('destination', JSON.stringify(formData.value.destination))
  fd.append('status', formData.value.status!)
  fd.append('estimatedDelivery', new Date(estimatedDeliveryString.value).toISOString())
  fd.append('registeredAt', (formData.value.registeredAt || new Date()).toISOString())

    // if (isEdit.value) {
    //     await shipmentStore.updateShipment(formData.value._id!, fd)
    // } else {
    //     await shipmentStore.createShipment(fd)
    // }

  emit('save', fd)
  emit('close')
  isLoading.value = false
}
</script>