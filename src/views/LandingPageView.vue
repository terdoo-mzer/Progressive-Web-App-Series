<template>
  <NavComponent />
  <section class="h-full">
    <div class="rounded-2xl bg-indigo-50 overflow-hidden py-16 xl:py-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-14 items-center lg:grid-cols-12 lg:gap32">
          <div class="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:-mx-0">
            <!-- <div class="flex items-center text-sm font-medium text-gray-500 justify-center lg:justify-start">
                            <span class="bg-indigo-600 py-1 px-3 rounded-2xl text-xs font-medium text-white mr-3 ">#1</span>
                            Investment app
                        </div> -->
            <h1
              class="py-8 text-center text-gray-900 font-bold font-manrope text-5xl lg:text-left leading-[70px]"
            >
              The new standard for <span class="text-indigo-600">Modern investor</span>
            </h1>
            <p class="text-gray-500 text-lg text-center lg:text-left">
              Re-inventing your shopping experience!
            </p>
            <div
              class="relative p-1.5 my-10 flex items-center gap-y-4 h-auto md:h-16 flex-col md:flex-row justify-between rounded-full md:shadow-[0px 15px 30px -4px rgba(16, 24, 40, 0.03)] border border-transparent md:bg-white transition-all duration-500 hover:border-indigo-600 focus-within:border-indigo-600"
            >
              <button
                @click.prevent="installApp"
                ref="installBtn"
                hidden
                class="bg-indigo-600 rounded-full py-3 px-7 text-base font-semibold text-white hover:bg-indigo-700 cursor-pointer transition-all duration-500 md:w-fit w-full"
              >
                Install The App
              </button>
            </div>
          </div>
          <div class="w-full xl:col-span-7 lg:col-span-6 block">
            <div class="w-full sm:w-auto lg:w-[60.8125rem] xl:ml-16">
              <img
                src="../assets/shop.jpg"
                alt="Dashboard image"
                class="rounded-l-3xl object-cover w-full lg:h"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, useTemplateRef } from 'vue'
import NavComponent from '@/components/NavComponent.vue'

const deferredPrompt = ref(null)

const installButton = useTemplateRef('installBtn')

const detectBeforeInstallPrompt = (e) => {
  deferredPrompt.value = e
  installButton.value.removeAttribute('hidden')
  console.log('✅ BeforeInstallPromptEvent fired')
}

const installApp = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  deferredPrompt.value = null
  if (outcome === 'accepted') {
    console.log('😀 User accepted the install prompt.', true)
  } else if (outcome === 'dismissed') {
    console.log('😟 User dismissed the install prompt')
  }

  installButton.value.setAttribute('hidden', '')
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', detectBeforeInstallPrompt)
})
</script>

<style scoped>
</style>