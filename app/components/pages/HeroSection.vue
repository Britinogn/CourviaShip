<template>
  <section class="relative h-screen w-full overflow-hidden bg-black">
    <!-- Slides Container -->
    <div class="relative h-full w-full">
      <!-- Slide 1 -->
      <Transition name="fade">
        <div
          v-if="currentSlide === 0"
          class="absolute inset-0 w-full h-full"
        >
          <div class="absolute inset-0 bg-black opacity-50 z-10"></div>
          <NuxtImg
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
            alt="Global Logistics"
            class="w-full h-full object-cover"
            loading="lazy"
            sizes="100vw"
          />
          <div class="absolute inset-0 z-20 flex items-center justify-center">
            <div class="max-w-4xl mx-auto px-6 text-center">
              <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
                Global Logistics Solutions
              </h1>
              <p class="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                Seamless shipping across borders. Track your shipments in real-time with {{ appName }}, 
                your trusted partner in international freight and logistics management.
              </p>
              <div class="flex gap-4 justify-center">
                <button class="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-lg">
                  Get Started
                </button>

                <NuxtLink 
                  to="/tracking"  
                  class="px-8 py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition-all shadow-lg"               
                >
                  Track Shipment
                </NuxtLink>

              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Slide 2 -->
      <Transition name="fade">
        <div
          v-if="currentSlide === 1"
          class="absolute inset-0 w-full h-full"
        >
          <div class="absolute inset-0 bg-black opacity-50 z-10"></div>
          <NuxtImg
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80"
            alt="Fast Delivery"
            class="w-full h-full object-cover"
            loading="lazy"
            sizes="100vw"
          />
          <div class="absolute inset-0 z-20 flex items-center justify-center">
            <div class="max-w-4xl mx-auto px-6 text-center">
              <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
                Fast & Reliable Delivery
              </h1>
              <p class="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                Speed meets precision. With {{ appName }}, your packages arrive on time, every time. 
                Experience hassle-free shipping with real-time tracking and instant notifications.
              </p>
              <div class="flex gap-4 justify-center">

                <NuxtLink 
                  to="/services"  
                  class="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-lg"
                >
                  Our Services
                </NuxtLink>

                <NuxtLink 
                  to="/about"  
                  class="px-8 py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition-all shadow-lg"               
                >
                  Learn More
                </NuxtLink>

              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Slide 3 -->
      <Transition name="fade">
        <div
          v-if="currentSlide === 2"
          class="absolute inset-0 w-full h-full"
        >
          <div class="absolute inset-0 bg-black opacity-50 z-10"></div>
          <NuxtImg
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
            alt="Warehouse Management"
            class="w-full h-full object-cover"
            loading="lazy"
            sizes="100vw"
          />
          <div class="absolute inset-0 z-20 flex items-center justify-center">
            <div class="max-w-4xl mx-auto px-6 text-center">
              <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
                Advanced Warehouse Solutions
              </h1>
              <p class="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                Streamlined inventory management and distribution. {{ appName }} offers 
                state-of-the-art warehousing facilities with 24/7 security and climate control.
              </p>
              <div class="flex gap-4 justify-center">
                <button class="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-lg">
                  View Facilities
                </button>
                <button class="px-8 py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition-all shadow-lg">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Navigation Dots -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
      <button
        v-for="(slide, index) in 3"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-12 h-2 rounded-full transition-all',
          currentSlide === index ? 'bg-green-600 w-16' : 'bg-white opacity-50 hover:opacity-75'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute cursor-pointer left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      aria-label="Previous slide"
    >
      <svg class="w-6 text-black h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute cursor-pointer right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      aria-label="Next slide"
    >
      <svg class="w-6 text-black h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
const appName = ref('CourviaShip')
const currentSlide = ref(0)
// let intervalId: NodeJS.Timeout | null = null
let intervalId: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % 3
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? 2 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoplay()
}

const resetAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  startAutoplay()
}

const startAutoplay = () => {
  intervalId = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>