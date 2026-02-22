import type { AuthResponse } from "~/types";
import { useAuthStore } from "~/stores/auth";
import { apiClient } from "~/utils/api";
// import  IUser  from "~/types";

export function useAuth() {
    const authStore = useAuthStore()
    const router = useRouter()
    const toast = useToast() 
    // type AuthUser = Omit<IUser, 'password'> & { _id?: string }


    // --- Signup ---
    async function signup(username: string, email: string, password: string) {
        try {
            authStore.setPending(true)  // ← Add loading state
            authStore.setError(null)

            const response = await $fetch<AuthResponse>('/signup', {
                ...apiClient(),
                method: 'POST',
                body: { username, email, password }
            })

            const data = response.data || response

            // Auto-login after signup
            if (data?.token) {
                authStore.setToken(data.token)
                authStore.setUser(data.user)  
                toast.success('SignUp successful!') 
                router.push('/')
            }

            return { success: true, data }
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.message || 'Signup failed'
            authStore.setError(errorMessage) 
            toast.error(errorMessage)
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

            const response  = await $fetch<AuthResponse>('/auth/login', {
                ...apiClient(),
                method: 'POST',
                body: { email, password }
            })

            // Extract data from nested response
            const data = response.data || response

            if (data?.token) {
                authStore.setToken(data.token)
                authStore.setUser(data.user)
                toast.success('Login successful!')
                router.push('/dashboard')
            }

            return { success: true, data }

        } catch (error: any) {
            let errorMessage = 'Unable to sign in. Please try again.'

            // Backend returned a structured error
            if (error?.data?.message) {
                errorMessage = error.data.message
            }
            // Network / server unreachable
            else if (error?.name === 'FetchError') {
                errorMessage = 'Cannot connect to the server. Please check your connection.'
            }

            authStore.setError(errorMessage)
            toast.error(errorMessage)

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
        toast.success('Logout successful!') 
        router.push('/auth/login')
    }

    return {
    signup,
    login,
    logout,
    //fetchUser,  // ← Add this
    isAuthenticated: computed(() => authStore.isAuthenticated),
    user: computed(() => authStore.user),  // ← Useful to have
    pending: computed(() => authStore.pending),  // ← For loading states
    error: computed(() => authStore.error )
}
}