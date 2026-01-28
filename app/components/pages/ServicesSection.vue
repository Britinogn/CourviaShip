<template>
  <section class="py-20 bg-black">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Our Services
        </h2>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          Comprehensive logistics solutions tailored to meet your shipping needs
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <!-- Service 1 -->
        <div class="bg-white p-8 rounded-2xl hover:shadow-2xl transition-all">
          <div class="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-black mb-4">Global Shipping</h3>
          <p class="text-gray-600 leading-relaxed">
            International freight forwarding with customs clearance and door-to-door delivery worldwide.
          </p>
        </div>

        <!-- Service 2 -->
        <div class="bg-white p-8 rounded-2xl hover:shadow-2xl transition-all">
          <div class="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-black mb-4">Express Delivery</h3>
          <p class="text-gray-600 leading-relaxed">
            Fast-track shipping options for time-sensitive packages with guaranteed delivery dates.
          </p>
        </div>

        <!-- Service 3 -->
        <div class="bg-white p-8 rounded-2xl hover:shadow-2xl transition-all">
          <div class="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-black mb-4">Warehousing</h3>
          <p class="text-gray-600 leading-relaxed">
            Secure storage facilities with inventory management and distribution services available 24/7.
          </p>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <NuxtLink 
          to="/services" 
          class="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-lg"
        >
          <span>View All Services</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props needed
</script>