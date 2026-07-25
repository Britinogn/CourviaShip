<template>
  <div class="min-h-screen pt-16 sm:pt-20 bg-white">
    <!-- Hero Section -->
    <section class="bg-green-600 text-white py-12 sm:py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
          <p class="text-sm sm:text-base text-green-50">
            Comprehensive logistics solutions tailored to your shipping needs
          </p>
        </div>
      </div>
    </section>

    <!-- Main Services -->
    <section class="py-12 sm:py-16 lg:py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-10 sm:mb-12">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What We Offer</h2>
            <p class="text-sm sm:text-base text-gray-600">End-to-end logistics solutions for businesses and individuals</p>
          </div>

          <div class="space-y-12 sm:space-y-16">
            <!-- Service 1: International Shipping -->
            <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div class="order-2 md:order-1">
                <div class="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-3">
                  Global Reach
                </div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">International Shipping</h3>
                <p class="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">
                  Ship your packages to over 150 countries worldwide with our reliable international 
                  shipping service. We handle customs clearance, documentation, and ensure your shipments 
                  arrive safely and on time.
                </p>
                <ul class="space-y-2.5">
                  <li v-for="item in internationalFeatures" :key="item" class="flex items-start gap-2.5">
                    <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700 text-sm">{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div class="order-1 md:order-2">
                <NuxtImg
                  src="/images/service-international.jpg"
                  alt="International Shipping"
                  class="rounded-2xl shadow-xl w-full h-56 sm:h-72 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Service 2: Express Delivery -->
            <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <NuxtImg
                  src="/images/service-express.jpg"
                  alt="Express Delivery"
                  class="rounded-2xl shadow-xl w-full h-56 sm:h-72 object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-3">
                  Fast & Reliable
                </div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Express Delivery</h3>
                <p class="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">
                  Need it there fast? Our express delivery service ensures your urgent shipments 
                  reach their destination quickly. Same-day and next-day delivery options available 
                  in major cities worldwide.
                </p>
                <ul class="space-y-2.5">
                  <li v-for="item in expressFeatures" :key="item" class="flex items-start gap-2.5">
                    <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700 text-sm">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Service 3: Freight Services -->
            <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div class="order-2 md:order-1">
                <div class="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-3">
                  Large Shipments
                </div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Freight Services</h3>
                <p class="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">
                  Moving large quantities or oversized items? Our freight services provide cost-effective 
                  solutions for air, sea, and land freight. From pallets to full container loads, we've got you covered.
                </p>
                <ul class="space-y-2.5">
                  <li v-for="item in freightFeatures" :key="item" class="flex items-start gap-2.5">
                    <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700 text-sm">{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div class="order-1 md:order-2">
                <NuxtImg
                  src="/images/service-freight.png"
                  alt="Freight Services"
                  class="rounded-2xl shadow-xl w-full h-56 sm:h-72 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Service 4: E-commerce Fulfillment -->
            <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <NuxtImg
                  src="/images/service-ecommerce.jpg"
                  alt="E-commerce Fulfillment"
                  class="rounded-2xl shadow-xl w-full h-56 sm:h-72 object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-3">
                  For Online Sellers
                </div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">E-commerce Fulfillment</h3>
                <p class="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">
                  Scale your online business with our comprehensive e-commerce fulfillment services. 
                  We handle storage, picking, packing, and shipping so you can focus on growing your business.
                </p>
                <ul class="space-y-2.5">
                  <li v-for="item in ecommerceFeatures" :key="item" class="flex items-start gap-2.5">
                    <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700 text-sm">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Services -->
    <section class="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-10 sm:mb-12">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Additional Services</h2>
            <p class="text-sm sm:text-base text-gray-600">Extra value-added services to enhance your shipping experience</p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <div
              v-for="service in additionalServices"
              :key="service.title"
              class="bg-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div class="w-11 h-11 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <component :is="service.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-2">{{ service.title }}</h3>
              <p class="text-gray-600 text-sm leading-relaxed">{{ service.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing CTA -->
    <section class="py-12 sm:py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto bg-green-600 rounded-2xl p-6 sm:p-10 text-center text-white">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">Need a Custom Solution?</h2>
          <p class="text-sm sm:text-base text-green-50 mb-6">
            Every business is unique. Contact us for a tailored logistics solution that fits your specific needs and budget.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <NuxtLink
              to="/contact"
              class="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </NuxtLink>
            <a
              href="tel:+1234567890"
              class="px-6 py-3 bg-black text-white rounded-xl font-semibold text-sm hover:bg-gray-900 transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

import {siteName} from '../../utils/siteName'


const internationalFeatures = [
  'Door-to-door delivery to 150+ countries',
  'Customs clearance assistance',
  'Real-time tracking and updates',
  'Insurance coverage available',
]

const expressFeatures = [
  'Same-day delivery in select cities',
  'Next-day delivery guaranteed',
  'Priority handling and routing',
  'SMS and email notifications',
]

const freightFeatures = [
  'Air, sea, and land freight options',
  'LCL and FCL container shipping',
  'Warehousing and distribution',
  'Dedicated freight specialists',
]

const ecommerceFeatures = [
  'Inventory management and storage',
  'Order processing and fulfillment',
  'Returns management',
  'Integration with major platforms',
]

const svgIcon = (d: string) =>
  h('svg', { class: 'w-5 h-5 sm:w-6 sm:h-6 text-green-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d })
  ])

const additionalServices = [
  {
    title: 'Custom Packaging',
    desc: 'Professional packaging services to ensure your items are protected during transit. We provide materials and expertise for fragile and valuable items.',
    icon: { render: () => svgIcon('M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4') }
  },
  {
    title: 'Shipping Insurance',
    desc: 'Protect your valuable shipments with comprehensive insurance coverage. Peace of mind for high-value items and critical deliveries.',
    icon: { render: () => svgIcon('M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z') }
  },
  {
    title: 'Pickup Services',
    desc: 'Schedule convenient pickups from your location. We come to you, saving you time and making shipping hassle-free.',
    icon: { render: () => svgIcon('M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z') }
  },
  {
    title: 'Warehousing',
    desc: 'Secure storage facilities available for short and long-term needs. Climate-controlled options for sensitive items.',
    icon: { render: () => svgIcon('M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4') }
  },
  {
    title: 'Advanced Tracking',
    desc: 'Real-time GPS tracking and automated notifications keep you informed every step of the way.',
    icon: { render: () => svgIcon('M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z') }
  },
  {
    title: '24/7 Support',
    desc: "Round-the-clock customer support to assist with any questions or concerns. We're always here to help.",
    icon: { render: () => svgIcon('M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z') }
  },
]

useSeoMeta({
  title: `Services - ${siteName} Logistics Solutions`,
  description: `Explore ${siteName}'s comprehensive logistics services including international shipping, express delivery, freight services, and e-commerce fulfillment.`
})
</script>