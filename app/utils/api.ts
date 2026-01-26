// import type { Ref } from 'vue'

export const apiClient = () => {
    const config = useRuntimeConfig()  // get runtime env vars
    const token: Ref<string | undefined> = useCookie('auth_token') // reactive cookie

    // default headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }

    // add token if it exists
    if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`
    }

    // return object ready for $fetch
    return {
        apiURL: config.public.apiURL,
        headers
    }
}
