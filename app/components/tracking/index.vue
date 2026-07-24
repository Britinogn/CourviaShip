<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-green-700 text-white py-24 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute -top-20 -right-20 w-72 h-72 bg-white rounded-full"></div>
        <div class="absolute -bottom-24 -left-20 w-80 h-80 bg-white rounded-full"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">

          <div class="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-8">
            <svg 
              class="w-12 h-12 text-green-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M9 20l-5.447-2.724A2 2 0 012.5 15.487V8.513a2 2 0 011.053-1.789L9 4m0 16l6-3m-6 3V4m6 13l5.447-2.724A2 2 0 0021.5 12.487V5.513a2 2 0 00-1.053-1.789L15 1m0 16V1m0 0L9 4"
              />
            </svg>
          </div>

          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Track Your Shipment
          </h1>

          <p class="max-w-2xl mx-auto text-lg md:text-xl text-green-100 leading-relaxed">
            Stay updated with your delivery journey. Enter your tracking number and
            monitor your package status in real time.
          </p>

          <div class="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            <div class="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  d="M5 13l4 4L19 7"/>
              </svg>
              Real-time Tracking
            </div>

            <div class="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  d="M12 8v4l3 3"/>
              </svg>
              Delivery Updates
            </div>

            <div class="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  d="M3 12h18M12 3v18"/>
              </svg>
              Global Coverage
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Tracking Form -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">

          <!-- Tracking Card -->
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">

            <div class="text-center mb-8">
              <div class="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg 
                  class="w-7 h-7 text-green-700" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2"
                    d="M20 12H4m16 0l-4-4m4 4l-4 4"
                  />
                </svg>
              </div>

              <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
                Enter Tracking Number
              </h2>

              <p class="text-gray-500 mt-2">
                Get the latest status of your shipment instantly
              </p>
            </div>


            <form @submit.prevent="handleTrack" class="space-y-6">

              <div>
                <label 
                  for="trackingId" 
                  class="block text-sm font-semibold text-gray-800 mb-3"
                >
                  Tracking Number
                </label>

                <div class="relative">

                  <input
                    id="trackingId"
                    v-model="trackingId"
                    type="text"
                    required
                    placeholder="CRV-XXXXXX"
                    class="w-full px-5 py-4 pl-14 text-lg bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-green-100 focus:border-green-600 outline-none transition-all"
                  />

                  <svg 
                    class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 20l-5.447-2.724A2 2 0 012.5 15.487V8.513a2 2 0 011.053-1.789L9 4m0 16l6-3m-6 3V4m6 13l5.447-2.724A2 2 0 0021.5 12.487V5.513a2 2 0 00-1.053-1.789L15 1m0 16V1"
                    />
                  </svg>

                </div>


                <p class="mt-3 text-sm text-gray-500 flex items-center gap-2">
                  <svg 
                    class="w-4 h-4 text-green-600"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  Found in your shipment confirmation email
                </p>
              </div>


              <button
                type="submit"
                :disabled="isTracking || !trackingId"
                class="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >

                <svg 
                  v-if="isTracking"
                  class="animate-spin w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle 
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />

                  <path 
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>

                <span>
                  {{ isTracking ? 'Tracking Shipment...' : 'Track Shipment' }}
                </span>

              </button>

            </form>

          </div>


          <!-- Support Card -->
          <div class="mt-8 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

            <div class="flex gap-4">

              <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg 
                  class="w-6 h-6 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 5.636a9 9 0 010 12.728m0-12.728L5.636 18.364m12.728-12.728L18.364 18.364"
                  />
                </svg>
              </div>


              <div>
                <h3 class="font-bold text-gray-900 mb-1">
                  Can't find your tracking number?
                </h3>

                <p class="text-sm text-gray-600 leading-relaxed">
                  Check your confirmation email or reach our support team at
                  <a 
                    href="mailto:support@courviaship.com"
                    class="text-green-700 font-semibold hover:underline"
                  >
                    support@courviaship.com
                  </a>
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- Tracking Results -->
    <section v-if="shipment" class="py-20 bg-gray-50" ref="resultsSection">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto space-y-8">

          <!-- Shipment Overview -->
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden">

            <!-- Header -->
            <div class="bg-black px-8 py-7 text-white">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-5">

                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
                    <svg 
                      class="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 class="text-2xl font-bold">
                      Shipment Details
                    </h2>
                    <p class="text-gray-400 text-sm">
                      Tracking information overview
                    </p>
                  </div>
                </div>


                <span
                  class="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide w-fit"
                  :class="getStatusClass(shipment.status)"
                >
                  {{ shipment.status || 'Unknown' }}
                </span>

              </div>
            </div>


            <!-- Content -->
            <div class="p-8 space-y-8">

              <!-- Top Stats -->
              <div class="grid md:grid-cols-2 gap-6">

                <div class="bg-gray-50 rounded-2xl p-6">
                  <p class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Tracking Number
                  </p>

                  <p class="text-2xl font-black font-mono text-gray-900">
                    {{ shipment.trackingId || 'N/A' }}
                  </p>
                </div>


                <div class="bg-green-50 rounded-2xl p-6">
                  <p class="text-xs font-bold uppercase tracking-wider text-green-700 mb-3">
                    Estimated Delivery
                  </p>

                  <p class="text-2xl font-black text-green-700">
                    {{ shipment.estimatedDelivery ? formatDate(shipment.estimatedDelivery) : 'N/A' }}
                  </p>
                </div>

              </div>


              <!-- People Information -->
              <div class="grid md:grid-cols-2 gap-6">


                <!-- Sender -->
                <div class="rounded-2xl bg-white border border-gray-200 p-7">

                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg 
                        class="w-6 h-6 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>

                    <h3 class="text-xl font-bold">
                      Sender
                    </h3>
                  </div>


                  <div class="space-y-3 text-gray-700">

                    <p>
                      <span class="font-bold text-gray-900">Name:</span>
                      {{ shipment.sender?.name || 'N/A' }}
                    </p>

                    <p>
                      <span class="font-bold text-gray-900">City:</span>
                      {{ shipment.sender?.city || 'N/A' }}
                    </p>

                    <p>
                      <span class="font-bold text-gray-900">Country:</span>
                      {{ shipment.sender?.country || 'N/A' }}
                    </p>

                  </div>

                </div>



                <!-- Receiver -->
                <div class="rounded-2xl bg-white border border-gray-200 p-7">

                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">

                      <svg 
                        class="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 12l9-9 9 9M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10"
                        />
                      </svg>

                    </div>

                    <h3 class="text-xl font-bold">
                      Receiver
                    </h3>
                  </div>


                  <div class="space-y-3 text-gray-700">

                    <p>
                      <span class="font-bold text-gray-900">Name:</span>
                      {{ shipment.receiver?.name || 'N/A' }}
                    </p>

                    <p>
                      <span class="font-bold text-gray-900">City:</span>
                      {{ shipment.receiver?.city || 'N/A' }}
                    </p>

                    <p>
                      <span class="font-bold text-gray-900">Country:</span>
                      {{ shipment.receiver?.country || 'N/A' }}
                    </p>


                    <p v-if="shipment.receiver?.phoneNumber">
                      <span class="font-bold text-gray-900">Phone:</span>
                      {{ shipment.receiver.phoneNumber }}
                    </p>

                  </div>

                </div>


              </div>

            </div>

          </div>

          <!-- Current Location -->
          <!-- <div 
            v-if="shipment.currentLocation"
            class="bg-white rounded-3xl shadow-lg p-8"
          >

            <div class="flex gap-6">

              <div class="relative">

                <div class="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                  <svg
                    class="w-8 h-8 text-green-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>

                </div>


                <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full border-2 border-white"></span>

              </div>


              <div>
                <div class="flex items-center gap-3 mb-3">

                  <h3 class="text-2xl font-bold">
                    Current Location
                  </h3>

                  <span class="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                    LIVE
                  </span>

                </div>


                <div class="text-gray-600 space-y-2">

                  <p>
                    <strong class="text-gray-900">City:</strong>
                    {{ shipment.currentLocation.city }}
                  </p>

                  <p>
                    <strong class="text-gray-900">Country:</strong>
                    {{ shipment.currentLocation.country }}
                  </p>

                  <p v-if="shipment.currentLocation.name">
                    <strong class="text-gray-900">Facility:</strong>
                    {{ shipment.currentLocation.name }}
                  </p>

                  <p v-if="shipment.currentLocation.address">
                    <strong class="text-gray-900">Address:</strong>
                    {{ shipment.currentLocation.address }}
                  </p>

                </div>

              </div>

            </div>

          </div> -->

          <!-- New Tracking -->
          <div class="text-center pt-4">

            <button
              @click="resetTracking"
              class="px-10 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition shadow-lg"
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
          <div class="bg-white border border-red-200 rounded-2xl p-10 text-center">
            <div class="w-20 h-20 border-2 border-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-9 h-9 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-black mb-3">Shipment Not Found</h3>
            <p class="text-gray-600 text-lg mb-8">{{ error }}</p>
            <button
              @click="resetTracking"
              class="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
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

          <div class="relative grid md:grid-cols-4 gap-y-12 gap-x-8">
            <div class="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-gray-300"></div>

            <div class="relative text-center">
              <div class="relative z-10 w-20 h-20 bg-white border-2 border-black text-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold">1</span>
              </div>
              <h3 class="font-bold text-black text-lg mb-3">Shipment Created</h3>
              <p class="text-gray-600 leading-relaxed">Your tracking number is generated when your shipment is registered</p>
            </div>

            <div class="relative text-center">
              <div class="relative z-10 w-20 h-20 bg-white border-2 border-black text-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold">2</span>
              </div>
              <h3 class="font-bold text-black text-lg mb-3">Real-Time Updates</h3>
              <p class="text-gray-600 leading-relaxed">Get instant notifications as your package moves through our network</p>
            </div>

            <div class="relative text-center">
              <div class="relative z-10 w-20 h-20 bg-white border-2 border-black text-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold">3</span>
              </div>
              <h3 class="font-bold text-black text-lg mb-3">Live Location</h3>
              <p class="text-gray-600 leading-relaxed">Track your package's current location and estimated delivery time</p>
            </div>

            <div class="relative text-center">
              <div class="relative z-10 w-20 h-20 bg-black border-2 border-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="text-2xl font-bold">4</span>
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
import { ref, watch, nextTick } from 'vue'
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
// Auto-scroll logic
watch(shipment, async (newShipment) => {
  if (newShipment) {
    // Wait for Vue to finish updating the DOM (rendering the v-if="shipment" section)
    await nextTick()
    
    if (resultsSection.value) {
      resultsSection.value.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  }
})

const appName = 'CourviaShip'

useSeoMeta({
  title: `Track Shipment - ${appName}`,
  description: `Track your ${appName} shipment in real-time. Enter your tracking number to get live updates on your package location and delivery status.`
})
</script>