<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
  
        <!-- Header -->
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Welcome back {{ appName }}! Here's your shipment overview.
          </p>
        </div>
  
        <!-- Loading State -->
        <div v-if="dashboardStore.pending" class="flex items-center justify-center py-16 sm:py-20">
          <svg class="animate-spin h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
  
        <template v-else>
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <!-- Total Shipments -->
            <div class="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs sm:text-sm font-medium text-gray-600">Total Shipments</p>
                  <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                    {{ dashboardStore.totalShipments }}
                  </p>
                </div>
                <div class="bg-blue-100 p-2.5 sm:p-3 rounded-full">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
            </div>
  
            <!-- Delivered -->
            <div class="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs sm:text-sm font-medium text-gray-600">Delivered</p>
                  <p class="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">
                    {{ dashboardStore.deliveredCount }}
                  </p>
                </div>
                <div class="bg-green-100 p-2.5 sm:p-3 rounded-full">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
  
            <!-- In Transit -->
            <div class="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs sm:text-sm font-medium text-gray-600">In Transit</p>
                  <p class="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 sm:mt-2">
                    {{ dashboardStore.inTransitCount }}
                  </p>
                </div>
                <div class="bg-blue-100 p-2.5 sm:p-3 rounded-full">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
  
            <!-- Today -->
            <div class="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs sm:text-sm font-medium text-gray-600">Today</p>
                  <p class="text-2xl sm:text-3xl font-bold text-orange-600 mt-1 sm:mt-2">
                    {{ dashboardStore.overview?.timePeriod?.today ?? 0 }}
                  </p>
                </div>
                <div class="bg-orange-100 p-2.5 sm:p-3 rounded-full">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Charts Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Shipments by Status</h3>
              <div class="h-64 sm:h-80">
                <ShipmentStatusChart :data="dashboardStore.statusBreakdown" />
              </div>
            </div>
  
            <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Shipments Over Time</h3>
              <div class="h-64 sm:h-80">
                <ShipmentTimeChart />
              </div>
            </div>
          </div>
  
          <!-- Country Chart -->
          <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
            <div class="h-64 sm:h-80">
              <ShipmentCountryChart />
            </div>
          </div>
  
          <!-- Recent Shipments Table -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900">Recent Shipments</h3>
            </div>
  
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                    <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                    <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Receiver</th>
                    <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Est. Delivery</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="shipment in dashboardStore.recentShipments"
                    :key="shipment._id"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span class="text-xs sm:text-sm font-mono font-medium text-gray-900">
                        {{ shipment.trackingId }}
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {{ shipment.sender?.name || 'N/A' }}
                    </td>
                    <td class="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                      {{ shipment.receiver?.name || 'N/A' }}
                    </td>
                    <td class="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span
                        :class="getStatusClass(shipment.status)"
                        class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {{ shipment.status }}
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                      {{ shipment.createdAt ? formatDate(shipment.createdAt) : 'N/A' }}
                    </td>
                    <td class="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                      {{ shipment.estimatedDelivery ? formatDate(shipment.estimatedDelivery) : 'N/A' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <!-- Empty State -->
            <div v-if="dashboardStore.recentShipments.length === 0" class="text-center py-10 sm:py-12">
              <svg class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p class="mt-2 text-sm text-gray-500">No shipments found</p>
            </div>
          </div>
        </template>
      </div>
    </div>
</template>

<script setup lang="ts">
    import { appName } from '../../utils/appName'
    import ShipmentStatusChart from '../charts/ShipmentStatusChart.vue'
    import ShipmentTimeChart from '../charts/ShipmentTimeChart.vue'
    import ShipmentCountryChart from '../charts/ShipmentCountryChart.vue'

    definePageMeta({ middleware: 'auth' })

    const dashboardStore = useDashboardStore()
    const { getDashboardOverview } = useDashboard()

    onMounted(async () => {
    await getDashboardOverview()
    })

    const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
    }

    const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
        'Delivered': 'bg-green-100 text-green-800',
        'InTransit': 'bg-blue-100 text-blue-800',
        'Registered': 'bg-gray-100 text-gray-800',
        'PickedUp': 'bg-indigo-100 text-indigo-800',
        'EnRoute': 'bg-purple-100 text-purple-800',
        'InCustoms': 'bg-yellow-100 text-yellow-800',
        'AtHub': 'bg-orange-100 text-orange-800',
        'OutForDelivery': 'bg-teal-100 text-teal-800',
        'Delayed': 'bg-red-100 text-red-800',
        'Cancelled': 'bg-gray-600 text-white',
        'Exception': 'bg-red-600 text-white',
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
    }
</script>