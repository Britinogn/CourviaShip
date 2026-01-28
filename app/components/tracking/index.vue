<template>
  <div class="min-h-screen pt-20 bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-green-600 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-4">Track Your Shipment</h1>
          <p class="text-xl text-green-50">
            Enter your tracking number to get real-time updates on your package
          </p>
        </div>
      </div>
    </section>

    <!-- Tracking Form -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <form @submit.prevent="handleTrack" class="space-y-6">
              <div>
                <label for="trackingId" class="block text-sm font-semibold text-gray-700 mb-2">
                  Tracking Number
                </label>
                <input
                  id="trackingId"
                  v-model="trackingId"
                  type="text"
                  required
                  placeholder="Enter your tracking number (e.g., CVS123456789)"
                  class="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
                <p class="mt-2 text-sm text-gray-500">
                  Your tracking number can be found in your confirmation email
                </p>
              </div>

              <button
                type="submit"
                :disabled="isTracking || !trackingId"
                class="w-full bg-green-600 cursor-pointer text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <svg v-if="isTracking" class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isTracking ? 'Tracking...' : 'Track Shipment' }}</span>
              </button>
            </form>
          </div>

          <!-- Sample Tracking Numbers -->
          <div class="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-blue-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="font-semibold text-blue-900 mb-2">Need help finding your tracking number?</h3>
                <p class="text-sm text-blue-800">
                  Check your confirmation email or contact our support team at 
                  <a href="mailto:support@courviaship.com" class="underline font-semibold">support@courviaship.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tracking Results -->
    <section v-if="shipment" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto space-y-8">
          <!-- Main Shipment Card -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <!-- Header with Status Badge -->
            <div class="bg-green-600 px-8 py-6 text-white">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold">Shipment Details</h2>
                <span 
                  class="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm"
                  :class="getStatusClass(shipment.status)"
                >
                  {{ shipment.status || 'Unknown' }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-8">
              <div class="grid md:grid-cols-2 gap-8">
                <!-- Tracking Number -->
                <div class="space-y-2">
                  <p class="text-sm font-bold text-gray-700 uppercase tracking-wide">Tracking Number</p>
                  <p class="text-2xl font-mono font-bold text-gray-900">{{ shipment.trackingId || 'N/A' }}</p>
                </div>

                <!-- Estimated Delivery -->
                <div class="space-y-2">
                  <p class="text-sm font-bold text-gray-700 uppercase tracking-wide">Estimated Delivery</p>
                  <p class="text-2xl font-mono font-bold text-gray-900">
                    {{ shipment.estimatedDelivery ? formatDate(shipment.estimatedDelivery) : 'N/A' }}
                  </p>
                </div>

                <!-- Sender (From) -->
                <div class="space-y-3 bg-gray-50 p-6 rounded-xl">
                  <p class="text-base font-bold text-gray-800 border-b border-gray-200 pb-2">From</p>
                  <div class="space-y-2 text-gray-900">
                    <p><span class="font-bold">Name:</span> {{ shipment.sender?.name || 'N/A' }}</p>
                    <p><span class="font-bold">City:</span> {{ shipment.sender?.city || 'N/A' }}</p>
                    <p><span class="font-bold">Country:</span> {{ shipment.sender?.country || 'N/A' }}</p>
                    <!-- <p v-if="shipment.sender?.phoneNumber"><span class="font-bold">Phone:</span> {{ shipment.sender.phoneNumber }}</p> -->
                  </div>
                </div>

                <!-- Receiver (To) -->
                <div class="space-y-3 bg-gray-50 p-6 rounded-xl">
                  <p class="text-base font-bold text-gray-800 border-b border-gray-200 pb-2">To</p>
                  <div class="space-y-2 text-gray-900">
                    <p><span class="font-bold">Name:</span> {{ shipment.receiver?.name || 'N/A' }}</p>
                    <p><span class="font-bold">City:</span> {{ shipment.receiver?.city || 'N/A' }}</p>
                    <p><span class="font-bold">Country:</span> {{ shipment.receiver?.country || 'N/A' }}</p>
                    <p v-if="shipment.receiver?.phoneNumber"><span class="font-bold">Phone:</span> {{ shipment.receiver.phoneNumber }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Location Card -->
          <div v-if="shipment.currentLocation" class="bg-green-50 border-2 border-green-200 rounded-2xl p-8 shadow-md">
            <div class="flex items-start gap-5">
              <div class="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-green-900 mb-3">Current Location</h3>
                <div class="space-y-2 text-lg text-green-800">
                  <p><span class="font-bold">City:</span> {{ shipment.currentLocation?.city || 'N/A' }}</p>
                  <p><span class="font-bold">Country:</span> {{ shipment.currentLocation?.country || 'N/A' }}</p>
                  <p v-if="shipment.currentLocation?.name"><span class="font-bold">Name:</span> {{ shipment.currentLocation.name }}</p>
                  <p v-if="shipment.currentLocation?.address"><span class="font-bold">Address:</span> {{ shipment.currentLocation.address }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Track Another Button -->
          <div class="text-center mt-12">
            <button
              @click="resetTracking"
              class="px-10 py-4 cursor-pointer bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition-colors shadow-lg"
            >
              Track Another Shipment
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Error Message -->
    <section v-if="error" class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-red-900 mb-2">Shipment Not Found</h3>
            <p class="text-red-700 mb-6">{{ error }}</p>
            <button
              @click="resetTracking"
              class="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- How Tracking Works -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">How {{ appName }} Tracking Works</h2>
            <p class="text-xl text-gray-600">Stay informed every step of the way</p>
          </div>

          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Shipment Created</h3>
              <p class="text-sm text-gray-600">Your tracking number is generated when your shipment is registered</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Real-Time Updates</h3>
              <p class="text-sm text-gray-600">Get instant notifications as your package moves through our network</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Live Location</h3>
              <p class="text-sm text-gray-600">Track your package's current location and estimated delivery time</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Delivery Confirmed</h3>
              <p class="text-sm text-gray-600">Receive confirmation when your package is safely delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
//import type { IShipment } from '~/types'
import type { ITrackingShipment } from '~/types'
import { ShipmentStatus } from '~/types'
import { ref } from 'vue'
import { useTracking } from '@/composables/useTracking' 
import {appName} from '@/utils/appName'


const { trackShipment } = useTracking()
const toast = useToast()

const trackingId = ref<string>('')
const isTracking = ref(false)
const error = ref<string | null>(null)
//const shipment = ref<IShipment | null>(null) 
const shipment = ref<ITrackingShipment | null>(null)


const handleTrack = async () => {
  if (!trackingId.value.trim()) {
    error.value = 'Please enter a tracking number'
    toast.error('Tracking number required')
    return
  }

  isTracking.value = true
  error.value = null
  shipment.value = null

  try {
    const { data, error: trackError } = await trackShipment(trackingId.value)

    if (trackError) {
      error.value = trackError
      toast.error(trackError)
      return
    }

    // Success: data is ITrackingShipment from your composable
    shipment.value = data // adjust if you need to map to IShipment
    toast.success('Shipment found!')
  } catch (err: any) {
    // Fallback in case of unexpected network error
    error.value = err.message || 'Something went wrong. Please try again.'
    toast.error('Tracking failed')
  } finally {
    isTracking.value = false
  }
}










const resetTracking = () => {
  trackingId.value = ''
  shipment.value = null
  error.value = null
}

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// const getStatusClass = (status: ShipmentStatus) => {
//   const classes: Record<ShipmentStatus, string> = {
//     [ShipmentStatus.Registered]: 'bg-gray-100 text-gray-800',
//     [ShipmentStatus.PickedUp]: 'bg-blue-100 text-blue-800',
//     [ShipmentStatus.InTransit]: 'bg-purple-100 text-purple-800',
//     [ShipmentStatus.EnRoute]: 'bg-indigo-100 text-indigo-800',
//     [ShipmentStatus.InCustoms]: 'bg-yellow-100 text-yellow-800',
//     [ShipmentStatus.AtHub]: 'bg-orange-100 text-orange-800',
//     [ShipmentStatus.OutForDelivery]: 'bg-green-100 text-green-800',
//     [ShipmentStatus.Delivered]: 'bg-green-600 text-white',
//     [ShipmentStatus.Delayed]: 'bg-red-100 text-red-800',
//     [ShipmentStatus.Cancelled]: 'bg-gray-600 text-white',
//     [ShipmentStatus.Exception]: 'bg-red-600 text-white'
//   }
//   return classes[status] || 'bg-gray-100 text-gray-800'
// }

const getStatusClass = (status: ShipmentStatus): string => {
  switch (status) {
    case ShipmentStatus.Registered:
      return 'bg-gray-100 text-gray-800'

    case ShipmentStatus.PickedUp:
      return 'bg-blue-100 text-blue-800'

    case ShipmentStatus.InTransit:
      return 'bg-purple-100 text-purple-800'

    case ShipmentStatus.EnRoute:
      return 'bg-indigo-100 text-indigo-800'

    case ShipmentStatus.InCustoms:
      return 'bg-yellow-100 text-yellow-800'

    case ShipmentStatus.AtHub:
      return 'bg-orange-100 text-orange-800'

    case ShipmentStatus.OutForDelivery:
      return 'bg-green-100 text-green-800'

    case ShipmentStatus.Delivered:
      return 'bg-green-600 text-white'

    case ShipmentStatus.Delayed:
      return 'bg-red-100 text-red-800'

    case ShipmentStatus.Cancelled:
      return 'bg-gray-600 text-white'

    case ShipmentStatus.Exception:
      return 'bg-red-600 text-white'

    default:
      return 'bg-gray-100 text-gray-800'
  }
}


useSeoMeta({
  title: `Track Shipment - ${appName}`,
  description: `Track your ${appName} shipment in real-time. Enter your tracking number to get live updates on your package location and delivery status.`
})
</script>