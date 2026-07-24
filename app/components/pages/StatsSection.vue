<template>
  <section class="py-12 sm:py-16 bg-green-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        
        <!-- Stat 1 -->
        <div class="text-center">
          <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
            {{ animatedPackages.toLocaleString() }}+
          </div>
          <p class="text-white/90 text-sm sm:text-base font-medium">
            Packages Delivered
          </p>
        </div>

        <!-- Stat 2 -->
        <div class="text-center">
          <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
            {{ animatedShipments.toLocaleString() }}+
          </div>
          <p class="text-white/90 text-sm sm:text-base font-medium">
            Active Shipments
          </p>
        </div>

        <!-- Stat 3 -->
        <div class="text-center">
          <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
            {{ animatedUsers.toLocaleString() }}+
          </div>
          <p class="text-white/90 text-sm sm:text-base font-medium">
            Registered Users
          </p>
        </div>

        <!-- Stat 4 -->
        <div class="text-center">
          <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
            {{ animatedCountries.toLocaleString() }}+
          </div>
          <p class="text-white/90 text-sm sm:text-base font-medium">
            Countries Covered
          </p>
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
  animateCounter(animatedPackages, finalPackages, 2000)
  setTimeout(() => animateCounter(animatedShipments, finalShipments, 2000), 100)
  setTimeout(() => animateCounter(animatedUsers, finalUsers, 2000), 200)
  setTimeout(() => animateCounter(animatedCountries, finalCountries, 2000), 300)
})
</script>