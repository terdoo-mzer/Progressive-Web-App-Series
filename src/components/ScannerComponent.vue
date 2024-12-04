<template>
  <div v-if="showScanner" @click.prevent="closeScanner">Scanner</div>
</template>

<script setup>
const props = defineProps({
  showScanner: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['closeScanner'])

const closeScanner = () => {
  emits('closeScanner', false)
}

// Scanner
</script>

<style lang="scss" scoped>
</style>