import React, { useState, useRef } from 'react';
import { Calendar, Filter, Search, User, Video, X } from 'lucide-react';
import { LoadingSpinner } from '../LoadingSpinner';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../../api';

type BookingStatus = 'all' | 'upcoming' | 'completed' | 'cancelled';

const BookingsSection: React.FC = () => {
  const [status, setStatus] = useState<BookingStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery('mentor-bookings', async () => {
    const response = await api.get('/mentor/bookings');
    return response.data;
  });

  const updateBookingStatus = useMutation(
    async ({ id, status }: { id: number; status: string }) => {
      return await api.patch(`/bookings/${id}`, { status });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mentor-bookings');
      }
    }
  );

  const handleCancelBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      updateBookingStatus.mutate({ id: bookingId, status: 'cancelled' });
    }
  };

  const handleCompleteBooking = (bookingId: number) => {
    updateBookingStatus.mutate({ id: bookingId, status: 'completed' });
  };

  const generateMeetingLink = (booking: any) => {
    // Create a unique meeting ID based on booking details
    const meetingData = `${booking.id}-${booking.mentor.id}-${booking.mentee.id}-${booking.start_date}`;
    // Use a simple hash function for client-side
    const meetingHash = btoa(meetingData).substring(0, 12);
    const roomName = `sattapatta-meeting-${meetingHash}`;
    return `https://meet.jit.si/${roomName}`;
  };

  const handleJoinMeeting = (booking: any) => {
    window.open(generateMeetingLink(booking), '_blank');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const filteredBookings = bookings?.filter((booking) => {
    if (status !== 'all' && booking.status !== status) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        booking.mentee.fullname.toLowerCase().includes(query) ||
        booking.mentee.email.toLowerCase().includes(query) ||
        booking.start_date.toLowerCase().includes(query) ||
        booking.end_time.toLowerCase().includes(query) ||
        booking.status.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Bookings & Appointments</h1>
        <div>
          {/* <button
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg
                           transition-colors duration-150 ease-in-out shadow-sm"
            disabled
          >
            + Create Availability
          </button> */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex space-x-2 items-center">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Status:</span>
            {(['all', 'upcoming', 'completed', 'cancelled'] as BookingStatus[]).map(
              (statusOption) => (
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
              )
            )}
          </div>

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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredBookings && filteredBookings.length > 0 ? (
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
                        <User className="h-5 w-5" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.mentee.fullname}
                          </div>
                          <div className="text-sm text-gray-500">{booking.mentee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(booking.start_date)}</div>
                      <div className="text-sm text-gray-500">{booking.end_time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">1 Hour</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${getStatusBadge(booking.status)}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                          <>
                            {(() => {
                              const bookingDate = new Date(booking.start_date);
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              bookingDate.setHours(0, 0, 0, 0);

                              if (bookingDate.getTime() === today.getTime()) {
                                // Today's booking - show Join Now button
                                return (
                                  <button
                                    onClick={() => handleJoinMeeting(booking)}
                                    className="flex items-center text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100
                                             px-2 py-1 rounded-md transition-colors duration-150 ease-in-out"
                                  >
                                    <Video className="h-4 w-4 mr-1" /> Join Now
                                  </button>
                                );
                              } else {
                                // Past booking - show Mark as Completed button
                                return (
                                  <button
                                    onClick={() => handleCompleteBooking(booking.id)}
                                    className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100
                                             px-2 py-1 rounded-md transition-colors duration-150 ease-in-out"
                                  >
                                    Mark as Completed
                                  </button>
                                );
                              }
                            })()}
                          </>
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
            <p className="mt-1 text-sm text-gray-500">No bookings match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsSection;
