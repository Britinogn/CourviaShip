const appName = ref('')
const siteName = ref('https://courviaship.onrender.com')

const appNameShort = computed(() => appName.value.replace(/\s+/g, '').toLowerCase())

const setAppName = (name: string) => {
    appName.value = name
}

const setSiteName = (value: string) => {
    siteName.value = value
}

export { appName, appNameShort, setAppName, setSiteName, siteName }
