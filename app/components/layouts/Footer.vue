<!-- components/Footer.vue -->
<template>
    <footer class="bg-black text-gray-400 border-t border-gray-800">
        <div class="container mx-auto px-6 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
                <!-- Brand & Description -->
                <div>
                <h3 class="text-white text-2xl font-bold mb-4">{{ appName }}</h3>
                <p class="text-sm leading-relaxed">
                    Reliable, fast, and secure logistics solutions worldwide. We deliver what matters.
                </p>
                </div>

                <!-- Quick Links -->
                <div>
                <h4 class="text-white text-lg font-semibold mb-6">Quick Links</h4>
                <ul class="space-y-3 text-sm">
                    <li><NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink></li>
                    <li><NuxtLink to="/about" class="hover:text-white transition-colors">About Us</NuxtLink></li>
                    <li><NuxtLink to="/services" class="hover:text-white transition-colors">Services</NuxtLink></li>
                    <li><NuxtLink to="/tracking" class="hover:text-white transition-colors">Track Shipment</NuxtLink></li>
                </ul>
                </div>

                <!-- Contact Info -->
                <div>
                <h4 class="text-white text-lg font-semibold mb-6">Contact</h4>
                <ul class="space-y-3 text-sm">
                    <li>Email: support@{{ appName.toLowerCase() }}.com</li>
                    <li>Phone: +234 000 000 0000</li>
                    <li>Lagos, Nigeria</li>
                </ul>
                </div>

                <!-- Social & Copyright -->
                <div>
                <h4 class="text-white text-lg font-semibold mb-6">Follow Us</h4>
                <div class="flex space-x-5 mb-8">
                    <a href="#" class="hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="#" class="hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.225 0 2.92 0 7.278.014 8.558 0 8.966 0 12c0 3.034.014 3.442.072 4.722C.225 21.305 2.92 24 7.278 24c1.28.014 1.688.072 4.722.072 3.034 0 3.442-.014 4.722-.072C21.305 23.775 24 21.08 24 16.722c.014-1.28.072-1.688.072-4.722 0-3.034-.014-3.442-.072-4.722C23.775 2.695 21.08 0 16.722 0 15.442 0 15.034.014 12 .014z"/></svg>
                    </a>
                </div>

                <p class="text-sm">
                    © {{ new Date().getFullYear() }} {{ appName }}. All rights reserved.
                </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const appName = 'CourviaShip' // or make it dynamic
</script>