// types/runtimeConfig.d.ts  (or wherever you put your custom types)
declare module '#app' {
  interface RuntimeConfigPublic {
    apiURL: string
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    apiURL: string
  }
}

export {} // makes it a module