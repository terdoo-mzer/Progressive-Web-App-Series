<template>
  <div>
    <div class="camera-wrapper">
      <video ref="video" autoplay muted playsinline></video>
      <!-- Visual overlay for center region -->
      <div class="center-overlay"></div>
    </div>
    <p v-if="barcodeValue">Scanned Barcode: {{ barcodeValue }}</p>
  </div>
</template>
  
  <script setup>
import { onMounted, ref, reactive } from 'vue'
import { BarcodeDetector as BarcodeDetectorPolyfill } from 'barcode-detector/pure'

const video = ref(null) // Video element
const barcodeValue = ref('') // Holds the last detected barcode value
const state = reactive({
  isDetecting: true, // Prevent multiple detections at once
})

// Define the center region (percentage of the video feed)
const centerRegion = {
  xStartPercent: 40, // Start at 40% width (left)
  xEndPercent: 60, // End at 60% width (right)
  yStartPercent: 40, // Start at 40% height (top)
  yEndPercent: 60, // End at 60% height (bottom)
}

const startScanner = () => {
  if (!('BarcodeDetector' in globalThis)) {
    alert('Barcode Detector is not supported by this browser.')
    return
  }

  const barcodeDetector = new BarcodeDetectorPolyfill({ formats: ['ean_13', 'code_128'] })

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
      video.value.srcObject = stream
      video.value.play()
      detectBarcodes(barcodeDetector)
    })
    .catch((err) => console.error('Error accessing camera:', err))
}

const detectBarcodes = async (barcodeDetector) => {
  const checkPosition = (boundingBox, videoWidth, videoHeight) => {
    // Calculate center region coordinates
    const xStart = (centerRegion.xStartPercent / 100) * videoWidth
    const xEnd = (centerRegion.xEndPercent / 100) * videoWidth
    const yStart = (centerRegion.yStartPercent / 100) * videoHeight
    const yEnd = (centerRegion.yEndPercent / 100) * videoHeight

    // Check if bounding box is within center region
    return (
      boundingBox.x >= xStart &&
      boundingBox.x + boundingBox.width <= xEnd &&
      boundingBox.y >= yStart &&
      boundingBox.y + boundingBox.height <= yEnd
    )
  }

  while (state.isDetecting) {
    try {
      const barcodes = await barcodeDetector.detect(video.value)
      const videoWidth = video.value.videoWidth
      const videoHeight = video.value.videoHeight

      for (const barcode of barcodes) {
        if (checkPosition(barcode.boundingBox, videoWidth, videoHeight)) {
          console.log('Barcode detected:', barcode.rawValue)
          barcodeValue.value = barcode.rawValue
          state.isDetecting = false // Stop detecting after successful capture
          setTimeout(() => (state.isDetecting = true), 2000) // Resume detection after 2 seconds
          break
        }
      }
    } catch (error) {
      console.error('Error detecting barcode:', error)
    }

    await new Promise((resolve) => setTimeout(resolve, 100)) // Small delay to reduce CPU usage
  }
}

onMounted(() => {
  startScanner()
})
</script>
  
  <style scoped>
.camera-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: auto;
}

video {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
}

.center-overlay {
  position: absolute;
  top: 40%;
  left: 40%;
  width: 20%; /* Center region width (60%-40%) */
  height: 20%; /* Center region height (60%-40%) */
  border: 2px dashed red;
  box-sizing: border-box;
  pointer-events: none; /* Ensure overlay doesn't block video */
}
</style>
  