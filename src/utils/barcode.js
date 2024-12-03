(function () {
    // Check if the browser supports the Barcode Detector API
    if (!("BarcodeDetector" in globalThis)) {
      alert("Barcode Detector is not supported by this browser.");
      console.error("Barcode Detector API is not available.");
      return; // Exit the function since the feature is unsupported
    }
  
    alert("Barcode Detector supported!");
  
    try {
      // Create a new BarcodeDetector instance
      const barcodeDetector = new BarcodeDetector({
        formats: ["code_39", "codabar", "ean_13"],
      });
  
      console.log("BarcodeDetector instance created successfully:", barcodeDetector);
      // You can now use `barcodeDetector.detect` to scan barcodes
    } catch (error) {
      console.error("Error creating BarcodeDetector:", error);
    }
  })();
  