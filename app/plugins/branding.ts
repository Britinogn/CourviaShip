import { useAuthStore } from '~/stores/auth'
import { useSettings } from '~/composables/useSettings'

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const { fetchCompanySettings } = useSettings()

  if (!authStore.token) {
    return
  }

  try {
    await fetchCompanySettings()
  } catch {
    // Ignore startup branding fetch errors so the app can still render.
  }
})
