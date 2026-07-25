<template>
  <section class="py-14 sm:py-16 lg:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
        
        <!-- Left: Image -->
        <div class="relative">
          <div class="absolute inset-0 bg-green-600 rounded-2xl transform translate-x-4 translate-y-4 sm:translate-x-5 sm:translate-y-5"></div>
          <NuxtImg
            src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80"
            alt="About CourviaShip"
            class="relative rounded-2xl shadow-xl w-full h-72 sm:h-80 lg:h-96 object-cover"
            loading="lazy"
          />
        </div>

        <!-- Right: Content -->
        <div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-5">
            Who We Are
          </h2>
          <p class="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
            {{ siteName }} is a leading logistics and freight management company dedicated to 
            providing seamless shipping solutions across the globe. With years of experience 
            and a commitment to excellence, we ensure your packages reach their destination 
            safely and on time.
          </p>
          <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Our state-of-the-art tracking system, reliable network, and customer-first approach 
            make us the preferred choice for businesses and individuals worldwide.
          </p>
          <NuxtLink 
            to="/about" 
            class="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-semibold rounded-xl transition-all shadow-md"
          >
            <span>Learn More About Us</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteName } from '~/utils/siteName'
</script>