<!-- components/Navbar.vue -->
<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-white tracking-tight">
          {{ appName }}
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-10">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-gray-300 hover:text-white font-medium transition-colors duration-200"
            :class="{ 'text-white font-semibold': isActive(link.to) }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden text-white focus:outline-none"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-black border-t border-gray-800 py-6 px-4"
      >
        <nav class="flex flex-col space-y-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-gray-300 hover:text-white text-lg font-medium transition-colors duration-200"
            :class="{ 'text-white font-semibold': isActive(link.to) }"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const appName = 'CourviaShip' // or use ref/computed if dynamic

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Tracking', to: '/tracking' }
]

const route = useRoute()

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const mobileMenuOpen = ref(false)
</script>