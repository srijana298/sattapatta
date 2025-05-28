import { useState } from 'react';
import { Calendar, Clock, User, MessageCircle, Star, MapPin, Award } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useBooking } from '../lib/hooks';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getImageUrl } from './admin/lib/utils';
import { useMutation } from 'react-query';
import { createConversation } from '../services/conversation';

const BookingDetailsPage = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: booking, isLoading } = useBooking(id);

  // const booking = {
  //   id: 1,
  //   mentorName: 'Rajesh Sharma',
  //   mentorTitle: 'Senior Software Engineer at Foodmandu',
  //   mentorAvatar: '/api/placeholder/120/120',
  //   mentorBio:
  //     'Experienced software engineer with 8+ years in full-stack development. Specialized in React, Node.js, and system architecture. Previously worked at eSewa and now leading the tech team at Foodmandu.',
  //   mentorRating: 4.8,
  //   mentorReviews: 127,
  //   mentorLocation: 'Kathmandu, Nepal',
  //   mentorEmail: 'rajesh.sharma@example.com',
  //   mentorPhone: '+977-9841234567',

  //   bookingId: 'MTC-2024-001',
  //   date: '2024-05-28',
  //   time: '10:00 AM - 11:00 AM',
  //   duration: '1 hour',
  //   amount: 2500,
  //   status: 'confirmed',
  //   sessionType: 'video_call',
  //   topic: 'React Development & Career Guidance',
  //   description:
  //     'I want to discuss best practices for React development, state management patterns, and get guidance on career progression in software engineering.',
  //   bookingDate: '2024-05-20',
  //   paymentMethod: 'eSewa',
  //   paymentStatus: 'completed',

  //   // Session details
  //   sessionLink: 'https://meet.google.com/abc-defg-hij',
  //   sessionPassword: 'mentor123',
  //   sessionNotes:
  //     'Please have your code repository ready for review. We will also discuss career roadmap and skill development strategies.',

  //   // Additional info
  //   expertise: ['React.js', 'Node.js', 'System Architecture', 'Career Guidance'],
  //   languages: ['English', 'Nepali', 'Hindi'],
  //   experience: '8+ years',

  //   // Rating (if completed)
  //   userRating: null,
  //   userReview: null
  // };
  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: ({ receiver_id }: { receiver_id: number }) => createConversation({ receiver_id }),
    onSuccess: (data: string) => {
      navigate('/messages/' + data);
    }
  });

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${interactive ? 'cursor-pointer' : ''} ${
          i < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  console.log('Booking Details:', booking);

  if (isLoading || !booking) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Session Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-gray-900">{booking?.createdAt}</div>
                      <div className="text-sm text-gray-500">Session Date</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-gray-900">{booking?.start_date}</div>
                      <div className="text-sm text-gray-500">Duration: 1 Hour</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-medium text-gray-900">Video Call</div>
                      <div className="text-sm text-gray-500">Session Type</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-gray-900">{booking?.createdAt}</div>
                      <div className="text-sm text-gray-500">Booked On</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Fee</span>
                  <span className="font-medium">₹{booking?.mentor.mentor_profile.hourly_rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium">NPR 0</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total Amount</span>
                  <span className="font-bold text-orange-600">
                    ₹{booking?.mentor.mentor_profile.hourly_rate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <div className="text-center mb-4">
                <img
                  src={getImageUrl(booking?.mentor.mentor_profile.profilePhotoUrl)}
                  alt={booking?.mentor.fullname}
                  className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-orange-200"
                />
                <h3 className="text-xl font-semibold text-gray-900">{booking?.mentor.fullname}</h3>
                <p className="text-gray-600">{booking?.mentor.mentor_profile.skills.name}</p>
                {/* <div className="flex items-center justify-center space-x-1 mt-2">
                  {renderStars(Math.floor(booking.mentorRating))}
                  <span className="text-sm text-gray-600 ml-1">
                    {booking.mentorRating} ({booking.mentorReviews} reviews)
                  </span>
                </div> */}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    {booking?.mentor.mentor_profile.countryOfBirth}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-14 h-14 text-gray-400" />
                  <span className="text-gray-600">{booking?.mentor.mentor_profile.experience}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                  onClick={() => sendMessage({ receiver_id: booking?.mentor.id })}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Mentor</span>
                </button>
                <Link
                  className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  to={`/mentors/${booking?.mentor.mentor_profile.id}`}
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancel Booking</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Booking
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Your Session</h3>
            <div className="text-center mb-4">
              <p className="text-gray-600 mb-3">How was your session with {booking.mentorName}?</p>
              <div className="flex justify-center space-x-1 mb-4">
                {renderStars(rating, true, setRating)}
              </div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review (optional)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                rows={4}
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingDetailsPage;
