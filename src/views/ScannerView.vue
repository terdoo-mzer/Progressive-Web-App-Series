<template>
  <div>
    <div class="camera-wrapper">
      <video ref="video" autoplay muted playsinline></video>
      <!-- Visual overlay for center region -->
      <!-- <div class="center-overlay"></div> -->
    </div>
    <p v-if="barcodeValue">Scanned Barcode: {{ barcodeValue }}</p>
  </div>
</template>
  
  <script setup>
import { onMounted, ref, useTemplateRef, reactive } from 'vue'
import { BarcodeDetector as BarcodeDetectorPolyfill } from 'barcode-detector/pure'

const barcodeFormats = { formats: ['ean_13', 'code_128'] }

const barcodeDetector =
  'BarcodeDetector' in window
    ? new BarcodeDetector(barcodeFormats)
    : new BarcodeDetectorPolyfill(barcodeFormats)

const video = useTemplateRef('video') // Video element
const barcodeValue = ref('') // Holds the last detected barcode value
const state = reactive({
  isDetecting: false, // Prevent multiple detections at once
})

// function test() {
//   console.log(barcodeDetector)
//   return
// }
// test()

// Define the center region (percentage of the video feed)
// const centerRegion = {
//   xStartPercent: 40, // Start at 40% width (left)
//   xEndPercent: 60, // End at 60% width (right)
//   yStartPercent: 40, // Start at 40% height (top)
//   yEndPercent: 60, // End at 60% height (bottom)
// }

const startScanner = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: 'environment' },
      width: { ideal: 1280 },
      height: { ideal: 720 },
    })
    .then((stream) => {
      video.value.srcObject = stream
      video.value.addEventListener('loadeddata', () => {
        video.value.play()

        barcodeDetector
          .detect(video.value)
          .then((barcodes) => {
            if (barcodes.length > 0) {
              console.log('Barcode detected', barcodes)
              for (const barcode of barcodes) {
                console.log(barcode)
                barcodeValue.value = barcode.rawValue
              }
            } else {
              console.log('Barcode not detected')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
    .catch((err) => console.error('Error accessing camera:', err))
}

const detectBarcodes = async (val) => {
  console.log(val)
  return
  //   const checkPosition = (boundingBox, videoWidth, videoHeight) => {
  //     // Calculate center region coordinates
  //     const xStart = (centerRegion.xStartPercent / 100) * videoWidth
  //     const xEnd = (centerRegion.xEndPercent / 100) * videoWidth
  //     const yStart = (centerRegion.yStartPercent / 100) * videoHeight
  //     const yEnd = (centerRegion.yEndPercent / 100) * videoHeight

  //     // Check if bounding box is within center region
  //     return (
  //       boundingBox.x >= xStart &&
  //       boundingBox.x + boundingBox.width <= xEnd &&
  //       boundingBox.y >= yStart &&
  //       boundingBox.y + boundingBox.height <= yEnd
  //     )
  //   }

  while (state.isDetecting) {
    try {
      const barcodes = await barcodeDetector.detect(val)
      //   const videoWidth = video.value.videoWidth
      //   const videoHeight = video.value.videoHeight

      for (const barcode of barcodes) {
        // if (checkPosition(barcode.boundingBox, videoWidth, videoHeight)) {
        console.log('Barcode detected:', barcode.rawValue)
        barcodeValue.value = barcode.rawValue
        state.isDetecting = false // Stop detecting after successful capture
        // }
      }
    } catch (error) {
      console.log('Error detecting barcode:', error)
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
  max-width: 500px;
  margin: auto;
}

video {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
}

.center-overlay {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%; /* Center region width (60%-40%) */
  height: 60%; /* Center region height (60%-40%) */
  border: 2px dashed red;
  box-sizing: border-box;
  pointer-events: none; /* Ensure overlay doesn't block video */
}
</style>
  