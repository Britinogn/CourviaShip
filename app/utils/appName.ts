

const appName = ref('CourviaShip')
const siteName = ref('https://courviaship.onrender.com')

const appNameShort = computed(() => appName.value.replace(/\s+/g, '').toLowerCase())


const setAppName =  (name: string) => {
    appName.value = name
    siteName.value = name
}


export { appName, appNameShort, setAppName, siteName }
