import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Video,
  MessageCircle,
  Star,
  MapPin,
  Download,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Award
} from 'lucide-react';

const BookingDetailsPage = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  // Sample booking data - in real app, this would come from props or API
  const booking = {
    id: 1,
    mentorName: 'Rajesh Sharma',
    mentorTitle: 'Senior Software Engineer at Foodmandu',
    mentorAvatar: '/api/placeholder/120/120',
    mentorBio:
      'Experienced software engineer with 8+ years in full-stack development. Specialized in React, Node.js, and system architecture. Previously worked at eSewa and now leading the tech team at Foodmandu.',
    mentorRating: 4.8,
    mentorReviews: 127,
    mentorLocation: 'Kathmandu, Nepal',
    mentorEmail: 'rajesh.sharma@example.com',
    mentorPhone: '+977-9841234567',

    // Booking details
    bookingId: 'MTC-2024-001',
    date: '2024-05-28',
    time: '10:00 AM - 11:00 AM',
    duration: '1 hour',
    amount: 2500,
    status: 'confirmed',
    sessionType: 'video_call',
    topic: 'React Development & Career Guidance',
    description:
      'I want to discuss best practices for React development, state management patterns, and get guidance on career progression in software engineering.',
    bookingDate: '2024-05-20',
    paymentMethod: 'eSewa',
    paymentStatus: 'completed',

    // Session details
    sessionLink: 'https://meet.google.com/abc-defg-hij',
    sessionPassword: 'mentor123',
    sessionNotes:
      'Please have your code repository ready for review. We will also discuss career roadmap and skill development strategies.',

    // Additional info
    expertise: ['React.js', 'Node.js', 'System Architecture', 'Career Guidance'],
    languages: ['English', 'Nepali', 'Hindi'],
    experience: '8+ years',

    // Rating (if completed)
    userRating: null,
    userReview: null
  };

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200',
        icon: CheckCircle
      },
      completed: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200',
        icon: CheckCircle
      },
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        icon: AlertCircle
      },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: XCircle }
    };
    return badges[status] || badges.pending;
  };

  const getStatusText = (status) => {
    const statusTexts = {
      confirmed: 'Confirmed',
      completed: 'Completed',
      pending: 'Pending Approval',
      cancelled: 'Cancelled'
    };
    return statusTexts[status] || 'Unknown';
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${interactive ? 'cursor-pointer' : ''} ${
          i < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
        }`}
        onClick={interactive ? () => onRate(i + 1) : undefined}
      />
    ));
  };

  const statusBadge = getStatusBadge(booking.status);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
                <p className="text-gray-600">Booking ID: {booking.bookingId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`w-6 h-6 ${statusBadge.text}`} />
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}
                  >
                    {getStatusText(booking.status)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">
                    NPR {booking.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Payment {booking.paymentStatus}</div>
                </div>
              </div>

              {booking.status === 'confirmed' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Your session is confirmed!</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    You will receive a reminder 30 minutes before the session starts.
                  </p>
                </div>
              )}
            </div>

            {/* Session Information */}
            <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Session Information</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{booking.topic}</h3>
                  <p className="text-gray-600">{booking.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-gray-900">{booking.date}</div>
                      <div className="text-sm text-gray-500">Session Date</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-gray-900">{booking.time}</div>
                      <div className="text-sm text-gray-500">Duration: {booking.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {booking.sessionType === 'video_call' ? (
                      <Video className="w-5 h-5 text-orange-500" />
                    ) : (
                      <MessageCircle className="w-5 h-5 text-orange-500" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {booking.sessionType === 'video_call' ? 'Video Call' : 'Chat Session'}
                      </div>
                      <div className="text-sm text-gray-500">Session Type</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-gray-900">{booking.bookingDate}</div>
                      <div className="text-sm text-gray-500">Booked On</div>
                    </div>
                  </div>
                </div>

                {booking.status === 'confirmed' && booking.sessionType === 'video_call' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Session Access Details</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-600">Meeting Link: </span>
                        <a
                          href={booking.sessionLink}
                          className="text-orange-600 hover:text-orange-700 font-medium"
                        >
                          Join Video Call
                        </a>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Meeting ID: </span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {booking.sessionPassword}
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                {booking.sessionNotes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Session Notes</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {booking.sessionNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Fee</span>
                  <span className="font-medium">NPR {booking.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium">NPR 0</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total Amount</span>
                  <span className="font-bold text-orange-600">
                    NPR {booking.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="text-gray-900">{booking.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="text-green-600 capitalize">{booking.paymentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentor Profile */}
            <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <div className="text-center mb-4">
                <img
                  src={booking.mentorAvatar}
                  alt={booking.mentorName}
                  className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-orange-200"
                />
                <h3 className="text-xl font-semibold text-gray-900">{booking.mentorName}</h3>
                <p className="text-gray-600">{booking.mentorTitle}</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  {renderStars(Math.floor(booking.mentorRating))}
                  <span className="text-sm text-gray-600 ml-1">
                    {booking.mentorRating} ({booking.mentorReviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{booking.mentorLocation}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{booking.experience} experience</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-gray-900">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {booking.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-gray-900">Languages</h4>
                <p className="text-sm text-gray-600">{booking.languages.join(', ')}</p>
              </div>

              <p className="text-sm text-gray-600 mb-4">{booking.mentorBio}</p>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Mentor</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {booking.status === 'confirmed' && (
                  <>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Join Session
                    </button>
                    <button className="w-full border border-orange-300 text-orange-700 py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors">
                      Reschedule
                    </button>
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="w-full border border-red-300 text-red-700 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                {booking.status === 'completed' && !booking.userRating && (
                  <button
                    onClick={() => setShowRatingModal(true)}
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    Rate & Review
                  </button>
                )}
                {booking.status === 'completed' && (
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Book Again
                  </button>
                )}
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
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

      {/* Rating Modal */}
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
                rows="4"
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
    </div>
  );
};

export default BookingDetailsPage;
