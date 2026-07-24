<template>
  <section class="py-14 sm:py-16 lg:py-20 bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      
      <!-- Header -->
      <div class="text-center mb-10 sm:mb-12 lg:mb-14">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
          Our Services
        </h2>
        <p class="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
          Comprehensive logistics solutions tailored to meet your shipping needs
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
        
        <!-- Service 1 -->
        <div class="bg-white p-6 sm:p-7 rounded-2xl hover:shadow-xl transition-all">
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-xl flex items-center justify-center mb-5">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">Global Shipping</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            International freight forwarding with customs clearance and door-to-door delivery worldwide.
          </p>
        </div>

        <!-- Service 2 -->
        <div class="bg-white p-6 sm:p-7 rounded-2xl hover:shadow-xl transition-all">
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-xl flex items-center justify-center mb-5">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">Express Delivery</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Fast-track shipping options for time-sensitive packages with guaranteed delivery dates.
          </p>
        </div>

        <!-- Service 3 -->
        <div class="bg-white p-6 sm:p-7 rounded-2xl hover:shadow-xl transition-all sm:col-span-2 lg:col-span-1">
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-xl flex items-center justify-center mb-5">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">Warehousing</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Secure storage facilities with inventory management and distribution services available 24/7.
          </p>
        </div>

      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <NuxtLink 
          to="/services" 
          class="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-semibold rounded-xl transition-all shadow-md"
        >
          <span>View All Services</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>