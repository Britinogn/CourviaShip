<template>
    <header class="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-white border-b border-gray-100 z-40 transition-all duration-300 shadow-sm">
        <div class="h-full px-4 lg:px-8 flex items-center justify-between">
            <!-- Left Side: Mobile Menu & Page Title -->
            <div class="flex items-center gap-4">
                <!-- Hamburger Menu (Mobile) -->
                <button
                    @click="$emit('toggle-sidebar')"
                    class="lg:hidden p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                    aria-label="Toggle sidebar"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <!-- Page Title & Breadcrumb -->
                <div class="hidden lg:block">
                    <h1 class="text-xl font-bold text-gray-900">{{ currentPageTitle }}</h1>
                    <p class="text-xs text-gray-500 mt-0.5">{{ currentPageDescription }}</p>
                </div>
            </div>

            <!-- Center: Search Bar (Desktop) -->
            <div class="md:block flex-1 max-w-xl mx-8">
                <div class="relative">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search by tracking ID..."
                        class="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:border-green-500 outline-none transition-all text-sm"
                        @keyup.enter="handleSearch"
                    />
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <!-- Right Side Actions -->
            <div class="flex items-center gap-2">

                <!-- Notifications -->
                <button class="relative p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all group">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <!-- Notification Badge -->
                    <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white"></span>
                </button>

                <!-- Quick Actions -->
                <button 
                    disabled
                    class="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-gray-300 text-gray-500 text-sm font-semibold rounded-xl cursor-not-allowed opacity-60"
                    title="Coming soon"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>New Shipment</span>
                </button>

                <!-- User Menu Dropdown -->
                <div class="relative" ref="dropdownRef">
                    <button 
                        @click="toggleDropdown"
                        class="flex items-center gap-3 pl-3 pr-4 py-2 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200"
                    >
                        <div class="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-green-100">
                            {{ userInitials }}
                        </div>
                        <div class="hidden lg:block text-left">
                            <p class="text-sm font-semibold text-gray-900">{{ userName }}</p>
                            <p class="text-xs text-gray-500">Administrator</p>
                        </div>
                        <svg 
                            class="hidden lg:block w-4 h-4 text-gray-400 transition-transform"
                            :class="{ 'rotate-180': isDropdownOpen }"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <Transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <div 
                            v-if="isDropdownOpen"
                            class="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                        >
                            <!-- User Info Header -->
                            <div class="px-4 py-3 border-b border-gray-100">
                                <p class="font-semibold text-gray-900">{{ userName }}</p>
                                <p class="text-xs text-gray-500 mt-0.5">{{ userEmail }}</p>
                            </div>

                            <!-- Menu Items -->
                            <div class="py-2">
                                <NuxtLink 
                                    to="/profile" 
                                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                                    @click="closeDropdown"
                                >
                                    <div class="w-8 h-8 bg-gray-100 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span class="font-medium">Your Profile</span>
                                </NuxtLink>
                                
                                <NuxtLink 
                                    to="/dashboard/settings" 
                                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                                    @click="closeDropdown"
                                >
                                    <div class="w-8 h-8 bg-gray-100 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span class="font-medium">Settings</span>
                                </NuxtLink>

                                <button 
                                    class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                                >
                                    <div class="w-8 h-8 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    <span class="font-medium">Preferences</span>
                                </button>
                            </div>

                            <div class="border-t border-gray-100 mt-2 pt-2">
                                <button 
                                    @click="handleLogout"
                                    class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                                >
                                    <div class="w-8 h-8 bg-red-50 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </div>
                                    <span class="font-semibold">Logout</span>
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
defineEmits<{
    'toggle-sidebar': []
}>()

const authStore = useAuthStore()
const { logout } = useAuth()
const router = useRouter()
const route = useRoute()

const searchQuery = ref('')
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Dynamic page titles based on route
const pageInfo = computed(() => {
    const path = route.path
    
    const pages: Record<string, { title: string; description: string }> = {
        '/dashboard': { 
            title: 'Dashboard', 
            description: 'Overview of your logistics operations' 
        },
        '/dashboard/shipments': { 
            title: 'Shipments', 
            description: 'Manage all your shipments' 
        },
        '/dashboard/tracking': { 
            title: 'Tracking', 
            description: 'Track shipments in real-time' 
        },
        '/dashboard/analytics': { 
            title: 'Analytics', 
            description: 'View reports and insights' 
        },
        '/dashboard/settings': { 
            title: 'Settings', 
            description: 'Configure your preferences' 
        },
    }
    
    return pages[path] || { title: 'Dashboard', description: 'CourviaShip Logistics' }
})

const currentPageTitle = computed(() => pageInfo.value.title)
const currentPageDescription = computed(() => pageInfo.value.description)

const userName = computed(() => authStore.user?.username || authStore.user?.email || 'User')
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

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
    isDropdownOpen.value = false
}

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push(`/dashboard/tracking?id=${searchQuery.value.trim()}`)
        searchQuery.value = ''
    }
}

const handleLogout = () => {
    closeDropdown()
    logout()
}

// Close dropdown when clicking outside
onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (dropdownRef.value && !dropdownRef.value.contains(target)) {
            closeDropdown()
        }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
})
</script>