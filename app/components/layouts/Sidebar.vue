<template>
    <div>
            <!-- Mobile Overlay -->
            <div
            v-if="isOpen"
            class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
            @click="onClose"
            />

        <!-- Sidebar -->
            <aside
            class="fixed inset-y-0 left-0 top-0 z-50 w-72 bg-linear-to-b from-green-600 to-green-700 min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl"
            :class="{ 'translate-x-0': isOpen, '-translate-x-full lg:translate-x-0': !isOpen }"
            >
            <!-- Logo Section -->
            <div class="h-20 flex items-center justify-between px-6 border-b border-green-500/30">
                <NuxtLink to="/dashboard" class="flex items-center space-x-3" @click="onClose">
                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                    <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-xl font-bold text-white">CourviaShip</h2>
                    <p class="text-xs text-green-100">Logistics Manager</p>
                </div>
                </NuxtLink>

                <!-- Close button for mobile -->
                <button
                v-if="!isDesktop"
                @click="onClose"
                class="p-2 hover:bg-white/10 rounded-lg transition-colors text-white lg:hidden"
                aria-label="Close sidebar"
                >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>

            <!-- User Profile Section -->
            <div class="px-6 py-5 border-b border-green-500/30">
                <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/15 transition-all cursor-pointer">
                <div class="w-14 h-14 bg-linear-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white/20">
                    {{ userInitials }}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="font-semibold text-white truncate text-lg">{{ userName }}</p>
                    <p class="text-xs text-green-100 truncate flex items-center gap-1">
                    <span class="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    {{ userEmail }}
                    </p>
                </div>
                </div>
            </div>

            <!-- Navigation Menu -->
            <nav class="flex-1 px-4 py-6 overflow-y-auto">
                <div class="space-y-1">
                <NuxtLink
                    v-for="item in navItems"
                    :key="item.path"
                    :to="item.path"
                    @click="onClose"
                    :class="[
                    'group flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 relative overflow-hidden',
                    isActive(item.path)
                        ? 'bg-white text-green-700 shadow-lg'
                        : 'text-green-50 hover:bg-white/10 hover:text-white'
                    ]"
                >
                    <!-- Active Indicator Bar -->
                    <div 
                    v-if="isActive(item.path)" 
                    class="absolute left-0 top-0 bottom-0 w-1.5 bg-green-600 rounded-r-full"
                    />
                    
                    <!-- Icon -->
                    <div 
                    :class="[
                        'w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200',
                        isActive(item.path) 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-white/5 text-green-100 group-hover:bg-white/10 group-hover:scale-110'
                    ]"
                    >
                    <component :is="item.icon" class="w-5 h-5" />
                    </div>
                    
                    <!-- Label -->
                    <span class="text-sm font-semibold">{{ item.name }}</span>
                    
                    <!-- Arrow Indicator -->
                    <svg 
                    v-if="isActive(item.path)"
                    class="ml-auto w-5 h-5 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </NuxtLink>
                </div>

                <!-- Quick Actions Section -->
                <div class="mt-8 pt-6 border-t border-green-500/30">
                <p class="px-4 text-xs font-semibold text-green-200 uppercase tracking-wider mb-3">Quick Actions</p>
                <button class="w-full flex items-center gap-3 px-4 py-3 text-green-50 hover:bg-white/10 rounded-xl transition-all group">
                    <div class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    </div>
                    <span class="text-sm font-medium">New Shipment</span>
                </button>
                </div>
            </nav>

            <!-- Logout Section -->
            <div class="p-4 border-t border-green-500/30 bg-green-800/30">
                <button
                @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3.5 text-white bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all font-medium border border-red-400/20 hover:border-red-400/40"
                >
                <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
                <span class="text-sm font-semibold">Logout</span>
                </button>
            </div>
            </aside>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

interface NavItem {
  name: string
  path: string
  icon: any
}

interface Props {
    isOpen: boolean
    onClose: () => void
}

const { isOpen, onClose } = defineProps<Props>()

const route = useRoute()
const authStore = useAuthStore()
const { logout } = useAuth()

// SVG Icon Components
const HomeIcon = defineComponent({
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
  ])
})

const ShipmentIcon = defineComponent({
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' })
  ])
})

const TrackingIcon = defineComponent({
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' })
  ])
})

const AnalyticsIcon = defineComponent({
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
  ])
})

const SettingsIcon = defineComponent({
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
  ])
})

const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Shipments', path: '/dashboard/shipments', icon: ShipmentIcon },
    { name: 'Tracking', path: '/dashboard/tracking', icon: TrackingIcon },
    { name: 'Analytics', path: '/dashboard/analytics', icon: AnalyticsIcon },
    { name: 'Settings', path: '/dashboard/settings', icon: SettingsIcon },
]

const isActive = (path: string) => {
    // Exact match for dashboard
    if (path === '/dashboard') {
        return route.path === '/dashboard'
    }
    // For other routes, check if current path starts with it
    return route.path === path || route.path.startsWith(path + '/')
}

const isDesktop = ref(false)

const updateIsDesktop = () => {
    isDesktop.value = window.innerWidth >= 1024
}

const handleLogout = () => {
    onClose()
    logout()
}

const userName = computed(() => authStore.user?.username || 'User')
const userEmail = computed(() => authStore.user?.email || 'user@example.com')
const userInitials = computed(() => {
    if (authStore.user?.username) {
        return authStore.user.username.charAt(0).toUpperCase()
    }
    if (authStore.user?.email) {
        return authStore.user.email.charAt(0).toUpperCase()
    }
    return 'U'
})

onMounted(() => {
    updateIsDesktop()
    window.addEventListener('resize', updateIsDesktop)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateIsDesktop)
})
</script>