import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ProtectedRoute } from '../../lib/ProtectedRoute';
import axiosSecure from '../../lib/axiosSecure';
import Pagination from '../../lib/Pagination';
import { toast } from 'sonner';

function formatDateTime(date) {
  const x = new Date(date); 
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  return x.toLocaleString('en-US', options);
}

const AttendeeDetailsModal = ({ attendee, isOpen, onClose }) => {
  if (!isOpen || !attendee) return null;



  const getStatus = (attendee) => {
    if (attendee.isBlocked) return 'Blocked';

    const lastScanTime = attendee.scanLogs && attendee.scanLogs.length > 0
      ? new Date(attendee.scanLogs[attendee.scanLogs.length - 1])
      : null;

    const lastDeScanTime = attendee.deScanLogs && attendee.deScanLogs.length > 0
      ? new Date(attendee.deScanLogs[attendee.deScanLogs.length - 1])
      : null;

    if (lastScanTime && (!lastDeScanTime || lastScanTime > lastDeScanTime)) {
      return 'Present';
    }

    if (lastDeScanTime && (!lastScanTime || lastDeScanTime > lastScanTime)) {
      return 'Absent';
    }

    return 'Absent';
  };


  const getStatusColor = (attendee) => {
    if (getStatus(attendee) == 'Absent') return 'text-red-600';
    if (getStatus(attendee) == 'Present') return 'text-green-600';
    return 'text-yellow-600';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Attendee Details - {attendee.ticketID}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Basic Information
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Ticket ID:</span>
                  <span className="text-gray-900">{attendee.ticketID}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`font-semibold ${getStatusColor(attendee)}`}>
                    {getStatus(attendee)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Blocked:</span>
                  <span className={attendee.isBlocked ? 'text-red-600' : 'text-green-600'}>
                    {attendee.isBlocked ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Security & Timing
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Secure Token:</span>
                  <span className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                    {attendee.secureToken}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Created At:</span>
                  <span className="text-gray-900 text-sm">
                    {formatDateTime(attendee.createdAt)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Updated At:</span>
                  <span className="text-gray-900 text-sm">
                    {formatDateTime(attendee.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Entry Scans ({attendee.scanLogs?.length || 0})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {attendee.scanLogs?.length > 0 ? (
                  attendee.scanLogs.map((log, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm font-medium text-green-800">
                        Scan #{index + 1}
                      </span>
                      <span className="text-xs text-green-600">
                        {formatDateTime(log)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-2">No scan logs available</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Exit Scans ({attendee.deScanLogs?.length || 0})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {attendee.deScanLogs?.length > 0 ? (
                  attendee.deScanLogs.map((log, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm font-medium text-blue-800">
                        De-Scan #{index + 1}
                      </span>
                      <span className="text-xs text-blue-600">
                        {formatDateTime(log)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-2">No de-scan logs available</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              QR Code Information
            </h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-2xl font-bold text-green-600">{attendee.scanLogs?.length || 0}</div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{attendee.deScanLogs?.length || 0}</div>
                <div className="text-sm text-gray-600">Total Exits</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const eventID = JSON.parse(localStorage.getItem('staffInfo'))?.eventID || 'event-id-not-found';
  const [attendees, setAttendees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const ticketsPerPage = 10;

  const getStats = async () => {

    try {

      const statResponse = await axiosSecure.get(`/api/v1/event/get-stats/${eventID}`, {});

      if (statResponse.data.success) {
        setStats(statResponse.data.data);
        console.log(statResponse.data.data);
      } else {
        console.log('Failed to fetch tickets stats');
      }

    } catch (error) {
      console.log('Error Fetching Stats: ', error);
      toast.error(error.response.data.message || "Error Fetching Stats.")
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchAttendees = async () => {
    try {
      const response = await axiosSecure.get(`/api/v1/ticket/get/${eventID}?page=${currentPage}&limit=${ticketsPerPage}&search=${searchTerm}`);
      if (response.data.success) {
        setAttendees(response.data.data.tickets);
        setTotalPages(response.data.data.totalPages || 1);
        setCurrentPage(response.data.data.currentPage || 1);
        console.log('Fetched attendees:', response.data.data.tickets);
        getStats();
      } else {
        console.error('Failed to fetch attendees:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  const handleDetailsClick = (attendee) => {
    setSelectedAttendee(attendee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttendee(null);
  };

  const handleBlockToggle = async (ticketID, block) => {
    try {
      setLoading(true);
      const response = await axiosSecure.patch(`/api/v1/ticket/block/${ticketID}`, { block });
      if (response.data.success) {
        fetchAttendees();
        setLoading(false);
      } else {
        console.error('Failed to block/unblock ticket:', response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error blocking/unblocking ticket:', error);
      setLoading(false);
    }
  };

  const handleManualScan = async (secret) => {
    try {
      setLoading(true);
      const response = await axiosSecure.post(`/api/v1/ticket/validate/${eventID}:${secret}`, { method: 'scan' });
      fetchAttendees();
      if (response.data.data?.scanCount > 1) {
        setLoading(false);
        toast.success('Ticket validation successful!', {
          description: `This QR code has been scanned ${response.data.data.scanCount} times`,
          duration: 4000,
        });
      } else if (response.data.data?.scanCount === 1 && response.data.success) {
        setLoading(false);
        toast.success(response.data.message || 'Ticket validation successful!', {
          description: 'QR code processed successfully',
          duration: 3000,
        });
      } else {
        setLoading(false);
        toast.error(response.data.message || 'Ticket validation unsuccessful!', {
          duration: 4000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || 'Ticket validation unsuccessful!', {
        duration: 4000,
      });
      console.error('Error manual scan: ', error);
    }
  };

  const handleManualDeScan = async (secret) => {
    try {
      setLoading(true);
      const response = await axiosSecure.post(`/api/v1/ticket/validate/${eventID}:${secret}`, { method: 'deScan' });
      fetchAttendees();
      if (response.data.data?.scanCount > 1) {
        setLoading(false);
        toast.success(response.data.message || 'Ticket De-Scan successful!', {
          description: `This QR code has been de-scanned ${response.data.data.scanCount} times`,
          duration: 4000,
        });
      } else if (response.data.data?.scanCount === 1 && response.data.success) {
        setLoading(false);
        toast.success(response.data.message || 'Ticket De-Scan successful!', {
          description: 'QR code processed successfully',
          duration: 3000,
        });
      } else {
        setLoading(false);
        toast.error(response.data.message || 'Ticket De-Scan unsuccessful!', {
          duration: 4000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || 'Ticket De-Scan unsuccessful!', {
        duration: 4000,
      });
      console.error('Error manual De-Scan: ', error);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [eventID, searchTerm, currentPage]);

  return (
    <ProtectedRoute requiredRole="STAFF">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
              Event Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-600`}>
                  {attendees.length * totalPages}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                  Total Tickets
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-green-600`}>
                  {stats.usedTickets}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                  Present
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-red-600`}>
                  {stats.unusedTickets}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                  Absent
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Attendees List
              </h2>
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-cyan-500">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider rounded-tl-lg">
                      Count
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                      Ticket Number
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {attendees.map((attendee, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                        {(currentPage - 1) * ticketsPerPage + (index + 1)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {attendee.ticketID}
                      </td>
                      <td className="px-4 py-4">
                        {loading ? (
                          <div className="flex justify-center">
                            <div className="animate-pulse bg-gray-200 h-9 rounded-full w-[110px] "></div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-center gap-2">
                            <button
                              onClick={() => handleBlockToggle(attendee._id, !attendee.isBlocked)}
                              className={`inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 min-w-[110px] ${attendee.isBlocked
                                ? 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200 focus:ring-red-500'
                                : 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 focus:ring-green-500'
                                }`}
                            >
                              {attendee.isBlocked ? 'Activate' : 'Block'}
                            </button>

                            <button
                              onClick={() => handleManualScan(attendee.secureToken)}
                              className="inline-flex items-center justify-center px-4 py-2 border border-green-300 text-green-700 text-sm font-medium rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors min-w-[110px]"
                            >
                              Scan {attendee.scanLogs.length > 0 && `(${attendee.scanLogs.length})`}
                            </button>

                            <button
                              onClick={() => handleManualDeScan(attendee.secureToken)}
                              className="inline-flex items-center justify-center px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors min-w-[110px]"
                            >
                              De-Scan {attendee.deScanLogs.length > 0 && `(${attendee.deScanLogs.length})`}
                            </button>

                            <button
                              onClick={() => handleDetailsClick(attendee)}
                              className="inline-flex items-center justify-center px-4 py-2 border border-yellow-300 text-yellow-700 text-sm font-medium rounded-full hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 transition-colors min-w-[110px]"
                            >
                              Details
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {attendees.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No attendees found matching your search.
              </div>
            )}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Attendance Rate
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {((attendees.filter(ticket => ticket.isUsed).length / (attendees.length * totalPages)) * 100).toFixed(2) || 0}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Event Status
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </div>
              </div>
              <div className="text-center md:col-span-2 lg:col-span-1">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Last Updated
                </div>
                <div className="text-gray-600">
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AttendeeDetailsModal
          attendee={selectedAttendee}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;