// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";


//const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://rest-api-go-bnnn.onrender.com'
const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000/api'


export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  typescript: {
    typeCheck: true,
  },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss(),],
    server:{
      watch:{
        usePolling:true
      }
    }
  },

  modules:['@pinia/nuxt', '@nuxt/image'],

  runtimeConfig:{
    public:{
      baseURL: API_BASE_URL
    }
  },

  app:{
    head:{

    }
  }
});