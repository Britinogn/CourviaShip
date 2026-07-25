import { useSettings } from '~/composables/useSettings'
import { siteName, siteURL, setSiteName, setSiteURL } from '~/utils/siteName'

export function useBranding() {
  const { fetchCompanySettings, companyForm } = useSettings()

  const refreshBranding = async () => {
    await fetchCompanySettings()

    if (companyForm.value.companyName) {
      setSiteName(companyForm.value.companyName)
    }

    if (companyForm.value.websiteUrl) {
      setSiteURL(companyForm.value.websiteUrl)
    }
  }

  const currentSiteName = computed(() => siteName.value)
  const currentSiteURL = computed(() => siteURL.value)

  return {
    siteName: currentSiteName,
    siteURL: currentSiteURL,
    refreshBranding,
  }
}
