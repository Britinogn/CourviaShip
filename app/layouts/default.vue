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