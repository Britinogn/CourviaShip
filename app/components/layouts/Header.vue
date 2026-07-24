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
            <!-- Activated: search by tracking / consignment ID, pushes to the tracking page on enter -->
            <div class="hidden md:block flex-1 max-w-xl mx-8">
                <div class="relative">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search by tracking ID..."
                        class="w-full pl-11 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:border-green-500 outline-none transition-all text-sm"
                        @keyup.enter="handleSearch"
                    />
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <!-- Clear button, only shows once the user has typed something -->
                    <button
                        v-if="searchQuery"
                        @click="searchQuery = ''"
                        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="Clear search"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Right Side Actions -->
            <div class="flex items-center gap-2">

                <!-- Notifications -->
                <div class="relative" ref="notificationsRef">
                    <button
                        @click="toggleNotifications"
                        class="relative p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all group"
                        aria-label="Notifications"
                    >
                        <!-- <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg> -->
                        <!-- Notification Badge: only shows when there are unread notifications -->
                        <!-- <span
                            v-if="unreadCount > 0"
                            class="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white"
                        ></span> -->
                    </button>

                    <!-- Notifications Dropdown -->
                    <Transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <div
                            v-if="isNotificationsOpen"
                            class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                            <!-- Header -->
                            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                <p class="font-semibold text-gray-900">Notifications</p>
                                <button
                                    v-if="unreadCount > 0"
                                    @click="markAllAsRead"
                                    class="text-xs font-medium text-green-600 hover:text-green-700"
                                >
                                    Mark all as read
                                </button>
                            </div>

                            <!-- List -->
                            <div class="max-h-80 overflow-y-auto">
                                <!-- Empty state -->
                                <div v-if="notifications.length === 0" class="px-4 py-8 text-center text-sm text-gray-400">
                                    You're all caught up.
                                </div>

                                <button
                                    v-for="notification in notifications"
                                    :key="notification.id"
                                    @click="markAsRead(notification.id)"
                                    class="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-green-50 transition-colors border-b border-gray-50 last:border-b-0"
                                    :class="{ 'bg-green-50/40': !notification.read }"
                                >
                                    <!-- Unread dot -->
                                    <span
                                        class="mt-1.5 w-2 h-2 rounded-full shrink-0"
                                        :class="notification.read ? 'bg-transparent' : 'bg-green-500'"
                                    ></span>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate">{{ notification.title }}</p>
                                        <p class="text-xs text-gray-500 mt-0.5 line-clamp-2">{{ notification.message }}</p>
                                        <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
                                    </div>
                                </button>
                            </div>

                            <!-- Footer -->
                            <NuxtLink
                                to="/dashboard/notifications"
                                @click="closeNotifications"
                                class="block text-center text-sm font-semibold text-green-600 hover:text-green-700 py-3 border-t border-gray-100"
                            >
                                View all notifications
                            </NuxtLink>
                        </div>
                    </Transition>
                </div>

                <!-- Quick Actions -->
                <!-- Enabled: now links to the new shipment creation page instead of being a disabled placeholder -->
                <NuxtLink
                    to="/dashboard/shipments"
                    class="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-all shadow-sm"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>New Shipment</span>
                </NuxtLink>

                <!-- User Menu Dropdown -->
                <div class="relative" ref="dropdownRef">
                    <button 
                        @click="toggleDropdown"
                        class="flex items-center gap-3 pl-3 pr-4 py-2 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200"
                    >
                        <div class="w-9 h-9 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-green-100">
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

// --- Notifications ---
// TODO: replace this mock list with a real fetch from your notifications API/store
interface Notification {
    id: number
    title: string
    message: string
    time: string
    read: boolean
}

const notifications = ref<Notification[]>([
    {
        id: 1,
        title: 'Shipment delivered',
        message: 'Consignment #CS-10234 was delivered successfully.',
        time: '5 minutes ago',
        read: false,
    },
    {
        id: 2,
        title: 'New consignment created',
        message: 'A new shipment #CS-10241 has been added to the queue.',
        time: '1 hour ago',
        read: false,
    },
    {
        id: 3,
        title: 'Payment received',
        message: 'Payment confirmed for invoice #INV-3382.',
        time: 'Yesterday',
        read: true,
    },
])

const isNotificationsOpen = ref(false)
const notificationsRef = ref<HTMLElement | null>(null)

// Count of unread notifications, used to show/hide the badge dot
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value
}

const closeNotifications = () => {
    isNotificationsOpen.value = false
}

const markAsRead = (id: number) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
        notification.read = true
    }
}

const markAllAsRead = () => {
    notifications.value.forEach(n => (n.read = true))
}

// Close dropdown when clicking outside
onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (dropdownRef.value && !dropdownRef.value.contains(target)) {
            closeDropdown()
        }
        // Also close the notifications panel when clicking outside of it
        if (notificationsRef.value && !notificationsRef.value.contains(target)) {
            closeNotifications()
        }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
})
</script>