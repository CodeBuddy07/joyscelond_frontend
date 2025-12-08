import React, { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader } from '@zxing/library';

const QrReader = ({ onScan, onError, onClose, method = 'scan' }) => {
  const videoEl = useRef(null);
  const codeReaderRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const currentQrCodeRef = useRef(null);
  const hasApiBeenCalledRef = useRef(false);

  const playBeep = useCallback(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }, []);

  const startScanning = useCallback(async () => {
    try {
      setCameraError(null);

      codeReaderRef.current = new BrowserMultiFormatReader();

      const videoInputDevices = await codeReaderRef.current.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        throw new Error('No camera devices found');
      }

      let selectedDeviceId = videoInputDevices[0].deviceId;

      const rearCamera = videoInputDevices.find(device =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('rear') ||
        device.label.toLowerCase().includes('environment')
      );

      if (rearCamera) {
        selectedDeviceId = rearCamera.deviceId;
      }

      setIsScanning(true);

      await codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoEl.current,
        (result, err) => {
          if (result && !isProcessing) {
            const qrData = result.getText();

            if (currentQrCodeRef.current !== qrData) {
              currentQrCodeRef.current = qrData;
              hasApiBeenCalledRef.current = false;
              
              if (!hasApiBeenCalledRef.current) {
                setIsProcessing(true);
                hasApiBeenCalledRef.current = true;

                playBeep();

                onScan(qrData);

                setTimeout(() => {
                  setIsProcessing(false);
                }, 2000);
              }
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
  }, [onScan, onError, isProcessing, playBeep]);

  const stopScanning = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    currentQrCodeRef.current = null;
    hasApiBeenCalledRef.current = false;
    setIsScanning(false);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    currentQrCodeRef.current = null;
    hasApiBeenCalledRef.current = false;
    startScanning();

    return () => {
      stopScanning();
    };
  }, [method]);

  const handleClose = () => {
    stopScanning();
    if (onClose) onClose();
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
      <video
        ref={videoEl}
        className="w-full h-full object-cover"
        playsInline
        muted
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-cyan-400"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-cyan-400"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-cyan-400"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-cyan-400 border-dashed rounded-lg animate-pulse"></div>
        </div>
      </div>

      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {isScanning && (
          <div className={`${method === 'scan' ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse`}>
            {method === 'scan' ? 'Scanning Active' : 'De-Scanning Active'}
          </div>
        )}
        {isProcessing && (
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce">
            Processing...
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={handleClose}
          className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
          aria-label="Close QR Scanner"
        >
          ✕
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-xs text-center max-w-xs">
        {isProcessing
          ? `Processing QR code for ${method === 'scan' ? 'scanning' : 'de-scanning'}...`
          : `Point camera at QR code to ${method === 'scan' ? 'scan' : 'de-scan'}`
        }
      </div>
    </div>
  );
};

export default QrReader;