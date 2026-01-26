import type { AuthResponse } from "~/types";
import { useAuthStore } from "~/stores/auth";
import { apiClient } from "~/utils/api";

export function useAuth() {
    const authStore = useAuthStore()
    const router = useRouter()

    // --- Signup ---
    async function signup(username: string, email: string, password: string) {
        try {
            authStore.setPending(true)  // ← Add loading state
            authStore.setError(null)

            const data = await $fetch<AuthResponse>('/signup', {
                ...apiClient(),
                method: 'POST',
                body: { username, email, password }
            })

            // Auto-login after signup
            if (data?.token) {
                authStore.setToken(data.token)
                authStore.setUser(data.user)  // ← Don't forget user data
                router.push('/')
            }

            return { success: true, data }
        } catch (error: any) {
            const errorMessage = error?.data?.message || error.message || 'Signup failed'
            authStore.setError(errorMessage)  // ← Set error in store
            return { success: false, error: errorMessage }
        } finally {
            authStore.setPending(false)  // ← Stop loading
        }
    }

    // --- login ---
    async function login(email: string, password: string) {
        try {
            authStore.setPending(true)
            authStore.setError(null)

            const data = await $fetch<AuthResponse>('/login', {
                ...apiClient(),
                method: 'POST',
                body: { email, password }
            })

            if (data?.token) {
                authStore.setToken(data.token)
                authStore.setUser(data.user)  
                router.push('/')
            }

            return { success: true, data }

        } catch (error: any) {
            const errorMessage = error?.data?.message || error.message || 'Login failed'
            authStore.setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            authStore.setPending(false)
        }
}

    /*
    
    async function fetchUser() {
        if (!authStore.token) return { success: false }

        try {
            authStore.setPending(true)
            authStore.setError(null)

            const data = await $fetch<{ user: any }>('/auth/me', {
                ...apiClient()
            })

            authStore.setUser(data.user)
            return { success: true, data: data.user }

        } catch (error: any) {
            // Token invalid, clear auth
            authStore.clearToken()
            return { success: false, error: error.message }
        } finally {
            authStore.setPending(false)
        }
    } 
            
    */

    //logout
    function logout(){
        authStore.clearToken()
        router.push('/auth/login')
    }

    return {
    signup,
    login,
    logout,
    //fetchUser,  // ← Add this
    isAuthenticated: computed(() => authStore.isAuthenticated),
    user: computed(() => authStore.user),  // ← Useful to have
    pending: computed(() => authStore.pending)  // ← For loading states
}
}