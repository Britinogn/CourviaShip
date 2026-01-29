<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-green-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <div class="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold mb-4">Track Your Shipment</h1>
          <p class="text-xl text-green-50">
            Enter your tracking number to get real-time updates on your package
          </p>
        </div>
      </div>
    </section>

    <!-- Tracking Form -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
            <form @submit.prevent="handleTrack" class="space-y-6">
              <div>
                <label for="trackingId" class="block text-sm font-bold text-black mb-3">
                  Tracking Number
                </label>
                <input
                  id="trackingId"
                  v-model="trackingId"
                  type="text"
                  required
                  placeholder="Enter tracking number (e.g., SHIP12345678)"
                  class="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                />
                <p class="mt-3 text-sm text-gray-500 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Your tracking number can be found in your confirmation email
                </p>
              </div>

              <button
                type="submit"
                :disabled="isTracking || !trackingId"
                class="w-full bg-green-600 text-white py-5 px-6 rounded-xl font-bold text-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
              >
                <svg v-if="isTracking" class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isTracking ? 'Tracking...' : 'Track Shipment' }}</span>
              </button>
            </form>
          </div>

          <!-- Help Info -->
          <div class="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-blue-900 mb-2">Need help finding your tracking number?</h3>
                <p class="text-sm text-blue-800">
                  Check your confirmation email or contact our support team at 
                  <a href="mailto:support@courviaship.com" class="underline font-bold">support@courviaship.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tracking Results -->
    <section v-if="shipment" class="py-16 bg-white" ref="resultsSection">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto space-y-8">
          <!-- Main Shipment Card -->
          <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
            <!-- Header -->
            <div class="bg-black px-8 py-6 text-white border-b-4 border-green-600">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold">Shipment Details</h2>
                </div>
                <span 
                  class="px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-wide"
                  :class="getStatusClass(shipment.status)"
                >
                  {{ shipment.status || 'Unknown' }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-8">
              <div class="grid md:grid-cols-2 gap-8 mb-8">
                <!-- Tracking Number -->
                <div class="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
                  <p class="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Tracking Number</p>
                  <p class="text-2xl font-bold text-black font-mono">{{ shipment.trackingId || 'N/A' }}</p>
                </div>

                <!-- Estimated Delivery -->
                <div class="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
                  <p class="text-sm font-bold text-green-700 uppercase tracking-wider mb-2">Estimated Delivery</p>
                  <p class="text-2xl font-bold text-green-600">
                    {{ shipment.estimatedDelivery ? formatDate(shipment.estimatedDelivery) : 'N/A' }}
                  </p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-8">
                <!-- Sender -->
                <div class="bg-white border-2 border-gray-200 p-8 rounded-2xl">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p class="text-xl font-bold text-black">Sender</p>
                  </div>
                  <div class="space-y-3 text-gray-900">
                    <p class="flex items-start gap-2">
                      <span class="font-bold text-gray-700 min-w-[80px]">Name:</span>
                      <span>{{ shipment.sender?.name || 'N/A' }}</span>
                    </p>
                    <p class="flex items-start gap-2">
                      <span class="font-bold text-gray-700 min-w-[80px]">City:</span>
                      <span>{{ shipment.sender?.city || 'N/A' }}</span>
                    </p>
                    <p class="flex items-start gap-2">
                      <span class="font-bold text-gray-700 min-w-[80px]">Country:</span>
                      <span>{{ shipment.sender?.country || 'N/A' }}</span>
                    </p>
                  </div>
                </div>

                <!-- Receiver -->
                <div class="bg-white border-2 border-gray-200 p-8 rounded-2xl">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <p class="text-xl font-bold text-black">Receiver</p>
                  </div>
                  <div class="space-y-3 text-gray-900">
                    <p class="flex items-start gap-2">
                      <span class="font-bold text-gray-700 min-w-[80px]">Name:</span>
                      <span>{{ shipment.receiver?.name || 'N/A' }}</span>
                    </p>
                    <p class="flex items-start gap-2">
                      <span class="font-bold text-gray-700 min-w-[80px]">City:</span>
                      <span>{{ shipment.receiver?.city || 'N/A' }}</span>
                    </p>
                    <p class="flex items-start gap-2">
                      <span class="font-bold text-gray-700 min-w-[80px]">Country:</span>
                      <span>{{ shipment.receiver?.country || 'N/A' }}</span>
                    </p>
                    <p v-if="shipment.receiver?.phoneNumber" class="flex items-start gap-2">
                      <span class="font-bold text-gray-700 min-w-[80px]">Phone:</span>
                      <span>{{ shipment.receiver.phoneNumber }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Location Card -->
          <div v-if="shipment.currentLocation" class="bg-green-600 text-white rounded-3xl p-8 shadow-2xl">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-9 h-9 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold mb-4">Current Location</h3>
                <div class="space-y-3 text-lg">
                  <p><span class="font-bold">City:</span> {{ shipment.currentLocation?.city || 'N/A' }}</p>
                  <p><span class="font-bold">Country:</span> {{ shipment.currentLocation?.country || 'N/A' }}</p>
                  <p v-if="shipment.currentLocation?.name"><span class="font-bold">Facility:</span> {{ shipment.currentLocation.name }}</p>
                  <p v-if="shipment.currentLocation?.address"><span class="font-bold">Address:</span> {{ shipment.currentLocation.address }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Track Another Button -->
          <div class="text-center pt-8">
            <button
              @click="resetTracking"
              class="px-10 py-5 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl"
            >
              Track Another Shipment
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Error Message -->
    <section v-if="error" class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white border-2 border-red-200 rounded-3xl p-10 text-center shadow-2xl">
            <div class="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-red-900 mb-3">Shipment Not Found</h3>
            <p class="text-red-700 text-lg mb-8">{{ error }}</p>
            <button
              @click="resetTracking"
              class="px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg"
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
            <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">How {{ appName }} Tracking Works</h2>
            <p class="text-xl text-gray-600">Stay informed every step of the way</p>
          </div>

          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-20 h-20 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span class="text-3xl font-bold">1</span>
              </div>
              <h3 class="font-bold text-black text-lg mb-3">Shipment Created</h3>
              <p class="text-gray-600 leading-relaxed">Your tracking number is generated when your shipment is registered</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span class="text-3xl font-bold">2</span>
              </div>
              <h3 class="font-bold text-black text-lg mb-3">Real-Time Updates</h3>
              <p class="text-gray-600 leading-relaxed">Get instant notifications as your package moves through our network</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span class="text-3xl font-bold">3</span>
              </div>
              <h3 class="font-bold text-black text-lg mb-3">Live Location</h3>
              <p class="text-gray-600 leading-relaxed">Track your package's current location and estimated delivery time</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span class="text-3xl font-bold">4</span>
              </div>
              <h3 class="font-bold text-black text-lg mb-3">Delivery Confirmed</h3>
              <p class="text-gray-600 leading-relaxed">Receive confirmation when your package is safely delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ITrackingShipment } from '~/types'
import { ShipmentStatus } from '~/types'
import { ref, watch } from 'vue'
import { useTracking } from '@/composables/useTracking'

const { trackShipment } = useTracking()
const toast = useToast()

const trackingId = ref<string>('')
const isTracking = ref(false)
const error = ref<string | null>(null)
const shipment = ref<ITrackingShipment | null>(null)
const resultsSection = ref<HTMLElement | null>(null)  // ← added ref for scroll target

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

    shipment.value = data
    toast.success('Shipment found!')
  } catch (err: any) {
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

// Auto-scroll to results when shipment is successfully loaded
watch(shipment, (newShipment) => {
  if (newShipment && resultsSection.value) {
    // Small delay to let DOM update
    setTimeout(() => {
      resultsSection.value?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 300)
  }
})

const appName = 'CourviaShip'

useSeoMeta({
  title: `Track Shipment - ${appName}`,
  description: `Track your ${appName} shipment in real-time. Enter your tracking number to get live updates on your package location and delivery status.`
})
</script>