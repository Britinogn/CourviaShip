<template>
  <div class="min-h-screen pt-20 bg-gray-50">
    <!-- Animated Background Pattern -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative bg-green-600 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/20 mb-4">
            <span class="text-sm font-bold text-white uppercase tracking-wide">Est. 2015</span>
          </div>
          <h1 class="text-6xl md:text-7xl font-bold mb-6 leading-tight">About {{ appName }}</h1>
          <p class="text-xl md:text-2xl text-green-50 font-light max-w-2xl mx-auto leading-relaxed">
            Your trusted partner in global logistics and shipping solutions
          </p>
        </div>
      </div>
    </section>

    <!-- Company Story -->
    <section class="py-24 bg-white relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div class="animate-slide-up">
              <div class="relative group">
                <div class="absolute -inset-4 bg-green-600/10 rounded-3xl blur-xl group-hover:bg-green-600/20 transition-all duration-500"></div>
                <NuxtImg
                  src="/images/about-company.jpg"
                  alt="CourviaShip Warehouse"
                  class="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover border-4 border-white group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
            <div class="space-y-6 animate-fade-in" style="animation-delay: 0.2s;">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200">
                <span class="text-sm font-bold text-green-700 uppercase tracking-wide">Our Journey</span>
              </div>
              <h2 class="text-5xl font-bold text-gray-900">Our Story</h2>
              <div class="space-y-5 text-gray-600 text-lg leading-relaxed">
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
              <div class="grid grid-cols-3 gap-6 pt-6">
                <div class="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div class="text-3xl font-bold text-green-600 mb-1">150+</div>
                  <div class="text-sm text-gray-600 font-semibold">Countries</div>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div class="text-3xl font-bold text-green-600 mb-1">10k+</div>
                  <div class="text-sm text-gray-600 font-semibold">Customers</div>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div class="text-3xl font-bold text-green-600 mb-1">99.9%</div>
                  <div class="text-sm text-gray-600 font-semibold">On-Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-24 bg-gray-50 relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Mission -->
            <div class="group bg-white p-12 rounded-3xl shadow-xl border-t-4 border-green-600 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 animate-slide-up">
              <div class="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p class="text-gray-600 text-lg leading-relaxed">
                To provide exceptional logistics solutions that connect people and businesses 
                worldwide, delivering excellence through innovation, reliability, and customer-first service.
              </p>
            </div>

            <!-- Vision -->
            <div class="group bg-white p-12 rounded-3xl shadow-xl border-t-4 border-black hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 animate-slide-up" style="animation-delay: 0.1s;">
              <div class="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
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
    <section class="py-24 bg-white relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20 space-y-4 animate-fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200">
              <span class="text-sm font-bold text-green-700 uppercase tracking-wide">What Drives Us</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-bold text-gray-900">Our Core Values</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Reliability -->
            <div class="group text-center p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl border border-gray-200 hover:border-green-200 animate-slide-up">
              <div class="relative inline-block mb-8">
                <div class="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full border-4 border-white"></div>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Reliability</h3>
              <p class="text-gray-600 leading-relaxed">
                We deliver on our promises, ensuring your shipments arrive safely and on time, every single time.
              </p>
            </div>

            <!-- Innovation -->
            <div class="group text-center p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl border border-gray-200 hover:border-green-200 animate-slide-up" style="animation-delay: 0.1s;">
              <div class="relative inline-block mb-8">
                <div class="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full border-4 border-white"></div>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p class="text-gray-600 leading-relaxed">
                We embrace technology and creative solutions to continuously improve our services and exceed expectations.
              </p>
            </div>

            <!-- Integrity -->
            <div class="group text-center p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl border border-gray-200 hover:border-green-200 animate-slide-up" style="animation-delay: 0.2s;">
              <div class="relative inline-block mb-8">
                <div class="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full border-4 border-white"></div>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Integrity</h3>
              <p class="text-gray-600 leading-relaxed">
                We operate with transparency and honesty, building trust through ethical business practices.
              </p>
            </div>

            <!-- Customer Focus -->
            <div class="group text-center p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl border border-gray-200 hover:border-green-200 animate-slide-up" style="animation-delay: 0.3s;">
              <div class="relative inline-block mb-8">
                <div class="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full border-4 border-white"></div>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Customer Focus</h3>
              <p class="text-gray-600 leading-relaxed">
                Your satisfaction is our priority. We listen, adapt, and go the extra mile to meet your needs.
              </p>
            </div>

            <!-- Excellence -->
            <div class="group text-center p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl border border-gray-200 hover:border-green-200 animate-slide-up" style="animation-delay: 0.4s;">
              <div class="relative inline-block mb-8">
                <div class="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full border-4 border-white"></div>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p class="text-gray-600 leading-relaxed">
                We strive for perfection in every shipment, setting high standards and consistently delivering quality.
              </p>
            </div>

            <!-- Sustainability -->
            <div class="group text-center p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl border border-gray-200 hover:border-green-200 animate-slide-up" style="animation-delay: 0.5s;">
              <div class="relative inline-block mb-8">
                <div class="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full border-4 border-white"></div>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Sustainability</h3>
              <p class="text-gray-600 leading-relaxed">
                We're committed to eco-friendly practices, reducing our carbon footprint for a greener future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-24 bg-gray-50 relative z-10">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20 space-y-4 animate-fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200">
              <span class="text-sm font-bold text-green-700 uppercase tracking-wide">Leadership</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-bold text-gray-900">Our Leadership Team</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">Meet the people driving {{ appName }} forward</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Team Member 1 -->
            <div class="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-slide-up">
              <div class="relative overflow-hidden h-96">
                <NuxtImg
                  src="/images/team-1.jpg"
                  alt="CEO"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-8 text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">John Anderson</h3>
                <p class="text-green-600 font-bold mb-4">Chief Executive Officer</p>
                <p class="text-gray-600 leading-relaxed">
                  Leading {{ appName }} with 20+ years of logistics expertise and a vision for innovation.
                </p>
              </div>
            </div>

            <!-- Team Member 2 -->
            <div class="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-slide-up" style="animation-delay: 0.1s;">
              <div class="relative overflow-hidden h-96">
                <NuxtImg
                  src="/images/team-2.jpg"
                  alt="COO"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-8 text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Sarah Mitchell</h3>
                <p class="text-green-600 font-bold mb-4">Chief Operations Officer</p>
                <p class="text-gray-600 leading-relaxed">
                  Ensuring seamless operations and exceptional service delivery across all channels.
                </p>
              </div>
            </div>

            <!-- Team Member 3 -->
            <div class="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-slide-up" style="animation-delay: 0.2s;">
              <div class="relative overflow-hidden h-96">
                <NuxtImg
                  src="/images/team-3.jpg"
                  alt="CTO"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-8 text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Michael Chen</h3>
                <p class="text-green-600 font-bold mb-4">Chief Technology Officer</p>
                <p class="text-gray-600 leading-relaxed">
                  Driving digital transformation and building cutting-edge logistics technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-24 bg-green-600 overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center text-white space-y-8 animate-fade-in">
          <h2 class="text-5xl md:text-6xl font-bold leading-tight">Ready to Ship with {{ appName }}?</h2>
          <p class="text-xl md:text-2xl text-green-50 font-light max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us with their logistics needs.
          </p>
          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <NuxtLink
              to="/auth/signup"
              class="group inline-flex items-center gap-3 px-10 py-5 bg-white text-green-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <span>Get Started</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/tracking"
              class="group inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
const appName = 'CourviaShip'

useSeoMeta({
  title: `About ${appName} - Global Logistics & Shipping Solutions`,
  description: `Learn about ${appName}'s mission, vision, and commitment to excellence in global logistics and shipping services.`
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}
</style>