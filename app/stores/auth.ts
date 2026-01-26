import {defineStore} from 'pinia'
import { ref, computed } from 'vue'


export const useAuthStore = defineStore('auth', () => {

    // Use cookie ref directly with security options
    const tokenCookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    })

    // Reactive token state directly linked to cookie
    const token = computed({
        get: () => tokenCookie.value || null,
        set: (newToken: string | null) => {
            tokenCookie.value = newToken || undefined
        }
    })

    const user = ref<{email: string, username?: string } | null>(null);
    const pending = ref<boolean>(false)
    const error = ref<string | null>(null)

    // computed
    const isAuthenticated = computed(() => !!token.value)

    //actions
    const setToken = (newToken : string ) => {
        token.value = newToken
    }

    const setUser = (newUser: { email: string, username?: string }) => { 
        user.value = newUser
    }

    const setPending = (value: boolean) => {
        pending.value = value
    }

    const setError = (message: string | null) => {
        error.value = message
    }

    const clearToken = () => {
        token.value = null
        user.value = null
        error.value = null
    }


    return{
        token,
        user,
        pending,
        error,
        isAuthenticated,
        setToken,
        clearToken,
        setUser,
        setPending,
        setError
    }

})