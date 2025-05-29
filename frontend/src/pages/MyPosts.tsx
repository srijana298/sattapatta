import { useState, useMemo } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, Users, Star, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useMutation, useQuery } from 'react-query';
import { getBookings } from '../services/bookings';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { MentorProfile } from '../services/users';
import { createRating } from '../services/mentor';
import { mentorData } from '../data/mentorData';
import toast from 'react-hot-toast';

const RatingModal = ({ mentor, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Rate your experience</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex items-center mb-6 bg-orange-50 rounded-xl p-4">
          <img 
            src={mentor.profilePhotoUrl} 
            alt={mentor.fullname}
            className="w-14 h-14 rounded-full object-cover border-2 border-orange-300"
          />
          <div className="ml-4">
            <h4 className="font-medium text-gray-900">{mentor.fullname}</h4>
            <p className="text-sm text-gray-600">{mentor.headline}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your rating</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hover || rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your feedback (optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Share your experience with this mentor..."
          ></textarea>
        </div>
        
        <button
          onClick={() => onSubmit({ rating, comment })}
          disabled={rating === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium ${
            rating > 0
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

const MyBookingsPage = () => {
  const { data: bookings, isLoading } = useQuery({
    queryFn: getBookings,
    queryKey: 'get_bookings'
  });

  const { mutateAsync, isLoading: isRating } = useMutation({
    mutationFn: (data: {
      comment: string;
      rating: number;
      mentorId: number;
    }) => {
      return createRating(data);
    },
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
    }
  })
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedMentors, setExpandedMentors] = useState<Record<string, boolean>>({});
  const [ratingMentor, setRatingMentor] = useState<MentorProfile | null>(null);

  // Process bookings to mark past sessions as completed
  const processedBookings = useMemo(() => {
    // Your existing processing code
    if (!bookings) return [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    return bookings.map(booking => {
      const bookingDate = new Date(booking.start_date);

      if (bookingDate < today && booking.status === 'confirmed') {
        return {
          ...booking,
          status: 'completed',
        };
      }

      const now = new Date();
      const diffMs = bookingDate.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours > 0 && diffHours <= 48 && booking.status === 'confirmed') {
        return {
          ...booking,
          status: 'upcoming'
        };
      }
      
      return booking;
    });
  }, [bookings]);

  // Your existing helper functions
  const getStatusBadge = (status) => { /* ... */ };
  const getStatusText = (status) => { /* ... */ };
  
  const filteredBookings = processedBookings?.filter((booking) => {
    const matchesSearch = booking.mentor.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || booking.status === selectedFilter;
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    return matchesSearch && matchesFilter && matchesTab;
  });

  // Group bookings by mentor
  const bookingsByMentor = useMemo(() => {
    if (!filteredBookings) return {};
    
    return filteredBookings.reduce((groups, booking) => {
      const mentorId = booking.mentor.mentor_profile.id;
      if (!groups[mentorId]) {
        groups[mentorId] = {
          mentorInfo: {
            id: mentorId,
            fullname: booking.mentor.fullname,
            profilePhotoUrl: booking.mentor.mentor_profile.profilePhotoUrl,
            headline: booking.mentor.mentor_profile.headline
          },
          bookings: [],
          hasCompletedSession: false
        };
      }
      
      groups[mentorId].bookings.push(booking);
      
      // Check if there's at least one completed session
      if (booking.status === 'completed') {
        groups[mentorId].hasCompletedSession = true;
      }
      
      return groups;
    }, {});
  }, [filteredBookings]);

   const toggleMentorExpanded = (mentorId) => {
    setExpandedMentors(prev => ({
      ...prev,
      [mentorId]: !prev[mentorId]
    }));
  };

  const handleRating = (mentorInfo: MentorProfile) => {
    setRatingMentor(mentorInfo);
  };


  const handleRatingSubmit = async (ratingData:{
    comment: string; 
    rating: number; 
  } ) => {
    setRatingMentor(null);
    await mutateAsync({
      mentorId: ratingMentor!.id,
      ...ratingData});
  };

  if (isLoading || isRating) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Your existing UI elements - tabs, search, etc. */}
          
          <div className="space-y-6">
            {Object.keys(bookingsByMentor).length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              Object.values(bookingsByMentor).map((mentorGroup: any) => (
                <div
                  key={mentorGroup.mentorInfo.id}
                  className="bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden"
                >
                  {/* Mentor header - always visible */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex items-center space-x-4 flex-1 cursor-pointer"
                        onClick={() => toggleMentorExpanded(mentorGroup.mentorInfo.id)}
                      >
                        <img
                          src={mentorGroup.mentorInfo.profilePhotoUrl}
                          alt={mentorGroup.mentorInfo.fullname}
                          className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {mentorGroup.mentorInfo.fullname}
                          </h3>
                          <p className="text-gray-600">
                            {mentorGroup.mentorInfo.headline}
                          </p>
                          <div className="flex items-center mt-1 text-sm">
                            <Users className="w-4 h-4 text-orange-500 mr-1" />
                            <span className="text-orange-700 font-medium">
                              {mentorGroup.bookings.length} {mentorGroup.bookings.length === 1 ? 'Session' : 'Sessions'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Rating button - only shows if there's at least one completed session */}
                        {mentorGroup.hasCompletedSession && (
                          <button
                            onClick={() => handleRating(mentorGroup.mentorInfo)}
                            className="flex items-center space-x-1 bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-2 rounded-lg transition-colors"
                          >
                            <Star className="w-4 h-4" />
                            <span className="font-medium text-sm">Rate Mentor</span>
                          </button>
                        )}
                        
                        <button 
                          onClick={() => toggleMentorExpanded(mentorGroup.mentorInfo.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          {expandedMentors[mentorGroup.mentorInfo.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bookings for this mentor - expandable */}
                  {expandedMentors[mentorGroup.mentorInfo.id] && (
                    <div className="divide-y divide-gray-100">
                      {mentorGroup.bookings.map((booking) => (
                        <div key={booking.id} className="p-6 pl-24">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                <span>{booking.start_date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span>{booking.end_time}</span>
                              </div>
                            </div>
                            
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                                booking.status
                              )}`}
                            >
                              {getStatusText(booking.status)}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-end mt-4">
                            <Link
                              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                              to={`/my-bookings/${booking.id}`}
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Your existing summary section */}
          {filteredBookings?.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{processedBookings.length}</div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {processedBookings?.filter((b) => b.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {processedBookings?.filter((b) => b.status === 'upcoming').length}
                  </div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Object.keys(bookingsByMentor).length}
                  </div>
                  <div className="text-sm text-gray-600">Total Mentors</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Rating Modal */}
      {ratingMentor && (
        <RatingModal 
          mentor={ratingMentor} 
          onClose={() => setRatingMentor(null)} 
          onSubmit={handleRatingSubmit}
        />
      )}
    </>
  );
};

export default MyBookingsPage;