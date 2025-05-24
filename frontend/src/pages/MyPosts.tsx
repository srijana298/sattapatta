import { useState } from 'react';
import { Calendar, Clock, Video, MessageCircle, Star, Search, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-query';
import { getBookings } from '../services/bookings';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MyBookingsPage = () => {
  const { data: bookings, isLoading } = useQuery({
    queryFn: getBookings,
    queryKey: 'get_bookings'
  });
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return badges[status] || badges.pending;
  };

  const getStatusText = (status: string) => {
    const statusTexts = {
      confirmed: 'Confirmed',
      completed: 'Completed',
      pending: 'Pending Approval',
      cancelled: 'Cancelled'
    };
    return statusTexts[status] || 'Unknown';
  };

  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch = booking.mentor.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || booking.status === selectedFilter;
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    return matchesSearch && matchesFilter && matchesTab;
  });

  const tabs = [
    { id: 'all', label: 'All Bookings', count: bookings?.length },
    {
      id: 'confirmed',
      label: 'Upcoming',
      count: bookings?.filter((b) => b.status === 'confirmed').length
    },
    {
      id: 'completed',
      label: 'Completed',
      count: bookings?.filter((b) => b.status === 'completed').length
    },
    {
      id: 'pending',
      label: 'Pending',
      count: bookings?.filter((b) => b.status === 'pending').length
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-orange-100 mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activeTab === tab.id
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              filteredBookings?.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={booking.mentor.mentor_profile.profilePhotoUrl}
                          alt={booking.mentor.fullname}
                          className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {booking.mentor.fullname}
                              </h3>
                              <p className="text-gray-600">
                                {booking.mentor.mentor_profile.headline}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(booking.status)}`}
                            >
                              {getStatusText(booking.status)}
                            </span>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <span>{booking.start_date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-orange-500" />
                              <span>{booking.end_time}</span>
                            </div>
                            {/* <div className="flex items-center space-x-1">
                              <span className="font-medium text-orange-600">
                                NPR {booking.amount.toLocaleString()}
                              </span>
                            </div> */}
                          </div>

                          {/* {booking.status === 'completed' && booking.rating && (
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-sm text-gray-600">Your rating:</span>
                              <div className="flex items-center space-x-1">
                                {renderStars(booking.rating)}
                              </div>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        {booking.status === 'completed' && !booking.rating && (
                          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                            Rate & Review
                          </button>
                        )}
                      </div>
                      <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Stats */}
          {filteredBookings?.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{bookings.length}</div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {bookings?.filter((b) => b.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {bookings?.filter((b) => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
                {/* <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    NPR{' '}
                    {bookings
                      .reduce((total, booking) => total + booking., 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookingsPage;
