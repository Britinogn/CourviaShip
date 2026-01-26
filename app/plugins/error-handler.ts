export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('vue:error', (error, instance, info) => {
        console.error('Global error:', error)
        console.error('Error info:', info)
        
        // You can send to error tracking service here
        // e.g., Sentry, LogRocket, etc.
    })

    nuxtApp.hook('app:error', (error) => {
        console.error('App error:', error)
    })
})