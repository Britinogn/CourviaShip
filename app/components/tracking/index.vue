<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Animated Background Pattern -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative pt-20 pb-24 overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm mb-4">
            <div class="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-gray-700 tracking-wide">Real-Time Tracking Active</span>
          </div>
          
          <h1 class="text-6xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            Track Your Shipment
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Enter your tracking number for instant, real-time updates on your package's journey
          </p>
        </div>
      </div>
    </section>

    <!-- Tracking Form with Enhanced Glass Card -->
    <section class="pb-16 relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 md:p-12 animate-slide-up hover:shadow-3xl transition-all duration-500">
            <form @submit.prevent="handleTrack" class="space-y-8">
              <div class="space-y-3">
                <label for="trackingId" class="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                  </svg>
                  Tracking Number
                </label>
                <div class="relative group">
                  <input
                    id="trackingId"
                    v-model="trackingId"
                    type="text"
                    required
                    placeholder="CVS123456789"
                    class="w-full px-6 py-5 text-lg bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all duration-300 font-mono tracking-wider placeholder:text-gray-400 placeholder:tracking-normal group-hover:border-gray-300"
                  />
                  <div class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-gray-500 flex items-center gap-2 pl-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Find your tracking number in the confirmation email
                </p>
              </div>

              <button
                type="submit"
                :disabled="isTracking || !trackingId"
                class="group relative w-full bg-green-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <span class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span class="relative flex items-center justify-center gap-3">
                  <svg v-if="isTracking" class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <span>{{ isTracking ? 'Searching...' : 'Track Shipment' }}</span>
                </span>
              </button>
            </form>
          </div>

          <!-- Help Card -->
          <div class="mt-8 bg-gray-100 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fade-in" style="animation-delay: 0.2s;">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 mb-2 text-lg">Need Assistance?</h3>
                <p class="text-sm text-gray-700 leading-relaxed">
                  Can't find your tracking number? Check your confirmation email or contact our support team at 
                  <a href="mailto:support@courviaship.com" class="underline font-bold hover:text-gray-900 transition-colors">support@courviaship.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tracking Results with Premium Card Design -->
    <section v-if="shipment" class="py-16 relative z-10 animate-fade-in">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto space-y-8">
          <!-- Main Shipment Card -->
          <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
            <!-- Premium Header -->
            <div class="relative bg-black px-10 py-8 overflow-hidden">
              <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
              <div class="relative flex items-center justify-between flex-wrap gap-4">
                <div class="space-y-1">
                  <p class="text-gray-400 text-sm font-semibold uppercase tracking-wider">Shipment Status</p>
                  <h2 class="text-3xl font-bold text-white">Tracking Details</h2>
                </div>
                <div 
                  class="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-xl backdrop-blur-sm border-2 border-white/20 animate-pulse-subtle"
                  :class="getStatusClass(shipment.status)"
                >
                  {{ shipment.status || 'Unknown' }}
                </div>
              </div>
            </div>

            <!-- Content Grid -->
            <div class="p-10">
              <div class="grid md:grid-cols-2 gap-8 mb-10">
                <!-- Tracking Number with Copy -->
                <div class="space-y-3 group">
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                    </svg>
                    Tracking Number
                  </p>
                  <p class="text-3xl font-mono font-bold text-gray-900 tracking-wide bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 group-hover:border-green-300 transition-colors">
                    {{ shipment.trackingId || 'N/A' }}
                  </p>
                </div>

                <!-- Estimated Delivery -->
                <div class="space-y-3">
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Estimated Delivery
                  </p>
                  <p class="text-3xl font-bold text-green-600">
                    {{ shipment.estimatedDelivery ? formatDate(shipment.estimatedDelivery) : 'Calculating...' }}
                  </p>
                </div>
              </div>

              <!-- Sender and Receiver Cards -->
              <div class="grid md:grid-cols-2 gap-6">
                <!-- From Card -->
                <div class="relative bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-gray-200/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div class="relative space-y-4">
                    <div class="flex items-center gap-3 pb-3 border-b-2 border-gray-300">
                      <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                        </svg>
                      </div>
                      <p class="text-lg font-bold text-gray-800">Origin</p>
                    </div>
                    <div class="space-y-3 text-gray-700">
                      <div class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span class="font-semibold">{{ shipment.sender?.name || 'N/A' }}</span>
                      </div>
                      <div class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        </svg>
                        <span>{{ shipment.sender?.city || 'N/A' }}, {{ shipment.sender?.country || 'N/A' }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- To Card -->
                <div class="relative bg-green-50 p-8 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div class="relative space-y-4">
                    <div class="flex items-center gap-3 pb-3 border-b-2 border-green-300">
                      <div class="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                      </div>
                      <p class="text-lg font-bold text-green-900">Destination</p>
                    </div>
                    <div class="space-y-3 text-green-900">
                      <div class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span class="font-semibold">{{ shipment.receiver?.name || 'N/A' }}</span>
                      </div>
                      <div class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        </svg>
                        <span>{{ shipment.receiver?.city || 'N/A' }}, {{ shipment.receiver?.country || 'N/A' }}</span>
                      </div>
                      <div v-if="shipment.receiver?.phoneNumber" class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <span class="font-mono text-sm">{{ shipment.receiver.phoneNumber }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Location Spotlight -->
          <div v-if="shipment.currentLocation" class="relative bg-green-600 rounded-3xl p-10 shadow-2xl overflow-hidden animate-slide-up">
            <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 2px, transparent 0); background-size: 40px 40px;"></div>
            <div class="relative flex items-start gap-6">
              <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 animate-pulse-subtle">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <h3 class="text-2xl font-bold text-white">Current Location</h3>
                </div>
                <div class="grid md:grid-cols-2 gap-4 text-white/95">
                  <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p class="text-sm text-white/70 mb-1 font-semibold uppercase tracking-wide">City</p>
                    <p class="text-xl font-bold">{{ shipment.currentLocation?.city || 'N/A' }}</p>
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p class="text-sm text-white/70 mb-1 font-semibold uppercase tracking-wide">Country</p>
                    <p class="text-xl font-bold">{{ shipment.currentLocation?.country || 'N/A' }}</p>
                  </div>
                  <div v-if="shipment.currentLocation?.name" class="md:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p class="text-sm text-white/70 mb-1 font-semibold uppercase tracking-wide">Facility</p>
                    <p class="text-lg font-bold">{{ shipment.currentLocation.name }}</p>
                  </div>
                  <div v-if="shipment.currentLocation?.address" class="md:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p class="text-sm text-white/70 mb-1 font-semibold uppercase tracking-wide">Address</p>
                    <p class="text-lg font-bold">{{ shipment.currentLocation.address }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Track Another Button -->
          <div class="text-center pt-8">
            <button
              @click="resetTracking"
              class="group inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <svg class="w-6 h-6 group-hover:-rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Track Another Shipment
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Error State with Enhanced Design -->
    <section v-if="error" class="py-16 relative z-10 animate-fade-in">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-red-50 rounded-3xl p-10 text-center border-2 border-red-200 shadow-xl">
            <div class="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-red-900 mb-3">Shipment Not Found</h3>
            <p class="text-lg text-red-700 mb-8 max-w-md mx-auto">{{ error }}</p>
            <button
              @click="resetTracking"
              class="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works with Premium Timeline -->
    <section class="py-24 bg-white relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20 space-y-4 animate-fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200">
              <span class="text-sm font-bold text-green-700 uppercase tracking-wide">How It Works</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-bold text-gray-900">
              Tracking Made Simple
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Four seamless steps to complete package visibility
            </p>
          </div>

          <div class="grid md:grid-cols-4 gap-8 relative">
            <!-- Connection Line -->
            <div class="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            
            <div v-for="(step, index) in steps" :key="index" class="relative group animate-slide-up" :style="`animation-delay: ${index * 0.1}s`">
              <div class="text-center space-y-4">
                <div class="relative inline-block">
                  <div class="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <span class="text-3xl font-bold text-white">{{ index + 1 }}</span>
                  </div>
                  <div class="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full border-4 border-white animate-ping"></div>
                  <div class="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full border-4 border-white"></div>
                </div>
                <h3 class="font-bold text-gray-900 text-xl">{{ step.title }}</h3>
                <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
              </div>
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
import { ref } from 'vue'
import { useTracking } from '@/composables/useTracking'

const { trackShipment } = useTracking()
const toast = useToast()

const trackingId = ref<string>('')
const isTracking = ref(false)
const error = ref<string | null>(null)
const shipment = ref<ITrackingShipment | null>(null)

const steps = [
  {
    title: 'Shipment Created',
    description: 'Your unique tracking number is generated when the shipment enters our system'
  },
  {
    title: 'Real-Time Updates',
    description: 'Receive instant notifications as your package moves through our global network'
  },
  {
    title: 'Live Location',
    description: 'Monitor your package\'s precise location and estimated delivery window'
  },
  {
    title: 'Delivery Confirmed',
    description: 'Get immediate confirmation when your package reaches its destination'
  }
]

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
      return 'bg-gray-200 text-gray-900'
    case ShipmentStatus.InTransit:
      return 'bg-gray-300 text-gray-900'
    case ShipmentStatus.EnRoute:
      return 'bg-gray-200 text-gray-900'
    case ShipmentStatus.InCustoms:
      return 'bg-gray-300 text-gray-900'
    case ShipmentStatus.AtHub:
      return 'bg-gray-200 text-gray-900'
    case ShipmentStatus.OutForDelivery:
      return 'bg-green-100 text-green-800'
    case ShipmentStatus.Delivered:
      return 'bg-green-600 text-white'
    case ShipmentStatus.Delayed:
      return 'bg-red-100 text-red-800'
    case ShipmentStatus.Cancelled:
      return 'bg-black text-white'
    case ShipmentStatus.Exception:
      return 'bg-red-600 text-white'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const appName = 'CourviaShip'

useSeoMeta({
  title: `Track Shipment - ${appName}`,
  description: `Track your ${appName} shipment in real-time. Enter your tracking number to get live updates on your package location and delivery status.`
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}
</style>