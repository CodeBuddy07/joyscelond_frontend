import React, { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader } from '@zxing/library';

const QrReader = ({ onScan, onError, onClose }) => {
  const videoEl = useRef(null);
  const codeReaderRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Array to store scanned QR codes for deduplication
  const scannedCodesRef = useRef([]);

  const addToScannedCodes = useCallback((qrData) => {
    // Remove the existing code if present and add new one
    scannedCodesRef.current = scannedCodesRef.current.filter(code => code !== qrData);
    scannedCodesRef.current.push(qrData);
    
    // Keep only last 10 codes to prevent memory issues
    if (scannedCodesRef.current.length > 10) {
      scannedCodesRef.current = scannedCodesRef.current.slice(-10);
    }
  }, []);

  const isCodeAlreadyScanned = useCallback((qrData) => {
    return scannedCodesRef.current.includes(qrData);
  }, []);

  const startScanning = useCallback(async () => {
    try {
      setCameraError(null);
      
      // Initialize the code reader
      codeReaderRef.current = new BrowserMultiFormatReader();
      
      // Get available video devices
      const videoInputDevices = await codeReaderRef.current.listVideoInputDevices();
      
      if (videoInputDevices.length === 0) {
        throw new Error('No camera devices found');
      }

      // Find rear camera or use first available
      let selectedDeviceId = videoInputDevices[0].deviceId;
      
      // Look for rear camera
      const rearCamera = videoInputDevices.find(device => 
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('rear') ||
        device.label.toLowerCase().includes('environment')
      );
      
      if (rearCamera) {
        selectedDeviceId = rearCamera.deviceId;
      }

      setIsScanning(true);

      // Start decoding
      await codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoEl.current,
        (result, err) => {
          if (result && !isProcessing) {
            const qrData = result.getText();
            
            // Check if this QR code was already scanned
            if (!isCodeAlreadyScanned(qrData)) {
              setIsProcessing(true);
              
              // Add to scanned codes array
              addToScannedCodes(qrData);
              
              // Call the onScan callback
              onScan(qrData);
              
              // Reset processing state after 2 seconds
              setTimeout(() => {
                setIsProcessing(false);
              }, 2000);
            }
          }
          
          if (err && !(err.name === 'NotFoundException')) {
            console.error('QR Scan Error:', err);
          }
        }
      );

    } catch (error) {
      console.error('Failed to start QR scanner:', error);
      setCameraError(error.message);
      setIsScanning(false);
      if (onError) onError(error);
    }
  }, [onScan, onError, isProcessing, isCodeAlreadyScanned, addToScannedCodes]);

  const stopScanning = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    setIsScanning(false);
    setIsProcessing(false);
    scannedCodesRef.current = []; // Clear scanned codes when stopping
  }, []);

  useEffect(() => {
    startScanning();
    
    return () => {
      stopScanning();
    };
  }, []);

  const handleClose = () => {
    stopScanning();
    if (onClose) onClose();
  };

  const clearScannedCodes = () => {
    scannedCodesRef.current = [];
    setIsProcessing(false);
  };

  if (cameraError) {
    return (
      <div className="relative w-full h-[300px] bg-gray-100 rounded-lg flex flex-col items-center justify-center p-6">
        <div className="text-red-500 text-center mb-4">
          <p className="font-semibold">Camera Error</p>
          <p className="text-sm mt-2">{cameraError}</p>
        </div>
        <div className="text-center text-sm text-gray-600 mb-4">
          <p>Please ensure:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Camera permissions are granted</li>
            <li>No other app is using the camera</li>
            <li>Your device has a working camera</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <button
            onClick={startScanning}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Retry
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] bg-black rounded-lg overflow-hidden">
      {/* Video element */}
      <video 
        ref={videoEl} 
        className="w-full h-full object-cover"
        playsInline 
        muted
        style={{ transform: 'scaleX(-1)' }} // Mirror for better UX
      />
      
      {/* Scanning overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-cyan-400"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-cyan-400"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-cyan-400"></div>
        
        {/* Center scanning area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-cyan-400 border-dashed rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Status indicators */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {isScanning && (
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
            Scanning Active
          </div>
        )}
        {isProcessing && (
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce">
            Processing...
          </div>
        )}
        {scannedCodesRef.current.length > 0 && (
          <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Scanned: {scannedCodesRef.current.length}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={clearScannedCodes}
          className="bg-yellow-500/80 hover:bg-yellow-500 text-white p-2 rounded-full text-xs font-medium transition-colors"
          title="Clear scan history"
        >
          🔄
        </button>
        <button
          onClick={handleClose}
          className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
          aria-label="Close QR Scanner"
        >
          ✕
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-xs text-center max-w-xs">
        {isProcessing 
          ? "Processing QR code..." 
          : "Point camera at QR code. Duplicate scans are automatically prevented."
        }
      </div>
    </div>
  );
};

export default QrReader;