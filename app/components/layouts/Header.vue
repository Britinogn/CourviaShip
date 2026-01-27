<template>
    <header class="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 z-10">
        <div class="h-full px-6 flex items-center justify-between">
            <!-- Search Bar -->
            <div class="flex-1 max-w-2xl">
                <div class="relative">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search shipments by tracking ID..."
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        @keyup.enter="handleSearch"
                    />
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <!-- Right Side Actions -->
            <div class="flex items-center space-x-4 ml-6">
                <!-- Notifications -->
                <button class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <!-- Notification Badge -->
                    <span class="absolute top-1 right-1 w-2 h-2 bg-green-600 rounded-full"></span>
                </button>

                <!-- User Menu Dropdown -->
                <div class="relative">
                    <button 
                        @click="toggleDropdown"
                        class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {{ userInitials }}
                        </div>
                        <div class="hidden md:block text-left">
                            <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                            <p class="text-xs text-gray-500">Admin</p>
                        </div>
                        <svg 
                            class="w-4 h-4 text-gray-400 transition-transform"
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
                            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                        >
                            <NuxtLink 
                                to="/profile" 
                                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                @click="closeDropdown"
                            >
                                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Your Profile
                            </NuxtLink>
                            
                            <NuxtLink 
                                to="/settings" 
                                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                @click="closeDropdown"
                            >
                                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </NuxtLink>

                            <div class="border-t border-gray-200 my-1"></div>

                            <button 
                                @click="handleLogout"
                                class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { logout } = useAuth()
const router = useRouter()

const searchQuery = ref('')
const isDropdownOpen = ref(false)

const userName = computed(() => authStore.user?.username || authStore.user?.email || 'User')
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
        router.push(`/tracking?id=${searchQuery.value.trim()}`)
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
        if (!target.closest('.relative')) {
            closeDropdown()
        }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
})
</script>