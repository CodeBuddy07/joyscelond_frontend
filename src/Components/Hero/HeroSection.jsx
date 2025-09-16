import React, { useState } from 'react';
import { RiQrScan2Line } from "react-icons/ri";
import { X } from 'lucide-react';
import QrReader from './QrReader';
import axiosSecure from '../../lib/axiosSecure';
import { toast } from 'sonner';

const HeroSection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [isProcessingAPI, setIsProcessingAPI] = useState(false);

  const handleScan = async (data) => {
    if (!data || isProcessingAPI) {
      return;
    }

    try {
      setIsProcessingAPI(true);
      
      console.log('Processing QR code:', data);
      
      // Show processing toast
      const loadingToast = toast.loading('Processing QR code...');
      
      const response = await axiosSecure.post(data);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      console.log('API Response:', response.data);
      
      // Update scan count for UI feedback
      setScanCount(prev => prev + 1);
      
      if (response.data.data.scanCount > 1) {
        toast.warning('Duplicated Scan!', {
          description: `This QR code has been scanned ${response.data.data.scanCount} times`
        });
      } else if (response.data.data.scanCount === 1 && response.data.success) {
        toast.success(response.data.message || 'Ticket validation successful!', {
          description: 'QR code processed successfully'
        });
      } else {
        toast.error(response.data.message || 'Ticket validation unsuccessful!');
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Error on scanning!');
      console.error('API Error:', error);
    } finally {
      setIsProcessingAPI(false);
    }
  };

  const handleError = (err) => {
    toast.error('Camera error: ' + (err?.message || err));
    console.error('QR Scanner error:', err);
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    setScanCount(0);
    setIsProcessingAPI(false);
  };

  const handleStopScanning = () => {
    setIsScanning(false);
    setIsProcessingAPI(false);
    if (scanCount > 0) {
      toast.success(`Scanning session ended. Total scans: ${scanCount}`);
    }
  };

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
              <button
                onClick={handleStartScanning}
                disabled={isScanning}
                className={`flex items-center gap-2 px-8 py-3 text-lg text-center font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isScanning 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] hover:shadow-lg'
                }`}
              >
                {isScanning ? 'SCANNING...' : 'START QR SCAN'} <RiQrScan2Line />
              </button>
              
              {(scanCount > 0 || isProcessingAPI) && (
                <div className="text-sm text-gray-600 font-medium">
                  {isProcessingAPI ? 'Processing...' : `Scanned: ${scanCount} QR codes`}
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">QR Code Scanner</h2>
              <div className="flex items-center gap-3">
                {isProcessingAPI && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    Processing...
                  </span>
                )}
                {scanCount > 0 && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {scanCount} scanned
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
            
            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Scanner will remain active. Point at different QR codes to scan continuously.
              </p>
              <button
                onClick={handleStopScanning}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
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