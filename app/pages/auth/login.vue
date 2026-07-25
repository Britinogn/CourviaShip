<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="relative bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <!-- Signature accent: top bar + route line, echoes the tracking motif from receipts -->
        <div class="h-1 bg-green-600"></div>

        <div class="p-8 sm:p-10">
          <!-- Eyebrow + Logo / Title -->
          <div class="text-center mb-8">
            <div class="flex items-center justify-center gap-2 mb-4">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span class="text-xs font-mono font-semibold tracking-[0.2em] text-green-500 uppercase">
                Admin Access
              </span>
            </div>
            <h1 class="text-3xl font-bold text-white">CourviaShip</h1>
            <p class="text-gray-400 mt-2 text-sm">Sign in to manage shipments</p>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            role="alert"
            class="bg-red-900/40 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm flex items-start gap-2"
          >
            <svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address
              </label>
              <div class="relative">
                <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" />
                </svg>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  autocomplete="email"
                  class="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <!-- Password with toggle -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div class="relative">
                <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  class="w-full pl-11 pr-11 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
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
              <label class="flex items-center text-gray-300 cursor-pointer">
                <input
                  id="remember"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-700 rounded bg-gray-800"
                />
                <span class="ml-2">Remember me</span>
              </label>
            </div>

            <!-- Submit Button -->
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

          <!-- Footer note -->
          <div class="mt-8 text-center text-sm text-gray-500">
            Need access? Contact your administrator.
          </div>
        </div>
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
const rememberMe = ref(false)

const { login, pending, error } = useAuth()

const handleLogin = async () => {
  await login(email.value, password.value)
}
</script>