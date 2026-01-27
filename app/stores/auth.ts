import {defineStore} from 'pinia'
import { ref, computed } from 'vue'
import type { IUser } from '~/types' // Adjust the path to where your IUser is defined

// ✅ Create a type for user without password
type AuthUser = Omit<IUser, 'password'>

export const useAuthStore = defineStore('auth', () => {

    // Use cookie ref directly with security options
    const tokenCookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    })

    // ✅ User cookie - allow undefined in the type
    const userCookie = useCookie<AuthUser | undefined>('auth_user', {
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

    // ✅ User state linked to cookie
    const user = computed<AuthUser | null>({
        get: () => userCookie.value ?? null,
        set: (newUser: AuthUser | null) => {
            userCookie.value = newUser ?? undefined
        }
    })

    const pending = ref<boolean>(false)
    const error = ref<string | null>(null)

    // computed
    const isAuthenticated = computed(() => !!token.value)

    //actions
    const setToken = (newToken: string) => {
        token.value = newToken
    }

    // ✅ Updated to accept AuthUser type (which excludes password)
    const setUser = (newUser: AuthUser) => { 
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