<!-- components/Navbar.vue -->
<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-20">
        <!-- Logo with Enhanced Design -->
        <NuxtLink 
          to="/" 
          class="group flex items-center gap-3 text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform duration-300"
        >
          <!-- Logo Icon -->
          <div class="relative w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-white/50 transition-shadow duration-300">
            <svg class="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-slate-950 animate-pulse"></div>
          </div>
          
          <!-- Logo Text -->
          <span class="text-white">
            {{ appName }}
          </span>
        </NuxtLink>

        <!-- Desktop Navigation with Enhanced Links -->
        <nav class="hidden md:flex items-center space-x-2">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="relative px-5 py-2.5 text-gray-300 hover:text-white font-semibold transition-all duration-300 rounded-xl group overflow-hidden"
            :class="{ 
              'text-white bg-white/10 shadow-lg': isActive(link.to),
              'hover:bg-white/5': !isActive(link.to)
            }"
          >
            <!-- Active Indicator Line -->
            <span 
              v-if="isActive(link.to)"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
            ></span>
            
            <!-- Hover Effect -->
            <span class="absolute inset-0 bg-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            
            <!-- Link Text -->
            <span class="relative flex items-center gap-2">
              <svg v-if="link.icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon"/>
              </svg>
              {{ link.label }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button with Enhanced Design -->
        <button
          class="md:hidden relative w-12 h-12 text-white focus:outline-none rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300 flex items-center justify-center group"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <div class="relative w-6 h-5 flex flex-col justify-between">
            <span 
              class="block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center"
              :class="mobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
            ></span>
            <span 
              class="block h-0.5 w-full bg-white rounded-full transition-all duration-300"
              :class="mobileMenuOpen ? 'opacity-0 scale-0' : ''"
            ></span>
            <span 
              class="block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center"
              :class="mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
            ></span>
          </div>
        </button>
      </div>

      <!-- Mobile Menu with Enhanced Design -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden bg-slate-900/95 border-t border-white/10 backdrop-blur-xl"
        >
          <nav class="flex flex-col py-6 px-4 space-y-2">
            <NuxtLink
              v-for="(link, index) in navLinks"
              :key="link.to"
              :to="link.to"
              class="relative group px-6 py-4 text-gray-300 hover:text-white text-lg font-semibold transition-all duration-300 rounded-2xl overflow-hidden"
              :class="{ 
                'text-white bg-white/10 border border-white/20 shadow-lg': isActive(link.to),
                'hover:bg-white/5': !isActive(link.to)
              }"
              :style="`animation-delay: ${index * 50}ms`"
              @click="mobileMenuOpen = false"
            >
              <!-- Background Effect -->
              <span class="absolute inset-0 bg-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              
              <!-- Link Content -->
              <span class="relative flex items-center gap-3">
                <svg v-if="link.icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon"/>
                </svg>
                <span>{{ link.label }}</span>
                
                <!-- Active Indicator -->
                <span 
                  v-if="isActive(link.to)" 
                  class="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"
                ></span>
              </span>
            </NuxtLink>
          </nav>

          <!-- Mobile Menu Footer -->
          <div class="px-6 py-4 border-t border-white/5">
            <p class="text-xs text-gray-500 text-center">
              © 2024 {{ appName }}. Delivering Excellence.
            </p>
          </div>
        </div>
      </transition>
    </div>

    <!-- Progress Bar (optional - shows on page navigation) -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-white opacity-0 transition-opacity duration-300" :class="{'opacity-100': isNavigating}"></div>
  </header>
</template>

<script setup lang="ts">
const appName = 'CourviaShip'

const navLinks = [
  { 
    label: 'Home', 
    to: '/',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  { 
    label: 'About', 
    to: '/about',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  { 
    label: 'Services', 
    to: '/services',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
  },
  { 
    label: 'Track Your Package', 
    to: '/tracking',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
  }
]

const route = useRoute()

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const mobileMenuOpen = ref(false)
const isNavigating = ref(false)

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// Optional: Show navigation indicator
watch(() => route.path, () => {
  isNavigating.value = true
  setTimeout(() => {
    isNavigating.value = false
  }, 500)
})

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen.value) {
      mobileMenuOpen.value = false
    }
  }
  window.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
/* Smooth animations for mobile menu items */
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Add animation to mobile links */
.md\:hidden nav a {
  animation: slide-in 0.3s ease-out forwards;
}
</style>