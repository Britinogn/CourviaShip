export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const config = useRuntimeConfig()
  const propertyId = (config.public?.tawkPropertyId as string | undefined) || '6a64f18ec02a651d48da9db3'
  const widgetId = (config.public?.tawkWidgetId as string | undefined) || '1judacilp'

  if (document.getElementById('tawk-script')) {
    return
  }

  const script = document.createElement('script')
  script.id = 'tawk-script'
  script.async = true
  script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`
  script.charset = 'UTF-8'
  script.setAttribute('crossorigin', '*')

  const firstScript = document.getElementsByTagName('script')[0]
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript)
  } else {
    document.head.appendChild(script)
  }
})

