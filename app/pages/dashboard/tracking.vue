<!-- <template>
    <div>

        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600 mt-2">Welcome to your dashboard!</p>

        <button @click="handleLogout">
            Logout
        </button>
    </div>
</template> -->

<template>
    <DashboardTracking />
</template>


<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'dashboard' 
})

const router = useRouter()
const { logout } = useAuth()

async function handleLogout() {
    await logout()
    router.push('/auth/login')
}
</script>