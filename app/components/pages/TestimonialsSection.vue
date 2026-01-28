<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
          What Our Clients Say
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Trusted by thousands of businesses worldwide for reliable shipping solutions
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Testimonial 1 -->
        <div class="bg-gray-50 p-8 rounded-2xl border-2 border-transparent hover:border-green-600 transition-all">
          <div class="flex items-center mb-6">
            <div class="flex gap-1 text-green-600">
              <svg v-for="star in 5" :key="star" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed italic">
            "{{ appName }} has transformed our supply chain. Fast, reliable, and their tracking system is outstanding. Highly recommended!"
          </p>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <p class="font-bold text-black">John Davidson</p>
              <p class="text-sm text-gray-500">CEO, TechCorp</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="bg-gray-50 p-8 rounded-2xl border-2 border-transparent hover:border-green-600 transition-all">
          <div class="flex items-center mb-6">
            <div class="flex gap-1 text-green-600">
              <svg v-for="star in 5" :key="star" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed italic">
            "Professional service from start to finish. Our international shipments have never been smoother. Customer support is top-notch!"
          </p>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              SM
            </div>
            <div>
              <p class="font-bold text-black">Sarah Martinez</p>
              <p class="text-sm text-gray-500">Operations Director, GlobalTrade</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="bg-gray-50 p-8 rounded-2xl border-2 border-transparent hover:border-green-600 transition-all">
          <div class="flex items-center mb-6">
            <div class="flex gap-1 text-green-600">
              <svg v-for="star in 5" :key="star" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed italic">
            "Exceptional warehousing solutions! Secure, organized, and they handle our inventory with care. Wouldn't trust anyone else."
          </p>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              MC
            </div>
            <div>
              <p class="font-bold text-black">Michael Chen</p>
              <p class="text-sm text-gray-500">Founder, EcoProducts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const appName = ref('CourviaShip')
</script>