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

  const apiCallInProgress = useRef(false);
  const activeToastId = useRef(null);

  const handleScan = useCallback(async (qrData) => {
    if (apiCallInProgress.current) {
      return;
    }

    try {
      apiCallInProgress.current = true;
      setIsProcessingAPI(true);

      if (activeToastId.current) {
        toast.dismiss(activeToastId.current);
      }

      activeToastId.current = toast.loading('Processing...', {
        description: 'Validating ticket'
      });

      const response = await axiosSecure.post(qrData, {
        method: 'scan'
      });

      toast.dismiss(activeToastId.current);

      if (response.data.success) {
        activeToastId.current = toast.success(response.data.message || 'Scan successful!', {
          description: response.data.data?.scanCount > 1 
            ? `Scanned ${response.data.data.scanCount} times`
            : 'Entry granted',
          duration: 2500, 
        });
      } else {
        activeToastId.current = toast.error(response.data.message || 'Scan unsuccessful!', {
          duration: 3000,
        });
      }

    } catch (error) {
      if (activeToastId.current) {
        toast.dismiss(activeToastId.current);
      }

      const errorMessage = error.response?.data?.message || 'Error processing QR code';

      activeToastId.current = toast.error(errorMessage, {
        duration: 3000, 
      });

      console.error('API Error:', error);
    } finally {
      apiCallInProgress.current = false;
      setIsProcessingAPI(false);
    }
  }, []);

  const handleDeScan = useCallback(async (qrData) => {
    if (apiCallInProgress.current) {
      return;
    }

    try {
      apiCallInProgress.current = true;
      setIsProcessingAPI(true);

      if (activeToastId.current) {
        toast.dismiss(activeToastId.current);
      }

      activeToastId.current = toast.loading('Processing...', {
        description: 'Validating exit'
      });

      const response = await axiosSecure.post(qrData, {
        method: 'deScan'
      });

      toast.dismiss(activeToastId.current);

      if (response.data.success) {
        activeToastId.current = toast.success(response.data.message || 'De-scan successful!', {
          description: response.data.data?.deScanCount > 1
            ? `De-scanned ${response.data.data.deScanCount} times`
            : 'Exit recorded',
          duration: 2500, 
        });
      } else {
        activeToastId.current = toast.error(response.data.message || 'De-scan unsuccessful!', {
          duration: 3000, 
        });
      }

    } catch (error) {
      if (activeToastId.current) {
        toast.dismiss(activeToastId.current);
      }

      const errorMessage = error.response?.data?.message || 'Error processing QR code';

      activeToastId.current = toast.error(errorMessage, {
        duration: 3000,
      });

      console.error('API Error:', error);
    } finally {
      apiCallInProgress.current = false;
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
    if (activeToastId.current) {
      toast.dismiss(activeToastId.current);
    }

    const errorMessage = err?.message || 'Camera error occurred';
    activeToastId.current = toast.error('Scanner Error', {
      description: errorMessage,
      duration: 3000, 
    });
    console.error('QR Scanner error:', err);
  }, []);

  const handleStartScanning = useCallback(() => {
    setMethod('scan');
    setIsScanning(true);
    apiCallInProgress.current = false;
    setIsProcessingAPI(false);

  }, []);

  const handleStopScanning = useCallback(() => {
    setIsScanning(false);
    setIsProcessingAPI(false);
    apiCallInProgress.current = false;

    if (activeToastId.current) {
      toast.dismiss(activeToastId.current);
      activeToastId.current = null;
    }

    window.location.reload();
  }, []);

  const switchMethod = useCallback((newMethod) => {
    setMethod(newMethod);
    
    if (activeToastId.current) {
      toast.dismiss(activeToastId.current);
    }

    activeToastId.current = toast.info(`${newMethod === 'scan' ? 'Scan' : 'De-Scan'} Mode`, {
      duration: 1500, 
    });
  }, []);

  return (
    <>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="mt-10 md:mt-16 lg:mt-0 w-full flex flex-col justify-center sm:py-12 lg:py-32 lg:flex-row lg:justify-between xl:gap-72">
          <div className="flex flex-col justify-center lg:p-0 md:p-0 p-6 lg:ps-32 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <img src={logo} alt='Logo' />

            <p className="mt-6 mb-8 text-lg sm:mb-12 lg:text-nowrap">
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

      {isScanning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto relative">
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

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {method === 'scan'
                  ? 'Scan mode: Entry validation. Must de-scan to exit and re-scan to re-enter.'
                  : 'De-scan mode: Exit validation. Must scan first before de-scanning.'
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