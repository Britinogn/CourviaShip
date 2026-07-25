<template>
  <div class="space-y-6">
    <div class="rounded-3xl border border-emerald-100 bg-linear-to-r from-emerald-600 via-emerald-700 to-emerald-800 p-6 text-white shadow-lg">
      <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-medium text-emerald-100">Workspace preferences</p>
          <h2 class="text-2xl font-semibold">Settings</h2>
          <p class="mt-1 text-sm text-emerald-50/90">Manage your profile, password, and brand details from one place.</p>
        </div>
        <div class="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur">
          <p class="font-medium">Secure updates</p>
          <p class="text-emerald-100">All changes are protected by your session.</p>
        </div>
      </div>
    </div>

    <div v-if="loading" class="rounded-3xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
      Loading settings...
    </div>

    <div v-else class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="space-y-6">
        <section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <div class="rounded-xl bg-emerald-50 p-2 text-emerald-700">
                  <UserIcon class="h-4 w-4" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Profile</h3>
              </div>
              <p class="mt-2 text-sm text-gray-500">Update your basic information and avatar.</p>
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-6 md:flex-row">
            <div class="flex flex-col items-center gap-3 md:w-48">
              <div class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-linear-to-br from-emerald-100 to-emerald-50 text-2xl font-semibold text-emerald-700 shadow-inner">
                <img v-if="profileForm.avatarUrl" :src="profileForm.avatarUrl" alt="Avatar" class="h-full w-full object-cover" />
                <span v-else>{{ initials }}</span>
              </div>
              <label class="cursor-pointer rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                <input type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
                Upload avatar
              </label>
            </div>

            <div class="flex-1 space-y-4">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Username</label>
                <input v-model="profileForm.username" type="text" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input v-model="profileForm.email" type="email" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
              </div>
              <button @click="submitProfile" class="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700" :disabled="savingProfile">
                {{ savingProfile ? 'Saving...' : 'Save profile' }}
              </button>
            </div>
          </div>
        </section>

        <section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <div class="flex items-center gap-2">
              <div class="rounded-xl bg-amber-50 p-2 text-amber-700">
                <LockClosedIcon class="h-4 w-4" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Password</h3>
            </div>
            <p class="mt-2 text-sm text-gray-500">Change your password securely with visible password toggles.</p>
          </div>

          <div class="mt-6 space-y-4">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Current password</label>
              <div class="relative">
                <input v-model="passwordForm.currentPassword" :type="showCurrentPassword ? 'text' : 'password'" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 pr-11 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
                <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700" @click="togglePassword('current')">
                  <EyeIcon v-if="!showCurrentPassword" class="h-4 w-4" />
                  <EyeSlashIcon v-else class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">New password</label>
              <div class="relative">
                <input v-model="passwordForm.newPassword" :type="showNewPassword ? 'text' : 'password'" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 pr-11 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
                <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700" @click="togglePassword('new')">
                  <EyeIcon v-if="!showNewPassword" class="h-4 w-4" />
                  <EyeSlashIcon v-else class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Confirm password</label>
              <div class="relative">
                <input v-model="passwordForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 pr-11 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
                <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700" @click="togglePassword('confirm')">
                  <EyeIcon v-if="!showConfirmPassword" class="h-4 w-4" />
                  <EyeSlashIcon v-else class="h-4 w-4" />
                </button>
              </div>
            </div>
            <button @click="submitPassword" class="rounded-2xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800" :disabled="savingPassword">
              {{ savingPassword ? 'Updating...' : 'Update password' }}
            </button>
          </div>
        </section>
      </div>

      <section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <div class="flex items-center gap-2">
            <div class="rounded-xl bg-sky-50 p-2 text-sky-700">
              <BuildingOfficeIcon class="h-4 w-4" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Company / Brand</h3>
          </div>
          <p class="mt-2 text-sm text-gray-500">Set the public company details shown across your workspace.</p>
        </div>

        <div class="mt-6 flex flex-col gap-6">
          <div class="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 sm:items-start">
            <div class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 shadow-sm">
              <img v-if="companyForm.logoUrl" :src="companyForm.logoUrl" alt="Company logo" class="h-full w-full object-cover" />
              <span v-else>Logo</span>
            </div>
            <label class="cursor-pointer rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <input type="file" accept="image/*" class="hidden" @change="handleLogoChange" />
              Upload logo
            </label>
          </div>

          <div class="space-y-4">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Company name</label>
              <input v-model="companyForm.companyName" type="text" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Support email</label>
              <input v-model="companyForm.supportEmail" type="email" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Support phone</label>
              <input v-model="companyForm.supportPhone" type="text" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Website URL</label>
              <input v-model="companyForm.websiteUrl" type="url" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Address</label>
              <textarea v-model="companyForm.address" rows="3" class="w-full rounded-2xl border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <button @click="submitCompany" class="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700" :disabled="savingCompany">
              {{ savingCompany ? 'Saving...' : 'Save company settings' }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingOfficeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const {
  profileForm,
  passwordForm,
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
} = useSettings()

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const initials = computed(() => {
  const username = profileForm.value.username || ''
  const email = profileForm.value.email || ''
  if (username) return username.charAt(0).toUpperCase()
  if (email) return email.charAt(0).toUpperCase()
  return 'U'
})

const togglePassword = (field: 'current' | 'new' | 'confirm') => {
  if (field === 'current') showCurrentPassword.value = !showCurrentPassword.value
  if (field === 'new') showNewPassword.value = !showNewPassword.value
  if (field === 'confirm') showConfirmPassword.value = !showConfirmPassword.value
}

const handleAvatarChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  await uploadAvatarImage(file)
  target.value = ''
}

const handleLogoChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  await uploadCompanyLogoImage(file)
  target.value = ''
}

const submitProfile = async () => {
  await updateProfileSettings()
}

const submitPassword = async () => {
  await updatePasswordSettings()
}

const submitCompany = async () => {
  await updateCompanySettings()
}

onMounted(() => {
  fetchProfileSettings()
  fetchCompanySettings()
})
</script>