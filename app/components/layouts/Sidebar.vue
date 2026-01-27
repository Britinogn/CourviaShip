<template>
    <aside class="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
        <!-- Logo Section -->
        <div class="h-16 flex items-center px-6 border-b border-gray-200">
            <NuxtLink to="/dashboard" class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <span class="text-xl font-bold text-gray-900">CourviaShip</span>
            </NuxtLink>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex-1 px-4 py-6 overflow-y-auto">
            <ul class="space-y-2">
                <!-- Dashboard -->
                <li>
                    <NuxtLink 
                        to="/dashboard" 
                        :class="isActive('/dashboard') ? activeClass : inactiveClass"
                        class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="font-medium">Dashboard</span>
                    </NuxtLink>
                </li>

                <!-- Shipments -->
                <li>
                    <NuxtLink 
                        to="/shipments" 
                        :class="isActive('/shipments') ? activeClass : inactiveClass"
                        class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <span class="font-medium">Shipments</span>
                    </NuxtLink>
                </li>

                <!-- Tracking -->
                <li>
                    <NuxtLink 
                        to="/tracking" 
                        :class="isActive('/tracking') ? activeClass : inactiveClass"
                        class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="font-medium">Tracking</span>
                    </NuxtLink>
                </li>

                <!-- Analytics -->
                <li>
                    <NuxtLink 
                        to="/analytics" 
                        :class="isActive('/analytics') ? activeClass : inactiveClass"
                        class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span class="font-medium">Analytics</span>
                    </NuxtLink>
                </li>

                <!-- Divider -->
                <li class="pt-4 pb-2">
                    <div class="border-t border-gray-200"></div>
                </li>

                <!-- Settings -->
                <li>
                    <NuxtLink 
                        to="/settings" 
                        :class="isActive('/settings') ? activeClass : inactiveClass"
                        class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="font-medium">Settings</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>

        <!-- User Section (Bottom) -->
        <div class="p-4 border-t border-gray-200">
            <div class="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ userInitials }}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ userName }}</p>
                    <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const authStore = useAuthStore()

const activeClass = 'bg-green-50 text-green-700'
const inactiveClass = 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'

const isActive = (path: string) => {
    return route.path === path || route.path.startsWith(path + '/')
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
</script>