import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const QrReader = ({ onScan, onError, onClose }) => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const lastScannedRef = useRef({ code: null, timestamp: 0 });
  const isProcessingRef = useRef(false);

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          scanner.current = new QrScanner(
            videoEl.current,
            result => {
              const currentCode = result.data;
              const now = Date.now();
              
              // Simple debouncing: same code within 3 seconds OR any code within 500ms
              if (isProcessingRef.current || 
                  (lastScannedRef.current.code === currentCode && now - lastScannedRef.current.timestamp < 3000) ||
                  (now - lastScannedRef.current.timestamp < 500)) {
                return;
              }

              // Set processing flag and update last scanned
              isProcessingRef.current = true;
              lastScannedRef.current = { code: currentCode, timestamp: now };

              // Process the scan
              onScan(currentCode);

              // Reset processing flag after 1 second
              setTimeout(() => {
                isProcessingRef.current = false;
              }, 1000);
            },
            {
              onDecodeError: err => {
                // Silent handling of decode errors - normal when no QR code is visible
              } ,
              preferredCamera: "environment",
              highlightScanRegion: true,
              highlightCodeOutline: true,
              overlay: qrBoxEl.current || undefined,
            }
          );

          scanner.current.start().then(() => setQrOn(true)).catch(err => {
            setQrOn(false);
            if (onError) onError(err);
          });
        })
        .catch(err => {
          console.error('Camera access denied or failed:', err);
          setQrOn(false);
          if (onError) onError(err);
        });
    }

    return () => {
      // Cleanup
      if (scanner.current) {
        scanner.current.stop();
        scanner.current.destroy();
        scanner.current = null;
      }
      lastScannedRef.current = { code: null, timestamp: 0 };
      isProcessingRef.current = false;
    };
  }, [onScan, onError]);

  useEffect(() => {
    if (!qrOn) {
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.");
      if (onError) onError(new Error("Camera not accessible"));
    }
  }, [qrOn, onError]);

  return (
    <div className="relative w-full h-[300px] bg-black rounded-lg overflow-hidden flex items-center justify-center">
      <video ref={videoEl} className="w-full h-full object-cover" playsInline muted />
      <div ref={qrBoxEl} className="absolute inset-0 pointer-events-none border-4 border-cyan-400 rounded-lg"></div>
      
      {/* Processing indicator */}
      {isProcessingRef.current && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          Processing...
        </div>
      )}
      
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-white/80 rounded-full p-2 text-black hover:bg-white transition-colors"
        aria-label="Close QR Scanner"
      >
        ✕
      </button>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm text-center">
        Point camera at QR code to scan
      </div>
    </div>
  );
};

export default QrReader;