<template>
  <div>
    <!-- Mobile Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden transition-opacity"
      @click="onClose"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 top-0 z-50 w-64 lg:w-72 bg-gradient-to-b from-emerald-700 via-emerald-800 to-emerald-900 min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl"
      :class="{ 'translate-x-0': isOpen, '-translate-x-full lg:translate-x-0': !isOpen }"
    >
      <!-- Logo Section -->
      <div class="h-20 flex items-center justify-between px-4 border-b border-white/10">
        <NuxtLink to="/dashboard" class="flex items-center space-x-2.5" @click="onClose">
          <div class="w-10 h-10 bg-white/95 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-white leading-tight">CourviaShip</h2>
            <p class="text-[11px] text-emerald-100">Logistics Manager</p>
          </div>
        </NuxtLink>

        <!-- Close button (mobile only) -->
        <button
          @click="onClose"
          class="p-2 hover:bg-white/10 rounded-xl transition-colors text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- User Profile (more compact) -->
      <div class="px-4 py-4 border-b border-white/10">
        <div class="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
          <div class="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-emerald-700 font-bold text-lg shrink-0">
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-white truncate text-sm">{{ userName }}</p>
            <p class="text-xs text-emerald-100 truncate flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 bg-emerald-300 rounded-full"></span>
              {{ userEmail }}
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-5 overflow-y-auto">
        <div
          v-for="(group, groupIndex) in navGroups"
          :key="group.label"
          :class="groupIndex > 0 ? 'mt-6 pt-6 border-t border-white/10' : ''"
        >
          <p class="px-3 text-[11px] font-semibold text-emerald-200/70 uppercase tracking-wider mb-2">
            {{ group.label }}
          </p>

          <div class="space-y-1">
            <NuxtLink
              v-for="item in group.items"
              :key="item.path"
              :to="item.path"
              @click="onClose"
              :class="[
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 relative',
                isActive(item.path)
                  ? 'bg-white text-emerald-800 shadow-lg'
                  : 'text-emerald-50 hover:bg-white/10 hover:text-white'
              ]"
            >
              <!-- Active bar -->
              <div
                v-if="isActive(item.path)"
                class="absolute left-0 top-1 bottom-1 w-1 bg-emerald-600 rounded-r-full"
              />

              <!-- Icon -->
              <div
                :class="[
                  'w-9 h-9 flex items-center justify-center rounded-lg transition-all',
                  isActive(item.path)
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-white/10 text-emerald-100 group-hover:bg-white/20'
                ]"
              >
                <component :is="item.icon" class="w-4.5 h-4.5" />
              </div>

              <span class="text-sm font-medium">{{ item.name }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-6 pt-6 border-t border-white/10">
          <p class="px-3 text-[11px] font-semibold text-emerald-200/70 uppercase tracking-wider mb-2">
            Quick Actions
          </p>

          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-50 bg-white/5 border border-white/10 hover:bg-white/15 transition-all"
          >
            <div class="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span class="text-sm font-medium">New Shipment</span>
          </button>
        </div>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t border-white/10">
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-3 py-3 text-white bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all font-medium border border-red-400/20"
        >
          <div class="w-9 h-9 bg-red-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span class="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, ShipIcon, LocateIcon, ChartArea, Settings, UsersIcon } from 'lucide-vue-next'

interface NavItem {
  name: string
  path: string
  icon: any
}

interface NavGroup {
  label: string
  items: NavItem[]
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

const { isOpen, onClose } = defineProps<Props>()

const route = useRoute()
const authStore = useAuthStore()
const { logout } = useAuth()

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    ],
  },
  {
    label: 'Operations',
    items: [
      { name: 'Shipments', path: '/dashboard/shipments', icon: ShipIcon },
      { name: 'Tracking', path: '/dashboard/tracking', icon: LocateIcon },
    ],
  },
  {
    label: 'Customers',
    items: [
      { name: 'Customers', path: '/dashboard/customers', icon: UsersIcon },
    ],
  },
  {
    label: 'Insights',
    items: [
      { name: 'Analytics', path: '/dashboard/analytics', icon: ChartArea },
    ],
  },
  {
    label: 'Settings',
    items: [
      { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ],
  },
]

const isActive = (path: string) => {
  if (path === '/dashboard') return route.path === '/dashboard'
  return route.path === path || route.path.startsWith(path + '/')
}

const handleLogout = () => {
  onClose()
  logout()
}

const userName = computed(() => authStore.user?.username || 'User')
const userEmail = computed(() => authStore.user?.email || 'user@example.com')

const userInitials = computed(() => {
  if (authStore.user?.username) return authStore.user.username.charAt(0).toUpperCase()
  if (authStore.user?.email) return authStore.user.email.charAt(0).toUpperCase()
  return 'U'
})
</script>