
  
  (function () {
    // check compatibility
if (!("BarcodeDetector" in globalThis)) {
    alert("Barcode Detector is not supported by this browser.");
  } else {
    alert("Barcode Detector supported!");
  
    // create new detector
    const barcodeDetector = new BarcodeDetector({
      formats: ["code_39", "codabar", "ean_13"],
    });
  }
  })();