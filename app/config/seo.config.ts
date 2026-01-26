// config/seo.config.ts - Create this file in your project root

export const seoConfig = {
  title: 'Bookify - Discover & Book Amazing Events Near You',
  description: 'Find and book tickets to concerts, conferences, workshops, and local events. Bookify makes event discovery and booking seamless with secure payments and instant confirmation.',
  keywords: 'event booking, book events, concert tickets, conference registration, workshop booking, event discovery, ticket booking platform, local events, event management',
  url: 'https://bookify.pxxl.click/',
  siteName: 'Bookify',
  locale: 'en',
  themeColor: '#6366f1',
  
  // Social images
  ogImage: 'https://bookify.pxxl.click/og-image.jpg',
  twitterImage: 'https://bookify.pxxl.click/twitter-image.jpg',
  
  // JSON-LD Schema
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bookify',
    url: 'https://bookify.pxxl.click/',
    description: 'Discover and book amazing events near you. From concerts to conferences, find the perfect event.',
    applicationCategory: 'EventApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    }
  }
}

export const headConfig = {
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    
    // Primary Meta Tags
    { name: 'title', content: seoConfig.title },
    { name: 'description', content: seoConfig.description },
    { name: 'keywords', content: seoConfig.keywords },
    { name: 'author', content: seoConfig.siteName },
    { name: 'robots', content: 'index, follow' },
    
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: seoConfig.url },
    { property: 'og:title', content: seoConfig.title },
    { property: 'og:description', content: seoConfig.description },
    { property: 'og:image', content: seoConfig.ogImage },
    { property: 'og:site_name', content: seoConfig.siteName },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: seoConfig.url },
    { name: 'twitter:title', content: seoConfig.title },
    { name: 'twitter:description', content: seoConfig.description },
    { name: 'twitter:image', content: seoConfig.twitterImage },
    
    // Additional Meta Tags
    { name: 'theme-color', content: seoConfig.themeColor },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'application-name', content: seoConfig.siteName },
    { name: 'mobile-web-app-capable', content: 'yes' },
  ],
  link: [
    // Favicons
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    
    // Manifest
    //{ rel: 'manifest', href: '/site.webmanifest' },
    
    // Canonical
    { rel: 'canonical', href: seoConfig.url }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(seoConfig.schema)
    }
  ]
}

// ============================================
// BONUS: Composable for page-specific SEO
// composables/useSeo.ts
// ============================================

// import { seoConfig } from '~/config/seo.config'

export const useSeo = (options: {
  title?: string
  description?: string
  image?: string
  url?: string
}) => {
  const title = options.title 
    ? `${options.title} - ${seoConfig.siteName}` 
    : seoConfig.title

  useHead({
    title,
    meta: [
      { name: 'description', content: options.description || seoConfig.description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: options.description || seoConfig.description },
      { property: 'og:image', content: options.image || seoConfig.ogImage },
      { property: 'og:url', content: options.url || seoConfig.url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: options.description || seoConfig.description },
      { name: 'twitter:image', content: options.image || seoConfig.twitterImage },
    ],
    link: [
      { rel: 'canonical', href: options.url || seoConfig.url }
    ]
  })
}
