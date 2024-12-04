import { BarcodeDetector as BarcodeDetectorPolyfill } from "barcode-detector/pure";

export const detectBarcode =  async () => {
    // Check if the browser supports the Barcode Detector API.
    // If it doesn't, use the polyfill
    if (!("BarcodeDetector" in globalThis)) {
        const barcodeDetector = new BarcodeDetectorPolyfill({
            formats: ["qr_code"],
          });
          
          const imageFile = await fetch(
            "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Hello%20world!",
          ).then((resp) => resp.blob());
          
          barcodeDetector.detect(imageFile).then(console.log);  
    }
}
  