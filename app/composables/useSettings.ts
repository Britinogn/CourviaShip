import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'
import { setSiteName, setSiteURL, setSupportEmail } from '~/utils/siteName'

interface ProfileSettings {
  _id?: string
  username: string
  email: string
  avatarUrl?: string
}

interface CompanySettings {
  _id?: string
  companyName: string
  supportEmail: string
  supportPhone: string
  websiteUrl: string
  address: string
  logoUrl?: string
}

interface ProfileFormState {
  username: string
  email: string
  avatarUrl?: string
}

interface PasswordFormState {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface CompanyFormState {
  companyName: string
  supportEmail: string
  supportPhone: string
  websiteUrl: string
  address: string
  logoUrl?: string
}

export function useSettings() {
  const authStore = useAuthStore()
  const toast = useToast()
  const runtimeConfig = useRuntimeConfig()

  const resolveAssetUrl = (value?: string) => {
    if (!value) return ''

    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) {
      return value
    }

    if (value.startsWith('/uploads/')) {
      const mediaBaseUrl = runtimeConfig.public.mediaBaseURL || 'http://localhost:5000'
      return `${mediaBaseUrl}${value}`
    }

    return value
  }

  const profile = ref<ProfileSettings | null>(null)
  const profileForm = ref<ProfileFormState>({ username: '', email: '', avatarUrl: '' })
  const passwordForm = ref<PasswordFormState>({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const company = ref<CompanySettings | null>(null)
  const companyForm = ref<CompanyFormState>({
    companyName: '',
    supportEmail: '',
    supportPhone: '',
    websiteUrl: '',
    address: '',
    logoUrl: '',
  })

  const loading = ref(false)
  const savingProfile = ref(false)
  const savingPassword = ref(false)
  const savingCompany = ref(false)

  const resetPasswordForm = () => {
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  }

  const fetchProfileSettings = async () => {
    try {
      loading.value = true
      const response = await $fetch<{ status: boolean; message: string; data?: { profile: ProfileSettings } }>('/settings/profile', {
        ...apiClient(),
        method: 'GET',
      })

      const profileData = response.data?.profile
      if (profileData) {
        profile.value = profileData
        profileForm.value = {
          username: profileData.username || '',
          email: profileData.email || '',
          avatarUrl: resolveAssetUrl(profileData.avatarUrl),
        }
      }
    } catch (error: any) {
      const message = error?.data?.message || 'Unable to load profile settings'
      toast.error(message)
    } finally {
      loading.value = false
    }
  }

  const updateProfileSettings = async () => {
    try {
      savingProfile.value = true
      const response = await $fetch<{ status: boolean; message: string; data?: { profile: ProfileSettings } }>('/settings/profile', {
        ...apiClient(),
        method: 'PATCH',
        body: {
          username: profileForm.value.username,
          email: profileForm.value.email,
        },
      })

      const updatedProfile = response.data?.profile
      if (updatedProfile) {
        profile.value = updatedProfile
        profileForm.value = {
          username: updatedProfile.username || '',
          email: updatedProfile.email || '',
          avatarUrl: resolveAssetUrl(updatedProfile.avatarUrl),
        }

        if (authStore.user) {
          authStore.updateUser({
            username: updatedProfile.username,
            email: updatedProfile.email,
            avatarUrl: updatedProfile.avatarUrl,
          })
        }
      }

      toast.success(response.message || 'Profile updated successfully')
      return true
    } catch (error: any) {
      const message = error?.data?.message || 'Unable to update profile'
      toast.error(message)
      return false
    } finally {
      savingProfile.value = false
    }
  }

  const updatePasswordSettings = async () => {
    if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword) {
      toast.error('Please fill in your current and new password')
      return false
    }

    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      toast.error('New passwords do not match')
      return false
    }

    try {
      savingPassword.value = true
      const response = await $fetch<{ status: boolean; message: string }>('/settings/password', {
        ...apiClient(),
        method: 'PATCH',
        body: {
          currentPassword: passwordForm.value.currentPassword,
          newPassword: passwordForm.value.newPassword,
        },
      })

      resetPasswordForm()
      toast.success(response.message || 'Password updated successfully')
      return true
    } catch (error: any) {
      const message = error?.data?.message || 'Unable to update password'
      toast.error(message)
      return false
    } finally {
      savingPassword.value = false
    }
  }

  const uploadAvatarImage = async (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      savingProfile.value = true
      const headers = { ...apiClient().headers }
      delete headers['Content-Type']

      const response = await $fetch<{ status: boolean; message: string; data?: { profile: ProfileSettings } }>('/settings/profile/avatar', {
        ...apiClient(),
        method: 'PATCH',
        body: formData,
        headers,
      })

      const updatedProfile = response.data?.profile
      if (updatedProfile) {
        profile.value = updatedProfile
        profileForm.value = {
          username: updatedProfile.username || '',
          email: updatedProfile.email || '',
          avatarUrl: resolveAssetUrl(updatedProfile.avatarUrl),
        }

        if (authStore.user) {
          authStore.updateUser({
            username: updatedProfile.username,
            email: updatedProfile.email,
            avatarUrl: updatedProfile.avatarUrl,
          })
        }
      }

      toast.success(response.message || 'Avatar uploaded successfully')
      return true
    } catch (error: any) {
      const message = error?.data?.message || 'Unable to upload avatar'
      toast.error(message)
      return false
    } finally {
      savingProfile.value = false
    }
  }

  const fetchCompanySettings = async () => {
    try {
      loading.value = true
      const response = await $fetch<{ status: boolean; message: string; data?: { company: CompanySettings } }>('/settings/company', {
        ...apiClient(),
        method: 'GET',
      })

      const companyData = response.data?.company
      if (companyData) {
        company.value = companyData
        companyForm.value = {
          companyName: companyData.companyName || '',
          supportEmail: companyData.supportEmail || '',
          supportPhone: companyData.supportPhone || '',
          websiteUrl: companyData.websiteUrl || '',
          address: companyData.address || '',
          logoUrl: resolveAssetUrl(companyData.logoUrl),
        }

        if (companyData.companyName) {
          setSiteName(companyData.companyName)
        }

        if (companyData.websiteUrl) {
          setSiteURL(companyData.websiteUrl)
        }

        if (companyData.supportEmail) {
          setSupportEmail(companyData.supportEmail)
        }
      }
    } catch (error: any) {
      const message = error?.data?.message || 'Unable to load company settings'
      toast.error(message)
    } finally {
      loading.value = false
    }
  }

  const updateCompanySettings = async () => {
    try {
      savingCompany.value = true
      const response = await $fetch<{ status: boolean; message: string; data?: { company: CompanySettings } }>('/settings/company', {
        ...apiClient(),
        method: 'PATCH',
        body: {
          companyName: companyForm.value.companyName,
          supportEmail: companyForm.value.supportEmail,
          supportPhone: companyForm.value.supportPhone,
          websiteUrl: companyForm.value.websiteUrl,
          address: companyForm.value.address,
        },
      })

      const updatedCompany = response.data?.company
      if (updatedCompany) {
        company.value = updatedCompany
        companyForm.value = {
          companyName: updatedCompany.companyName || '',
          supportEmail: updatedCompany.supportEmail || '',
          supportPhone: updatedCompany.supportPhone || '',
          websiteUrl: updatedCompany.websiteUrl || '',
          address: updatedCompany.address || '',
          logoUrl: resolveAssetUrl(updatedCompany.logoUrl),
        }

        if (updatedCompany.companyName) {
          setSiteName(updatedCompany.companyName)
        }

        if (updatedCompany.websiteUrl) {
          setSiteURL(updatedCompany.websiteUrl)
        }

        if (updatedCompany.supportEmail) {
          setSupportEmail(updatedCompany.supportEmail)
        }
      }

      toast.success(response.message || 'Company settings updated successfully')
      return true
    } catch (error: any) {
      const message = error?.data?.message || 'Unable to update company settings'
      toast.error(message)
      return false
    } finally {
      savingCompany.value = false
    }
  }

  const uploadCompanyLogoImage = async (file: File) => {
    const formData = new FormData()
    formData.append('logo', file)

    try {
      savingCompany.value = true
      const headers = { ...apiClient().headers }
      delete headers['Content-Type']

      const response = await $fetch<{ status: boolean; message: string; data?: { company: CompanySettings } }>('/settings/company/logo', {
        ...apiClient(),
        method: 'PATCH',
        body: formData,
        headers,
      })

      const updatedCompany = response.data?.company
      if (updatedCompany) {
        company.value = updatedCompany
        companyForm.value = {
          companyName: updatedCompany.companyName || '',
          supportEmail: updatedCompany.supportEmail || '',
          supportPhone: updatedCompany.supportPhone || '',
          websiteUrl: updatedCompany.websiteUrl || '',
          address: updatedCompany.address || '',
          logoUrl: resolveAssetUrl(updatedCompany.logoUrl),
        }

        if (updatedCompany.companyName) {
          setSiteName(updatedCompany.companyName)
        }

        if (updatedCompany.websiteUrl) {
          setSiteURL(updatedCompany.websiteUrl)
        }
      }

      toast.success(response.message || 'Company logo uploaded successfully')
      return true
    } catch (error: any) {
      const message = error?.data?.message || 'Unable to upload company logo'
      toast.error(message)
      return false
    } finally {
      savingCompany.value = false
    }
  }

  const fetchPublicCompanySettings = async () => {
    try {
      const response = await $fetch<{ status: boolean; data: { companyName: string; websiteUrl: string; logoUrl?: string; supportEmail?: string } }>(
        `${runtimeConfig.public.baseURL}/settings/company/public`
      )

      if (response?.data?.companyName) {
        setSiteName(response.data.companyName)
      }
      if (response?.data?.websiteUrl) {
        setSiteURL(response.data.websiteUrl)
      }
      if (response?.data?.logoUrl) {
        setLogoUrl(resolveAssetUrl(response.data.logoUrl))
      }
      if (response?.data?.supportEmail) {
        setSupportEmail(response.data.supportEmail)
      }
    } catch (error) {
      console.error('Failed to load public company settings:', error)
    }
  }

  return {
    profile,
    profileForm,
    passwordForm,
    company,
    companyForm,
    loading,
    savingProfile,
    savingPassword,
    savingCompany,
    fetchProfileSettings,
    updateProfileSettings,
    updatePasswordSettings,
    uploadAvatarImage,
    fetchCompanySettings,
    updateCompanySettings,
    uploadCompanyLogoImage,
    fetchPublicCompanySettings,
  }
}
