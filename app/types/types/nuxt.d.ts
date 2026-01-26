// types/runtimeConfig.d.ts  (or wherever you put your custom types)
declare module '#app' {
  interface RuntimeConfigPublic {
    baseURL: string
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    baseURL: string
  }
}

export {} // makes it a module