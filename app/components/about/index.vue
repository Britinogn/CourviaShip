<template>
  <div class="min-h-screen pt-20  bg-white">
    <!-- Hero Section -->
    <section class="bg-green-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">About {{ appName }}</h1>
          <p class="text-xl text-green-50">
            Your trusted partner in global logistics and shipping solutions
          </p>
        </div>
      </div>
    </section>

    <!-- Company Story -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <NuxtImg
                src="/images/about-company.jpg"
                alt="CourviaShip Warehouse"
                class="rounded-2xl shadow-2xl w-full h-125 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 class="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div class="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2015, {{ appName }} has grown from a small local courier service 
                  to a comprehensive global logistics provider. Our journey began with a simple 
                  mission: to make shipping easier, faster, and more reliable for everyone.
                </p>
                <p>
                  Today, we serve thousands of customers across 150+ countries, handling everything 
                  from small parcels to large freight shipments. Our commitment to excellence and 
                  customer satisfaction has made us a trusted name in the logistics industry.
                </p>
                <p>
                  We leverage cutting-edge technology and a dedicated team of logistics professionals 
                  to ensure your shipments arrive safely and on time, every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Mission -->
            <div class="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-green-600">
              <div class="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p class="text-gray-600 text-lg leading-relaxed">
                To provide exceptional logistics solutions that connect people and businesses 
                worldwide, delivering excellence through innovation, reliability, and customer-first service.
              </p>
            </div>

            <!-- Vision -->
            <div class="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-black">
              <div class="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p class="text-gray-600 text-lg leading-relaxed">
                To be the world's most trusted and innovative logistics partner, setting new 
                standards in shipping excellence and transforming the way goods move across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p class="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Reliability -->
            <div class="text-center p-8 hover:shadow-xl transition-shadow rounded-2xl border border-gray-100">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p class="text-gray-600">
                We deliver on our promises, ensuring your shipments arrive safely and on time, every single time.
              </p>
            </div>

            <!-- Innovation -->
            <div class="text-center p-8 hover:shadow-xl transition-shadow rounded-2xl border border-gray-100">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p class="text-gray-600">
                We embrace technology and creative solutions to continuously improve our services and exceed expectations.
              </p>
            </div>

            <!-- Integrity -->
            <div class="text-center p-8 hover:shadow-xl transition-shadow rounded-2xl border border-gray-100">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p class="text-gray-600">
                We operate with transparency and honesty, building trust through ethical business practices.
              </p>
            </div>

            <!-- Customer Focus -->
            <div class="text-center p-8 hover:shadow-xl transition-shadow rounded-2xl border border-gray-100">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Customer Focus</h3>
              <p class="text-gray-600">
                Your satisfaction is our priority. We listen, adapt, and go the extra mile to meet your needs.
              </p>
            </div>

            <!-- Excellence -->
            <div class="text-center p-8 hover:shadow-xl transition-shadow rounded-2xl border border-gray-100">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p class="text-gray-600">
                We strive for perfection in every shipment, setting high standards and consistently delivering quality.
              </p>
            </div>

            <!-- Sustainability -->
            <div class="text-center p-8 hover:shadow-xl transition-shadow rounded-2xl border border-gray-100">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p class="text-gray-600">
                We're committed to eco-friendly practices, reducing our carbon footprint for a greener future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section (Optional) -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p class="text-xl text-gray-600">Meet the people driving {{ appName }} forward</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Team Member 1 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <NuxtImg
                src="/images/team-1.jpg"
                alt="CEO"
                class="w-full h-80 object-cover"
                loading="lazy"
              />
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-1">John Anderson</h3>
                <p class="text-green-600 font-semibold mb-3">Chief Executive Officer</p>
                <p class="text-gray-600 text-sm">
                  Leading {{ appName }} with 20+ years of logistics expertise and a vision for innovation.
                </p>
              </div>
            </div>

            <!-- Team Member 2 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <NuxtImg
                src="/images/team-2.jpg"
                alt="COO"
                class="w-full h-80 object-cover"
                loading="lazy"
              />
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-1">Sarah Mitchell</h3>
                <p class="text-green-600 font-semibold mb-3">Chief Operations Officer</p>
                <p class="text-gray-600 text-sm">
                  Ensuring seamless operations and exceptional service delivery across all channels.
                </p>
              </div>
            </div>

            <!-- Team Member 3 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <NuxtImg
                src="/images/team-3.jpg"
                alt="CTO"
                class="w-full h-80 object-cover"
                loading="lazy"
              />
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-1">Michael Chen</h3>
                <p class="text-green-600 font-semibold mb-3">Chief Technology Officer</p>
                <p class="text-gray-600 text-sm">
                  Driving digital transformation and building cutting-edge logistics technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-green-600">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h2 class="text-4xl font-bold mb-6">Ready to Ship with {{ appName }}?</h2>
          <p class="text-xl text-green-50 mb-8">
            Join thousands of satisfied customers who trust us with their logistics needs.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/auth/signup"
              class="px-8 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </NuxtLink>
            <NuxtLink
              to="/tracking"
              class="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors"
            >
              Track Shipment
            </NuxtLink>
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
  title: `About ${appName} - Global Logistics & Shipping Solutions`,
  description: `Learn about ${appName}'s mission, vision, and commitment to excellence in global logistics and shipping services.`
})
</script>