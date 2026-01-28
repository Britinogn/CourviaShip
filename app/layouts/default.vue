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

useSeo() // applies global defaults
</script>