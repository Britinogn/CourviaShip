import type { AuthResponse } from "~/types";
import { useAuthStore } from "~/stores/auth";
import { apiClient } from "~/utils/api";

export function useAuth() {
    const authStore = useAuthStore()
    const router = useRouter()

    // --- login ---
    async function login(email:string, password: string) {
        try {
            const data = await $fetch<AuthResponse>('/login', {
                ...apiClient(),
                method: 'POST',
                body:{email}
            })

            if (data?.token) {
                authStore.setToken(data.token)
                router.push('/')
            }

            return{ success: true, data}

        } catch (error : any) {
            return {
                success: false,
                error: error?.data?.message || "Unauthorized"
            }
        }
    }

    //logout
    function logout(){
        authStore.clearToken()
        router.push('/auth/login')
    }

    return {
        login,
        logout,
        isAuthenticated: computed(() => authStore.isAuthenticated)
    }
}