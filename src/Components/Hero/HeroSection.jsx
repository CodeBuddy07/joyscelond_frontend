import React, { useState, useCallback, useRef } from 'react';
import { RiQrScan2Line } from "react-icons/ri";
import { X, RotateCcw, CheckCircle } from 'lucide-react';
import QrReader from './QrReader';
import axiosSecure from '../../lib/axiosSecure';
import { toast } from 'sonner';
import { ProtectedRoute } from '../../lib/ProtectedRoute';

const HeroSection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState([]);
  const [isProcessingAPI, setIsProcessingAPI] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    totalScans: 0,
    successfulScans: 0,
    duplicateScans: 0,
    errorScans: 0
  });

  // Ref to track API calls in progress to prevent race conditions
  const apiCallsInProgress = useRef(new Set());

  const updateSessionStats = useCallback((type) => {
    setSessionStats(prev => ({
      ...prev,
      totalScans: prev.totalScans + 1,
      [type]: prev[type] + 1
    }));
  }, []);

  const handleScan = useCallback(async (qrData) => {
    // Prevent multiple API calls for the same QR data
    if (apiCallsInProgress.current.has(qrData)) {
      return;
    }

    try {
      apiCallsInProgress.current.add(qrData);
      setIsProcessingAPI(true);

      console.log('Processing QR code:', qrData);

      // Show processing toast
      const loadingToast = toast.loading('Processing QR code...', {
        description: 'Validating ticket information'
      });

      const response = await axiosSecure.post(qrData);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      console.log('API Response:', response.data);

      // Create scan result object
      const scanResult = {
        id: Date.now(),
        qrData,
        timestamp: new Date().toLocaleTimeString(),
        response: response.data,
        scanCount: response.data.data?.scanCount || 1
      };

      // Add to scan results
      setScanResults(prev => [scanResult, ...prev.slice(0, 9)]); // Keep last 10 results

      if (response.data.data?.scanCount > 1) {
        updateSessionStats('duplicateScans');
        toast.warning('Duplicate Scan Detected!', {
          description: `This QR code has been scanned ${response.data.data.scanCount} times`,
          duration: 4000,
        });
      } else if (response.data.data?.scanCount === 1 && response.data.success) {
        updateSessionStats('successfulScans');
        toast.success(response.data.message || 'Ticket validation successful!', {
          description: 'QR code processed successfully',
          duration: 3000,
        });
      } else {
        updateSessionStats('errorScans');
        toast.error(response.data.message || 'Ticket validation unsuccessful!', {
          duration: 4000,
        });
      }

    } catch (error) {
      updateSessionStats('errorScans');
      const errorMessage = error.response?.data?.message || 'Error processing QR code';

      toast.error(errorMessage, {
        description: 'Please try scanning again',
        duration: 4000,
      });

      console.error('API Error:', error);

      // Add error to scan results
      const errorResult = {
        id: Date.now(),
        qrData,
        timestamp: new Date().toLocaleTimeString(),
        error: errorMessage,
        isError: true
      };

      setScanResults(prev => [errorResult, ...prev.slice(0, 9)]);
    } finally {
      apiCallsInProgress.current.delete(qrData);
      setIsProcessingAPI(false);
    }
  }, [updateSessionStats]);

  const handleError = useCallback((err) => {
    const errorMessage = err?.message || 'Camera error occurred';
    toast.error('Scanner Error', {
      description: errorMessage,
      duration: 5000,
    });
    console.error('QR Scanner error:', err);
  }, []);

  const handleStartScanning = useCallback(() => {
    setIsScanning(true);
    // Reset session stats
    setSessionStats({
      totalScans: 0,
      successfulScans: 0,
      duplicateScans: 0,
      errorScans: 0
    });
    setScanResults([]);
    apiCallsInProgress.current.clear();
    setIsProcessingAPI(false);

    toast.info('QR Scanner Started', {
      description: 'Point your camera at QR codes to scan',
      duration: 2000,
    });
  }, []);

  const handleStopScanning = useCallback(() => {
    setIsScanning(false);
    setIsProcessingAPI(false);
    apiCallsInProgress.current.clear();

    if (sessionStats.totalScans > 0) {
      toast.success('Scanning Session Completed', {
        description: `Total scans: ${sessionStats.totalScans} | Successful: ${sessionStats.successfulScans}`,
        duration: 4000,
      });
    }
  }, [sessionStats]);

  const clearScanHistory = useCallback(() => {
    setScanResults([]);
    setSessionStats({
      totalScans: 0,
      successfulScans: 0,
      duplicateScans: 0,
      errorScans: 0
    });
    toast.info('Scan history cleared');
  }, []);

  return (
    <>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="mt-10 md:mt-16 lg:mt-0 w-full flex flex-col justify-center sm:py-12 lg:py-32 lg:flex-row lg:justify-between xl:gap-72">
          <div className="flex flex-col justify-center lg:p-0 md:p-0 p-6 lg:ps-32 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              Scan
              <br />
              <span className="bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] bg-clip-text text-transparent">
                QR Code
              </span>
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              Continuously scan multiple QR codes without interruption.
              Perfect for events, ticket validation, and inventory management.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <ProtectedRoute requiredRole="STAFF">
                <button
                  onClick={handleStartScanning}
                  disabled={isScanning}
                  className={`flex items-center gap-2 px-8 py-3 text-lg text-center font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${isScanning
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] hover:shadow-lg'
                    }`}
                >
                  {isScanning ? 'SCANNING...' : 'START QR SCAN'} <RiQrScan2Line />
                </button>
              </ProtectedRoute>


              {/* Session Stats */}
              {sessionStats.totalScans > 0 && (
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    Total: {sessionStats.totalScans}
                  </div>
                  {sessionStats.successfulScans > 0 && (
                    <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                      Success: {sessionStats.successfulScans}
                    </div>
                  )}
                  {sessionStats.duplicateScans > 0 && (
                    <div className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                      Duplicates: {sessionStats.duplicateScans}
                    </div>
                  )}
                  {sessionStats.errorScans > 0 && (
                    <div className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                      Errors: {sessionStats.errorScans}
                    </div>
                  )}
                </div>
              )}

              {isProcessingAPI && (
                <div className="text-sm text-blue-600 font-medium animate-pulse">
                  Processing API request...
                </div>
              )}
            </div>

            {/* Recent Scan Results */}
            {scanResults.length > 0 && !isScanning && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800">Recent Scans</h3>
                  <button
                    onClick={clearScanHistory}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> Clear
                  </button>
                </div>
                <div className="space-y-2">
                  {scanResults.slice(0, 5).map((result) => (
                    <div
                      key={result.id}
                      className={`flex justify-between items-center p-2 rounded text-xs ${result.isError
                          ? 'bg-red-100 text-red-800'
                          : result.scanCount > 1
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        {!result.isError && <CheckCircle size={12} />}
                        <span className="font-mono text-xs truncate max-w-32">
                          {result.qrData.substring(0, 20)}...
                        </span>
                      </div>
                      <span>{result.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center lg:ms-64 mt-8 lg:mt-0 h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] w-full">
            <img
              src="Hero.svg"
              alt="QR Scanner Hero"
              className="object-contain w-full h-full max-w-4xl"
            />
          </div>
        </div>
      </section>

      {/* QR Scanner Modal */}
      {isScanning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto relative max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">QR Code Scanner</h2>
              <div className="flex items-center gap-2">
                {isProcessingAPI && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    Processing...
                  </span>
                )}
                {sessionStats.totalScans > 0 && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {sessionStats.totalScans} scanned
                  </span>
                )}
                <button
                  onClick={handleStopScanning}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close Scanner"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <QrReader
              onScan={handleScan}
              onError={handleError}
              onClose={handleStopScanning}
            />

            {/* Real-time scan results in modal */}
            {scanResults.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Latest Scans:</h4>
                <div className="space-y-1">
                  {scanResults.slice(0, 3).map((result) => (
                    <div
                      key={result.id}
                      className={`flex justify-between items-center p-2 rounded text-xs ${result.isError
                          ? 'bg-red-100 text-red-700'
                          : result.scanCount > 1
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                    >
                      <span className="font-mono truncate max-w-40">
                        {result.qrData.substring(0, 25)}...
                      </span>
                      <span>{result.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Scanner prevents duplicate API calls automatically. Point at different QR codes to continue.
              </p>
              <button
                onClick={handleStopScanning}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Stop Scanning
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;