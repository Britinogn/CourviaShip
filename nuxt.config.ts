import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  typescript: {
    typeCheck: true,
  },

  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['destructive-strait.outray.app'],
      watch: {
        usePolling: true,
      },
    },
  },

  modules: ["@pinia/nuxt", "@nuxt/image"],

  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:5000/api",
      mediaBaseURL: process.env.NUXT_PUBLIC_MEDIA_BASE || "http://localhost:5000",
      // tawkPropertyId: process.env.NUXT_PUBLIC_TAWK_PROPERTY_ID || "",
      // tawkWidgetId: process.env.NUXT_PUBLIC_TAWK_WIDGET_ID || "",
    },
  },
});
