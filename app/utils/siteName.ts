const siteName = ref('')
const siteURL = ref('https://courviaship.onrender.com')
const logoUrl = ref('')

const siteNameShort = computed(() => siteName.value.replace(/\s+/g, '').toLowerCase())

const setSiteName = (name: string) => {
    siteName.value = name
}

const setSiteURL = (value: string) => {
    siteURL.value = value
}

const setLogoUrl = (value: string) => {
    logoUrl.value = value
}

export { siteName, siteNameShort, setSiteName, setSiteURL, siteURL, logoUrl, setLogoUrl }