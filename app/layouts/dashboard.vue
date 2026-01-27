<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Sidebar with mobile toggle -->
        <LayoutsSidebar :isOpen="sidebarOpen" :onClose="closeSidebar" />
        
        <!-- Header with toggle button -->
        <LayoutsHeader @toggle-sidebar="toggleSidebar" />
        
        <!-- Main Content Area -->
        <main class="lg:ml-72 mt-16 p-6 transition-all duration-300">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(false)

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
    sidebarOpen.value = false
}
</script>