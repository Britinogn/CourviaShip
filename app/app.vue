<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->

<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
      <ToastContainer />
      <GlobalLoader />
    </NuxtLayout>
  </ClientOnly>
</template>

