import React, { useState, useCallback, useRef } from 'react';
import { RiQrScan2Line } from "react-icons/ri";
import { X } from 'lucide-react';
import QrReader from './QrReader';
import axiosSecure from '../../lib/axiosSecure';
import { toast } from 'sonner';
import { ProtectedRoute } from '../../lib/ProtectedRoute';
import logo from '../../assets/logo.svg';

const HeroSection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [method, setMethod] = useState('scan');
  const [isProcessingAPI, setIsProcessingAPI] = useState(false);

  // Separate refs to track API calls for scan and de-scan
  const scanApiCallsInProgress = useRef(new Set());
  const deScanApiCallsInProgress = useRef(new Set());

  const handleScan = useCallback(async (qrData) => {
    if (scanApiCallsInProgress.current.has(qrData)) {
      return;
    }

    try {
      scanApiCallsInProgress.current.add(qrData);
      setIsProcessingAPI(true);

      const loadingToast = toast.loading('Processing QR code...', {
        description: 'Validating ticket information'
      });

      const response = await axiosSecure.post(qrData, {
        method: 'scan'
      });

      toast.dismiss(loadingToast);

      if (response.data.data?.scanCount > 1) {
        toast.warning('Duplicate Scan Detected!', {
          description: `This QR code has been scanned ${response.data.data.scanCount} times`,
          duration: 4000,
        });
      } else if (response.data.data?.scanCount === 1 && response.data.success) {
        toast.success(response.data.message || 'Ticket scan successful!', {
          description: 'QR code processed successfully',
          duration: 3000,
        });
      } else {
        toast.error(response.data.message || 'Ticket scan unsuccessful!', {
          duration: 4000,
        });
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error processing QR code';

      toast.error(errorMessage, {
        description: 'Please try scanning again',
        duration: 4000,
      });

      console.error('API Error:', error);
    } finally {
      scanApiCallsInProgress.current.delete(qrData);
      setIsProcessingAPI(false);
    }
  }, []);

  const handleDeScan = useCallback(async (qrData) => {
    if (deScanApiCallsInProgress.current.has(qrData)) {
      return;
    }

    try {
      deScanApiCallsInProgress.current.add(qrData);
      setIsProcessingAPI(true);

      const loadingToast = toast.loading('Processing QR code...', {
        description: 'Validating ticket information for de-scan'
      });

      const response = await axiosSecure.post(qrData, {
        method: 'deScan'
      });

      toast.dismiss(loadingToast);

      if (response.data.data?.deScanCount > 1) {
        toast.warning('Duplicate De-Scan Detected!', {
          description: `This QR code has been de-scanned ${response.data.data.deScanCount} times`,
          duration: 4000,
        });
      } else if (response.data.data?.deScanCount === 1 && response.data.success) {
        toast.success(response.data.message || 'Ticket de-scan successful!', {
          description: 'QR code processed successfully',
          duration: 3000,
        });
      } else {
        toast.error(response.data.message || 'Ticket de-scan unsuccessful!', {
          duration: 4000,
        });
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error processing QR code';

      toast.error(errorMessage, {
        description: 'Please try de-scanning again',
        duration: 4000,
      });

      console.error('API Error:', error);
    } finally {
      deScanApiCallsInProgress.current.delete(qrData);
      setIsProcessingAPI(false);
    }
  }, []);

  const handleOnScan = useCallback((qrData) => {
    if (method === 'scan') {
      handleScan(qrData);
    } else {
      handleDeScan(qrData);
    }
  }, [method, handleScan, handleDeScan]);

  const handleError = useCallback((err) => {
    const errorMessage = err?.message || 'Camera error occurred';
    toast.error('Scanner Error', {
      description: errorMessage,
      duration: 5000,
    });
    console.error('QR Scanner error:', err);
  }, []);

  const handleStartScanning = useCallback(() => {
    setMethod('scan');
    setIsScanning(true);
    scanApiCallsInProgress.current.clear();
    deScanApiCallsInProgress.current.clear();
    setIsProcessingAPI(false);

    toast.info('QR Scanner Started', {
      description: 'Point your camera at QR codes to scan',
      duration: 2000,
    });
  }, []);

  const handleStopScanning = useCallback(() => {
    setIsScanning(false);
    setIsProcessingAPI(false);
    scanApiCallsInProgress.current.clear();
    deScanApiCallsInProgress.current.clear();

    toast.success('Scanning Session Completed', {
      duration: 2000,
    });

    window.location.reload();
  }, []);

  const switchMethod = useCallback((newMethod) => {
    setMethod(newMethod);
    toast.info(`Switched to ${newMethod === 'scan' ? 'Scanning' : 'De-Scanning'} Mode`, {
      duration: 2000,
    });
  }, []);

  return (
    <>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="mt-10 md:mt-16 lg:mt-0 w-full flex flex-col justify-center sm:py-12 lg:py-32 lg:flex-row lg:justify-between xl:gap-72">
          <div className="flex flex-col justify-center lg:p-0 md:p-0 p-6 lg:ps-32 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            {/* <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              Scan & De-Scan
              <br />
              <span className="bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] bg-clip-text text-transparent">
                QR Codes
              </span>
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              Continuously scan and de-scan multiple QR codes without interruption.
              Perfect for events, ticket validation, entry-exit management, and inventory control.
            </p> */}

            {/* <h1 className='text-5xl font-bold'>Validator</h1>
            <h2 className='text-5xl font-bold bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] bg-clip-text text-transparent'>Scan to validate</h2> */}
            <img src={logo} alt='Logo' />

            <p className="mt-6 mb-8 text-lg sm:mb-12 text-nowrap">
              Safer, Faster, Smarter way to validate your event attendees.
            </p>

            <div className="flex flex-col space-y-4 sm:items-center items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <ProtectedRoute requiredRole="STAFF">
                <button
                  onClick={handleStartScanning}
                  disabled={isScanning}
                  className={`flex items-center gap-2 px-8 py-3 text-lg text-center font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${isScanning
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] hover:shadow-lg text-white'
                    }`}
                >
                  {isScanning ? 'SCANNING...' : 'START QR SCANNER'} <RiQrScan2Line />
                </button>
              </ProtectedRoute>

              {isProcessingAPI && (
                <div className="text-sm text-blue-600 font-medium animate-pulse">
                  Processing API request...
                </div>
              )}
            </div>
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="lg:text-xl text-lg font-semibold text-gray-800 text-nowrap">
                QR Code Scanner
              </h2>
              <div className="flex items-center gap-2">
                {isProcessingAPI && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    Processing...
                  </span>
                )}
                <span className={`${method === 'scan' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-3 py-1 rounded-full text-nowrap lg:text-sm text-xs font-medium`}>
                  {method === 'scan' ? 'Scan Mode' : 'De-Scan Mode'}
                </span>
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
              onScan={handleOnScan}
              onError={handleError}
              onClose={handleStopScanning}
              method={method}
            />

            {/* Mode Switch Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => switchMethod('scan')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${method === 'scan'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                Scan Mode
              </button>
              <button
                onClick={() => switchMethod('deScan')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${method === 'deScan'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                De-Scan Mode
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {method === 'scan'
                  ? 'Scan mode: Prevents duplicate scans. You can de-scan the same QR code.'
                  : 'De-scan mode: Prevents duplicate de-scans. You can scan the same QR code.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;