import { seoConfig } from '~/config/seo.config'

export const useSeo = (options: {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string
} = {}) => {
  const title = options.title 
    ? `${options.title} - ${seoConfig.appName}`
    : seoConfig.title

  const description = options.description || seoConfig.description
  const image = options.image || seoConfig.ogImage
  const canonical = options.url || seoConfig.url

  useHead({
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      
      // Primary Meta Tags
      { name: 'title', content: title },
      { name: 'description', content: description },
      { name: 'keywords', content: options.keywords || seoConfig.keywords },
      { name: 'author', content: seoConfig.appName },
      { name: 'robots', content: 'index, follow' },
      
      // Open Graph / Facebook
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: seoConfig.appName },
      { property: 'og:locale', content: seoConfig.locale },
      
      // Twitter / X
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: canonical },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: options.image || seoConfig.twitterImage },
      
      // Additional
      { name: 'theme-color', content: seoConfig.themeColor },
      { name: 'application-name', content: seoConfig.appName },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
    link: [
      // Favicons (add your actual files)
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'canonical', href: canonical }
    ],
    script: [
      {
        type: 'application/ld+json',
        //children: JSON.stringify(seoConfig.schema)
      }
    ]
  })
}