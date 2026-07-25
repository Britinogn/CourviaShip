<template>
    <div>
        <ClientOnly>
            <LayoutsNavbar />
            <slot />  
            <LayoutsFooter />
        </ClientOnly>
    </div>
</template>


<!-- <template>
  <div>
    <Navbar />
    <main class="pt-20 min-h-screen">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">

</script> -->

<script setup lang="ts">
import { useSeo } from '~/composables/useSeo'
import { useSettings } from '~/composables/useSettings'

useSeo() // applies global defaults

const { fetchPublicCompanySettings } = useSettings()

onMounted(() => {
  fetchPublicCompanySettings()
})
</script>