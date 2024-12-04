<template>
  <NavComponent />
  <section class="pt-16 xl:pt-8">
    <div class="flex flex-col h-screen w-full items-center justify-center">
      <router-link
        to="/dashboard/scan"
        @click.prevent="openScanner"
        class="flex items-center justify-center px-6 py-3 mb-4 transition-colors duration-300 transform border rounded-lg text-white bg-indigo-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffff"
        >
          <path
            d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80ZM480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-120Z"
          />
        </svg>

        <span class="mx-2">Start Shoping</span>
      </router-link>
      <div class="w-96 rounded px-6 pt-8 shadow-md">
        <div class="flex flex-col justify-center items-center gap-2">
          <h4 class="text-xl font-semibold">Receipts</h4>
        </div>
        <div class="flex flex-col gap-3 pb-6 pt-2 text-xs">
          <table class="w-full text-left">
            <thead>
              <tr class="flex text-lg">
                <th class="w-full py-2">Receipt No.:</th>
                <th class="min-w-[44px] py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr class="flex text-lg">
                <td class="flex-1 py-1">#12000</td>
                <td class="min-w-[44px]">12-12-2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ScannerComponent :showScanner="showScanner" @closeScanner="handleCloseScanner" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

import NavComponent from '@/components/NavComponent.vue'
import ScannerComponent from '@/components/ScannerComponent.vue'

const showScanner = ref(false)

const openScanner = () => {
  showScanner.value = true
}

const handleCloseScanner = (val) => {
  showScanner.value = val
}
</script>

<style lang="scss" scoped>
</style>