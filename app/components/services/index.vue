<template>
  <div class="min-h-screen pt-20 bg-white">
    <!-- Hero Section -->
    <section class="bg-green-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">Our Services</h1>
          <p class="text-xl text-green-50">
            Comprehensive logistics solutions tailored to your shipping needs
          </p>
        </div>
      </div>
    </section>

    <!-- Main Services -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p class="text-xl text-gray-600">End-to-end logistics solutions for businesses and individuals</p>
          </div>

          <div class="space-y-16">
            <!-- Service 1: International Shipping -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="order-2 md:order-1">
                <div class="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                  Global Reach
                </div>
                <h3 class="text-3xl font-bold text-gray-900 mb-4">International Shipping</h3>
                <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                  Ship your packages to over 150 countries worldwide with our reliable international 
                  shipping service. We handle customs clearance, documentation, and ensure your shipments 
                  arrive safely and on time.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Door-to-door delivery to 150+ countries</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Customs clearance assistance</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Real-time tracking and updates</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Insurance coverage available</span>
                  </li>
                </ul>
              </div>
              <div class="order-1 md:order-2">
                <NuxtImg
                  src="/images/service-international.jpg"
                  alt="International Shipping"
                  class="rounded-2xl shadow-2xl w-full h-100 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Service 2: Express Delivery -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <NuxtImg
                  src="/images/service-express.jpg"
                  alt="Express Delivery"
                  class="rounded-2xl shadow-2xl w-full h-100 object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                  Fast & Reliable
                </div>
                <h3 class="text-3xl font-bold text-gray-900 mb-4">Express Delivery</h3>
                <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                  Need it there fast? Our express delivery service ensures your urgent shipments 
                  reach their destination quickly. Same-day and next-day delivery options available 
                  in major cities worldwide.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Same-day delivery in select cities</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Next-day delivery guaranteed</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Priority handling and routing</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">SMS and email notifications</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Service 3: Freight Services -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="order-2 md:order-1">
                <div class="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                  Large Shipments
                </div>
                <h3 class="text-3xl font-bold text-gray-900 mb-4">Freight Services</h3>
                <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                  Moving large quantities or oversized items? Our freight services provide cost-effective 
                  solutions for air, sea, and land freight. From pallets to full container loads, we've got you covered.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Air, sea, and land freight options</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">LCL and FCL container shipping</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Warehousing and distribution</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Dedicated freight specialists</span>
                  </li>
                </ul>
              </div>
              <div class="order-1 md:order-2">
                <NuxtImg
                  src="/images/service-freight.png"
                  alt="Freight Services"
                  class="rounded-2xl shadow-2xl w-full h-100 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Service 4: E-commerce Fulfillment -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <NuxtImg
                  src="/images/service-ecommerce.jpg"
                  alt="E-commerce Fulfillment"
                  class="rounded-2xl shadow-2xl w-full h-100 object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                  For Online Sellers
                </div>
                <h3 class="text-3xl font-bold text-gray-900 mb-4">E-commerce Fulfillment</h3>
                <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                  Scale your online business with our comprehensive e-commerce fulfillment services. 
                  We handle storage, picking, packing, and shipping so you can focus on growing your business.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Inventory management and storage</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Order processing and fulfillment</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Returns management</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">Integration with major platforms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Services -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p class="text-xl text-gray-600">Extra value-added services to enhance your shipping experience</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Packaging -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Custom Packaging</h3>
              <p class="text-gray-600">
                Professional packaging services to ensure your items are protected during transit. 
                We provide materials and expertise for fragile and valuable items.
              </p>
            </div>

            <!-- Insurance -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Shipping Insurance</h3>
              <p class="text-gray-600">
                Protect your valuable shipments with comprehensive insurance coverage. 
                Peace of mind for high-value items and critical deliveries.
              </p>
            </div>

            <!-- Pickup -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Pickup Services</h3>
              <p class="text-gray-600">
                Schedule convenient pickups from your location. We come to you, saving you 
                time and making shipping hassle-free.
              </p>
            </div>

            <!-- Storage -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Warehousing</h3>
              <p class="text-gray-600">
                Secure storage facilities available for short and long-term needs. 
                Climate-controlled options for sensitive items.
              </p>
            </div>

            <!-- Tracking -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Advanced Tracking</h3>
              <p class="text-gray-600">
                Real-time GPS tracking and automated notifications keep you informed 
                every step of the way.
              </p>
            </div>

            <!-- Support -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p class="text-gray-600">
                Round-the-clock customer support to assist with any questions or concerns. 
                We're always here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing CTA -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto bg-green-600 rounded-3xl p-12 text-center text-white">
          <h2 class="text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p class="text-xl text-green-50 mb-8">
            Every business is unique. Contact us for a tailored logistics solution that fits your specific needs and budget.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/contact"
              class="px-8 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </NuxtLink>
            
            <a  href="tel:+1234567890"
              class="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors"
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
// definePageMeta({
//   layout: 'default'
// })

const appName = 'CourviaShip'

useSeoMeta({
  title: `Services - ${appName} Logistics Solutions`,
  description: `Explore ${appName}'s comprehensive logistics services including international shipping, express delivery, freight services, and e-commerce fulfillment.`
})
</script>