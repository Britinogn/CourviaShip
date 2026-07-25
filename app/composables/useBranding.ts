import { useSettings } from '~/composables/useSettings'
import { appName, siteName, setAppName, setSiteName } from '~/utils/appName'

export function useBranding() {
  const { fetchCompanySettings, companyForm } = useSettings()

  const refreshBranding = async () => {
    await fetchCompanySettings()

    if (companyForm.value.companyName) {
      setAppName(companyForm.value.companyName)
    }

    if (companyForm.value.websiteUrl) {
      setSiteName(companyForm.value.websiteUrl)
    }
  }

  const currentAppName = computed(() => appName.value)
  const currentSiteName = computed(() => siteName.value)

  return {
    appName: currentAppName,
    siteName: currentSiteName,
    refreshBranding,
  }
}
