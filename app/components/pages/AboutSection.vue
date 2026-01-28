<template>
  <section class="py-20  bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left: Image -->
        <div class="relative">
          <div class="absolute inset-0 bg-green-600 rounded-2xl transform translate-x-6 translate-y-6"></div>
          <NuxtImg
            src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80"
            alt="About CourviaShip"
            class="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
            loading="lazy"
          />
        </div>

        <!-- Right: Content -->
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-6">
            Who We Are
          </h2>
          <p class="text-lg text-gray-700 mb-6 leading-relaxed">
            {{ appName }} is a leading logistics and freight management company dedicated to 
            providing seamless shipping solutions across the globe. With years of experience 
            and a commitment to excellence, we ensure your packages reach their destination 
            safely and on time.
          </p>
          <p class="text-lg text-gray-700 mb-8 leading-relaxed">
            Our state-of-the-art tracking system, reliable network, and customer-first approach 
            make us the preferred choice for businesses and individuals worldwide.
          </p>
          <NuxtLink 
            to="/about" 
            class="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-lg"
          >
            <span>Learn More About Us</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// const appName = ref('CourviaShip')
</script>