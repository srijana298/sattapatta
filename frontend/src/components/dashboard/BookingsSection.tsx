import React, { useState } from 'react';
import { Calendar, Filter, Search, Check, X, Clock } from 'lucide-react';
import { bookings } from '../../data/bookingsData';

type BookingStatus = 'all' | 'upcoming' | 'completed' | 'cancelled';
type BookingViewMode = 'list' | 'calendar';

const BookingsSection: React.FC = () => {
  const [status, setStatus] = useState<BookingStatus>('all');
  const [viewMode, setViewMode] = useState<BookingViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter bookings based on status and search query
  const filteredBookings = bookings.filter(booking => {
    // Status filter
    if (status !== 'all' && booking.status !== status) {
      return false;
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        booking.studentName.toLowerCase().includes(query) ||
        booking.topic.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Calculate session duration
  const getSessionDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();
    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    
    if (durationMinutes < 60) {
      return `${durationMinutes} mins`;
    }
    
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Bookings & Appointments</h1>
        <div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg 
                           transition-colors duration-150 ease-in-out shadow-sm">
            + Create Availability
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          {/* View toggle */}
          <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 
                       ${viewMode === 'list' 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-800'}`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 
                       ${viewMode === 'calendar' 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-800'}`}
            >
              Calendar
            </button>
          </div>
          
          {/* Status filter */}
          <div className="flex space-x-2 items-center">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Status:</span>
            {(['all', 'upcoming', 'completed', 'cancelled'] as BookingStatus[]).map((statusOption) => (
              <button
                key={statusOption}
                onClick={() => setStatus(statusOption)}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  status === statusOption
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm 
                       placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 
                       focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Bookings List */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Topic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={booking.studentAvatar}
                              alt={booking.studentName}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.studentName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.studentEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(booking.startTime)}</div>
                        <div className="text-sm text-gray-500">
                          {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{booking.topic}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getSessionDuration(booking.startTime, booking.endTime)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${getStatusBadge(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {booking.status === 'upcoming' && (
                            <>
                              <button className="text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 
                                               px-2 py-1 rounded-md transition-colors duration-150 ease-in-out">
                                Join
                              </button>
                              <button className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 
                                               px-2 py-1 rounded-md transition-colors duration-150 ease-in-out">
                                Reschedule
                              </button>
                              <button className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 
                                               px-2 py-1 rounded-md transition-colors duration-150 ease-in-out">
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === 'completed' && (
                            <button className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 
                                             px-2 py-1 rounded-md transition-colors duration-150 ease-in-out">
                              Notes
                            </button>
                          )}
                          {booking.status === 'cancelled' && (
                            <button className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 
                                             px-2 py-1 rounded-md transition-colors duration-150 ease-in-out">
                              Reschedule
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Calendar className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No bookings match your current filters.
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Calendar View - Placeholder for calendar implementation */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-orange-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Calendar View</h3>
            <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
              A full calendar implementation would be integrated here, showing appointments by day, week, or month.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsSection;