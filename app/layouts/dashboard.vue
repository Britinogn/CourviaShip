<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Sidebar -->
        <LayoutsSidebar/>
        
        <!-- Header -->
        <LayoutsHeader  />
        
        <!-- Main Content Area -->
        <main class="ml-64 mt-16 p-6">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
//auto imports
</script>