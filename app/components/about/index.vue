<template>
  <div class="min-h-screen pt-16 sm:pt-20 bg-gray-50">
    <!-- Background Pattern -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative bg-green-600 text-white py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">
            <span class="text-xs font-bold text-white uppercase tracking-wide">Est. 2015</span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            About {{ appName }}
          </h1>
          <p class="text-sm sm:text-base md:text-lg text-green-50 max-w-xl mx-auto leading-relaxed">
            Your trusted partner in global logistics and shipping solutions
          </p>
        </div>
      </div>
    </section>

    <!-- Company Story -->
    <section class="py-12 sm:py-16 lg:py-20 bg-white relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div class="relative group">
                <div class="absolute -inset-3 bg-green-600/10 rounded-2xl blur-xl group-hover:bg-green-600/20 transition-all duration-500"></div>
                <NuxtImg
                  src="/images/about-company.jpg"
                  alt="CourviaShip Warehouse"
                  class="relative rounded-2xl shadow-xl w-full h-64 sm:h-80 lg:h-[420px] object-cover border-4 border-white group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            <div class="space-y-4 sm:space-y-5">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full border border-green-200">
                <span class="text-xs font-bold text-green-700 uppercase tracking-wide">Our Journey</span>
              </div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Our Story</h2>
              <div class="space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">
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

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
                <div class="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div class="text-xl sm:text-2xl font-bold text-green-600 mb-0.5">150+</div>
                  <div class="text-xs text-gray-600 font-semibold">Countries</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div class="text-xl sm:text-2xl font-bold text-green-600 mb-0.5">10k+</div>
                  <div class="text-xs text-gray-600 font-semibold">Customers</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div class="text-xl sm:text-2xl font-bold text-green-600 mb-0.5">99.9%</div>
                  <div class="text-xs text-gray-600 font-semibold">On-Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-12 sm:py-16 lg:py-20 bg-gray-50 relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <!-- Mission -->
            <div class="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-green-600 hover:shadow-xl transition-all duration-300">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                To provide exceptional logistics solutions that connect people and businesses 
                worldwide, delivering excellence through innovation, reliability, and customer-first service.
              </p>
            </div>

            <!-- Vision -->
            <div class="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-black hover:shadow-xl transition-all duration-300">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                To be the world's most trusted and innovative logistics partner, setting new 
                standards in shipping excellence and transforming the way goods move across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-12 sm:py-16 lg:py-20 bg-white relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-10 sm:mb-12 space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full border border-green-200">
              <span class="text-xs font-bold text-green-700 uppercase tracking-wide">What Drives Us</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Our Core Values</h2>
            <p class="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <div
              v-for="(value, i) in coreValues"
              :key="i"
              class="group text-center p-6 sm:p-7 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200 hover:border-green-200"
            >
              <div class="relative inline-block mb-5">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                  <component :is="value.icon" class="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                </div>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-2">{{ value.title }}</h3>
              <p class="text-gray-600 text-sm leading-relaxed">{{ value.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-12 sm:py-16 lg:py-20 bg-gray-50 relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-10 sm:mb-12 space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full border border-green-200">
              <span class="text-xs font-bold text-green-700 uppercase tracking-wide">Leadership</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Our Leadership Team</h2>
            <p class="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Meet the people driving {{ appName }} forward</p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <div
              v-for="(member, i) in team"
              :key="i"
              class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div class="relative overflow-hidden h-56 sm:h-64">
                <NuxtImg
                  :src="member.image"
                  :alt="member.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div class="p-5 sm:p-6 text-center">
                <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-1">{{ member.name }}</h3>
                <p class="text-green-600 font-semibold text-sm mb-2">{{ member.role }}</p>
                <p class="text-gray-600 text-sm leading-relaxed">{{ member.bio }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-12 sm:py-16 lg:py-20 bg-green-600 overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center text-white space-y-5 sm:space-y-6">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Ready to Ship with {{ appName }}?
          </h2>
          <p class="text-sm sm:text-base text-green-50 max-w-xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us with their logistics needs.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <NuxtLink
              to="/auth/signup"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all shadow-lg"
            >
              <span>Get Started</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/tracking"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold text-sm hover:bg-gray-900 transition-all shadow-lg"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <span>Track Shipment</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

const appName = 'CourviaShip'

const icon = (d: string) =>
  h('svg', { class: 'w-7 h-7 sm:w-8 sm:h-8 text-green-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d })
  ])

const coreValues = [
  {
    title: 'Reliability',
    desc: 'We deliver on our promises, ensuring your shipments arrive safely and on time, every single time.',
    icon: { render: () => icon('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z') }
  },
  {
    title: 'Innovation',
    desc: 'We embrace technology and creative solutions to continuously improve our services and exceed expectations.',
    icon: { render: () => icon('M13 10V3L4 14h7v7l9-11h-7z') }
  },
  {
    title: 'Integrity',
    desc: 'We operate with transparency and honesty, building trust through ethical business practices.',
    icon: { render: () => icon('M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z') }
  },
  {
    title: 'Customer Focus',
    desc: 'Your satisfaction is our priority. We listen, adapt, and go the extra mile to meet your needs.',
    icon: { render: () => icon('M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z') }
  },
  {
    title: 'Excellence',
    desc: 'We strive for perfection in every shipment, setting high standards and consistently delivering quality.',
    icon: { render: () => icon('M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z') }
  },
  {
    title: 'Sustainability',
    desc: "We're committed to eco-friendly practices, reducing our carbon footprint for a greener future.",
    icon: { render: () => icon('M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z') }
  },
]

const team = [
  {
    name: 'John Anderson',
    role: 'Chief Executive Officer',
    bio: `Leading ${appName} with 20+ years of logistics expertise and a vision for innovation.`,
    image: '/images/team-1.jpg'
  },
  {
    name: 'Sarah Mitchell',
    role: 'Chief Operations Officer',
    bio: 'Ensuring seamless operations and exceptional service delivery across all channels.',
    image: '/images/team-2.jpg'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    bio: 'Driving digital transformation and building cutting-edge logistics technology.',
    image: '/images/team-3.jpg'
  },
]

useSeoMeta({
  title: `About ${appName} - Global Logistics & Shipping Solutions`,
  description: `Learn about ${appName}'s mission, vision, and commitment to excellence in global logistics and shipping services.`
})
</script>