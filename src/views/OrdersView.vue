<template>
  <NavComponent />
  <div class="pt-16 xl:pt-8 flex h-screen w-full items-center justify-center">
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
  </div>
</template>

<script setup>
import NavComponent from '@/components/NavComponent.vue'
</script>

<style scoped>
</style>