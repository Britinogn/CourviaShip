<template>
  <div 
    class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md z-50"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border-2 border-gray-100 my-8 animate-fadeIn">
      <!-- Header -->
      <div class="flex items-center justify-between px-8 py-6 bg-black border-b-4 border-green-600">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">
              {{ isEdit ? "Edit Shipment" : "Create New Shipment" }}
            </h2>
            <p class="text-sm text-gray-300 mt-1">{{ isEdit ? 'Update shipment details' : 'Fill in the information below' }}</p>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all text-white"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <div class="overflow-y-auto max-h-[calc(90vh-180px)] bg-gray-50">
        <form @submit.prevent="handleSubmit" class="p-8 space-y-8">
          <!-- Sender Information -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-black">Sender Information</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Full Name <span class="text-red-600">*</span></label>
                <input 
                  v-model="formData.sender.name" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" 
                  placeholder="John Doe"
                />
                <p v-if="errors.senderName" class="text-red-600 text-xs mt-1 font-medium">{{ errors.senderName }}</p>
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Email <span class="text-red-600">*</span></label>
                <input 
                  v-model="formData.sender.email" 
                  type="email" 
                  required 
                  class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" 
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Phone Number <span class="text-red-600">*</span></label>
                <input 
                  v-model="formData.sender.phoneNumber" 
                  type="tel" 
                  required 
                  class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" 
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Company Name</label>
                <input 
                  v-model="formData.sender.companyName" 
                  type="text" 
                  class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" 
                  placeholder="Optional"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-bold mb-2 text-black">Address <span class="text-red-600">*</span></label>
                <input 
                  v-model="formData.sender.address" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" 
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">City <span class="text-red-600">*</span></label>
                <input 
                  v-model="formData.sender.city" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" 
                  placeholder="New York"
                />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Country <span class="text-red-600">*</span></label>
                <select 
                  v-model="formData.sender.country" 
                  required 
                  class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition"
                >
                  <option value="">Select Country</option>
                  <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Zip Code</label>
                <input 
                  v-model="formData.sender.zipCode" 
                  type="text" 
                  class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" 
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <!-- Receiver Information -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-black">Receiver Information</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Full Name <span class="text-red-600">*</span></label>
                <input v-model="formData.receiver.name" type="text" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="Jane Smith" />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Email <span class="text-red-600">*</span></label>
                <input v-model="formData.receiver.email" type="email" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="jane@example.com" />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Phone Number <span class="text-red-600">*</span></label>
                <input v-model="formData.receiver.phoneNumber" type="tel" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="+1 234 567 8900" />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Company Name</label>
                <input v-model="formData.receiver.companyName" type="text" class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="Optional" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-bold mb-2 text-black">Address <span class="text-red-600">*</span></label>
                <input v-model="formData.receiver.address" type="text" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="456 Oak Avenue" />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">City <span class="text-red-600">*</span></label>
                <input v-model="formData.receiver.city" type="text" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="Los Angeles" />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Country <span class="text-red-600">*</span></label>
                <select v-model="formData.receiver.country" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition">
                  <option value="">Select Country</option>
                  <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Zip Code</label>
                <input v-model="formData.receiver.zipCode" type="text" class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="90001" />
              </div>
            </div>
          </div>

          <!-- Package Information -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-black">Package Information</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Weight (kg) <span class="text-red-600">*</span></label>
                <input v-model.number="formData.package.weightKg" type="number" step="0.01" min="0.01" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="5.5" />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Dimensions <span class="text-red-600">*</span></label>
                <input v-model="formData.package.dimensions" type="text" required placeholder="50x40x30 cm" class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-bold mb-2 text-black">Description <span class="text-red-600">*</span></label>
                <textarea v-model="formData.package.description" required rows="3" class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="Electronics, Books, etc."></textarea>
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Declared Value ($)</label>
                <input v-model.number="formData.package.declaredValue" type="number" step="0.01" class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="500.00" />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Quantity</label>
                <input v-model.number="formData.package.quantity" type="number" min="1" class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition placeholder-gray-400" placeholder="1" />
              </div>
              <div class="md:col-span-2 flex items-center gap-8 bg-gray-50 p-4 rounded-xl">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" v-model="formData.package.isFragile" class="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-600" />
                  <span class="text-black font-semibold">Fragile Item</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" v-model="formData.package.requiresSignature" class="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-600" />
                  <span class="text-black font-semibold">Requires Signature</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Shipment Details -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-black">Shipment Details</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Status <span class="text-red-600">*</span></label>
                <select v-model="formData.status" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition">
                  <option v-for="status in Object.values(ShipmentStatus)" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold mb-2 text-black">Estimated Delivery <span class="text-red-600">*</span></label>
                <input v-model="estimatedDeliveryString" type="datetime-local" required class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black focus:border-green-600 focus:ring-0 transition" />
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Footer Buttons -->
      <div class="flex gap-4 p-8 bg-white border-t-2 border-gray-100">
        <button 
          type="button" 
          @click="$emit('close')" 
          class="flex-1 py-4 px-6 bg-gray-100 text-black font-bold rounded-xl hover:bg-gray-200 transition-all text-lg"
        >
          Cancel
        </button>
        <button 
          @click="handleSubmit"
          :disabled="isLoading" 
          class="flex-1 py-4 px-6 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
        >
          {{ isLoading ? 'Saving...' : isEdit ? 'Update Shipment' : 'Create Shipment' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { IShipment } from '@/types'
import { ShipmentStatus } from '@/types'
import { countries } from '@/utils/countries'

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

  if (!formData.value.sender.name.trim()) { errors.value.senderName = 'Required'; valid = false }
  if (!formData.value.receiver.name.trim()) { errors.value.receiverName = 'Required'; valid = false }
  if (formData.value.package.weightKg <= 0) { errors.value.weight = 'Must be > 0'; valid = false }

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

  emit('save', fd)
  emit('close')
  isLoading.value = false
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>