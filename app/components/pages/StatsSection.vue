<template>
  <section class="py-20 bg-green-600">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Stat 1: Packages Delivered -->
        <div class="text-center">
          <div class="text-5xl md:text-6xl font-bold text-white mb-2">
            {{ animatedPackages }}+
          </div>
          <p class="text-white text-lg font-medium">Packages Delivered</p>
        </div>

        <!-- Stat 2: Active Shipments -->
        <div class="text-center">
          <div class="text-5xl md:text-6xl font-bold text-white mb-2">
            {{ animatedShipments }}+
          </div>
          <p class="text-white text-lg font-medium">Active Shipments</p>
        </div>

        <!-- Stat 3: Registered Users -->
        <div class="text-center">
          <div class="text-5xl md:text-6xl font-bold text-white mb-2">
            {{ animatedUsers }}+
          </div>
          <p class="text-white text-lg font-medium">Registered Users</p>
        </div>

        <!-- Stat 4: Countries Covered -->
        <div class="text-center">
          <div class="text-5xl md:text-6xl font-bold text-white mb-2">
            {{ animatedCountries }}+
          </div>
          <p class="text-white text-lg font-medium">Countries Covered</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const animatedPackages = ref(0)
const animatedShipments = ref(0)
const animatedUsers = ref(0)
const animatedCountries = ref(0)

const finalPackages = 50000
const finalShipments = 5000
const finalUsers = 10000
const finalCountries = 150

const animateCounter = (
  current: Ref<number>, 
  target: number, 
  duration: number = 2000
) => {
  const startTime = Date.now()
  const step = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3)
    current.value = Math.floor(easeOut * target)
    
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      current.value = target
    }
  }
  
  requestAnimationFrame(step)
}

onMounted(() => {
  // Start animations with slight delays for staggered effect
  animateCounter(animatedPackages, finalPackages, 2000)
  setTimeout(() => animateCounter(animatedShipments, finalShipments, 2000), 100)
  setTimeout(() => animateCounter(animatedUsers, finalUsers, 2000), 200)
  setTimeout(() => animateCounter(animatedCountries, finalCountries, 2000), 300)
})
</script>