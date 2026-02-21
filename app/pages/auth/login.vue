<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 px-4">
    <div class="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-800">
      <!-- Logo / Title -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white">CourviaShip</h1>
        <p class="text-gray-400 mt-2 text-sm">Sign in to continue</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="error"
        class="bg-red-900/40 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm"
      >
        {{ error }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-200"
            placeholder="you@example.com"
          />
        </div>

        <!-- Password with toggle -->
        <div class="relative">
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1.5">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="current-password"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-200 pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none"
              @click="showPassword = !showPassword"
            >
              <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Remember me -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center text-gray-300">
            <input
              id="remember"
              type="checkbox"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-700 rounded bg-gray-800"
            />
            <span class="ml-2">Remember me</span>
          </label>
        </div>

        <!-- Submit Button (Green CTA) -->
        <button
          type="submit"
          :disabled="pending"
          class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-500/30 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span v-if="!pending">Sign In</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing in...
          </span>
        </button>
      </form>

      <!-- Sign Up Link -->
      <div class="mt-8 text-center text-sm text-gray-400">
        Don't have an account?
        <!-- <NuxtLink to="/auth/signup" class="text-green-500 hover:text-green-400 font-medium ml-1">
          Sign up
        </NuxtLink> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: false
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const { login, pending, error } = useAuth()

const handleLogin = async () => {
  console.log('Login attempt:', email.value)
  await login(email.value, password.value)
}
</script>