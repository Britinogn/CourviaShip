import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'

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
          avatarUrl: profileData.avatarUrl || '',
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
          avatarUrl: updatedProfile.avatarUrl || '',
        }

        if (authStore.user) {
          authStore.setUser({
            ...authStore.user,
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
          avatarUrl: updatedProfile.avatarUrl || '',
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
          logoUrl: companyData.logoUrl || '',
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
          logoUrl: updatedCompany.logoUrl || '',
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
          logoUrl: updatedCompany.logoUrl || '',
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
  }
}
