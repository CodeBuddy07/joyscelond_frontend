import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ProtectedRoute } from '../../lib/ProtectedRoute';
import axiosSecure from '../../lib/axiosSecure';
import Pagination from '../../lib/Pagination';
import { toast } from 'sonner';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const eventID = JSON.parse(localStorage.getItem('staffInfo'))?.eventID || 'event-id-not-found';
  const [attendees, setAttendees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ticketsPerPage = 10;

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
      } else {
        console.error('Failed to fetch attendees:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };


  const handleBlockToggle = async (ticketID, block) => {
    try {
      const response = await axiosSecure.patch(`/api/v1/ticket/block/${ticketID}`, { block });
      console.log(response);
      if (response.data.success) {
        fetchAttendees();
      } else {
        console.error('Failed to block/unblock ticket:', response.data.message);
      }
    } catch (error) {
      console.error('Error blocking/unblocking ticket:', error);
    }
  };

  const handleManualScan = async (secret) => {
    try {
      const response = await axiosSecure.post(`/api/v1/ticket/validate/${eventID}:${secret}`);
      console.log(response);
      if (response.data.data?.scanCount > 1) {
        toast.warning('Duplicate Scan Detected!', {
          description: `This QR code has been scanned ${response.data.data.scanCount} times`,
          duration: 4000,
        });
      } else if (response.data.data?.scanCount === 1 && response.data.success) {
        toast.success(response.data.message || 'Ticket validation successful!', {
          description: 'QR code processed successfully',
          duration: 3000,
        });
      } else {
        toast.error(response.data.message || 'Ticket validation unsuccessful!', {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Ticket validation unsuccessful!', {
        duration: 4000,
      });
      console.error('Error manual scan: ', error);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [eventID, searchTerm, currentPage]);

  return (
    <ProtectedRoute requiredRole="STAFF">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
              Event Dashboard
            </h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-600`}>
                  {attendees.length * totalPages}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                  Attendees
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-red-600`}>
                  {(attendees.length * totalPages) - attendees.filter(ticket => ticket.isUsed).length}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                  Absent
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-green-600`}>
                  {attendees.filter(ticket => ticket.isUsed).length}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                  Present
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          {/* <div className="mt-12 bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8">
              Event Attendees chart
            </h2>
            <div className="h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                    domain={[0, 500]}
                    ticks={[20, 50, 300, 500]}
                  />
                  <Bar
                    dataKey="attendees"
                    fill="#22d3ee"
                    radius={[4, 4, 0, 0]}
                    barSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div> */}

          {/* Attendees List Section */}
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="bg-cyan-400 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold rounded-l-lg">
                      Count
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Ticket Number
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold rounded-r-lg">
                      Active
                    </th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="bg-white">
                  {attendees.map((attendee, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {(currentPage - 1) * ticketsPerPage + (index + 1)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-center">
                        {attendee.ticketID}
                      </td>
                      <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                        <button onClick={() => handleBlockToggle(attendee._id, !attendee.isBlocked)} className="inline-flex items-center px-4 py-1 border border-red-300 text-red-600 text-sm font-medium rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
                          {attendee.isBlocked ? 'Activate' : 'Block'}
                        </button>

                        <button onClick={() => handleManualScan(attendee.secureToken)} className="inline-flex items-center px-4 py-1 border border-green-300 text-green-600 text-sm font-medium rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                          Manual Scan
                        </button>
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

            {/* No results message */}
            {attendees.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No attendees found matching your search.
              </div>
            )}
          </div>

          {/* Additional Info Section */}
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
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;