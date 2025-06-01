import { useState } from 'react';
import {
  Star,
  MapPin,
  Clock,
  BookOpen,
  Award,
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  Users,
  TrendingUp,
  Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useMentor } from '../lib/hooks';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MentorProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const { id } = useParams<{ id: string }>();

  const { data: mentorData, isLoading } = useMentor(id);

  const renderStars = (rating?: number) => {
    if (rating === undefined || rating === null) {
      return Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="w-4 h-4 text-gray-300" />
      ));
    }
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-orange-400 fill-orange-400'
            : i < rating
              ? 'text-orange-400 fill-orange-200'
              : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={
                  mentorData?.profilePhotoUrl.startsWith('http')
                    ? mentorData?.profilePhotoUrl
                    : 'http://localhost:3000/' + mentorData?.profilePhotoUrl
                }
                alt={mentorData?.user.fullname}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {mentorData?.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{mentorData?.user.fullname}</h1>
                {mentorData?.isVerified && <CheckCircle className="w-6 h-6 text-green-400" />}
              </div>

              <p className="text-xl text-orange-100 mb-3">{mentorData?.headline}</p>

              <div className="flex flex-wrap items-center gap-4 text-orange-100">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{mentorData?.countryOfBirth}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{mentorData?.skill_category.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(mentorData?.ratingStats.bayesianRating)}
                  <span className="ml-1">
                    {mentorData?.ratingStats.rawAverage} ({mentorData?.ratingStats.totalReviews}{' '}
                    reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="cursor-pointer bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Session - रु{mentorData?.hourly_rate}/hr
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              {['about', 'reviews', 'availability'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'about' && (
              <div className="space-y-8">
                {/* Introduction */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About Me</h3>
                  <p className="text-gray-700 leading-relaxed">{mentorData?.introduction}</p>
                </div>

                {/* Experience */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience</h3>
                  <p className="text-gray-700 leading-relaxed">{mentorData?.experience}</p>
                </div>

                {/* Motivation */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Why I Mentor</h3>
                  <p className="text-gray-700 leading-relaxed">{mentorData?.motivation}</p>
                </div>

                {/* Education */}
                {mentorData?.educations && mentorData.educations.length > 0 && (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                      Education
                    </h3>
                    <div className="space-y-4">
                      {mentorData?.educations.map((edu, index) => (
                        <div key={index} className="border-l-4 border-orange-200 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            {edu.degree} in {edu.degree_type}
                          </h4>
                          <p className="text-orange-600 font-medium">{edu.university}</p>
                          <p className="text-gray-600 text-sm">
                            {edu.start_year} - {edu.end_year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificates */}
                {mentorData?.certificates && mentorData.certificates.length > 0 && (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-orange-600" />
                      Certifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mentorData.certificates.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                          <p className="text-orange-600">{cert.issuedBy}</p>
                          <p className="text-gray-600 text-sm">
                            {cert.start_year} - {cert.end_year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Reviews & Ratings</h3>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(mentorData?.ratingStats.bayesianRating)}
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                          {mentorData?.ratingStats.rawAverage}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {mentorData?.ratingStats.totalReviews} total reviews
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {mentorData?.reviews &&
                    mentorData.reviews.map((review) => (
                      <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.reviewer.fullname}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="text-gray-600 text-sm">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                </div>

                {/* {mentorData.reviews.length > 3 && (
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="w-full bg-orange-50 text-orange-600 py-3 rounded-lg font-medium hover:bg-orange-100 transition-colors"
                  >
                    {showAllReviews ? 'Show Less' : `Show All ${mentorData.reviews.length} Reviews`}
                  </button>
                )} */}
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Weekly Availability
                </h3>
                <div className="space-y-3">
                  {mentorData?.availabilities.map((slot, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-900">{slot.day_of_week}</span>
                      <span className="text-gray-600">
                        {slot.start_time} - {slot.end_time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <p className="text-orange-800 text-sm">
                    <strong>Note:</strong> Times are shown in the mentor's local timezone. Book a
                    session to see available slots in your timezone.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-600">Students Mentored</span>
                  </div>
                  <span className="font-semibold">200+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-600">Success Rate</span>
                  </div>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-600">Response Time</span>
                  </div>
                  <span className="font-semibold"> 2 hours</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Regular Session</span>
                    <span className="text-2xl font-bold text-gray-900">
                      रु{mentorData?.hourly_rate}/hr
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">60-minute mentoring session</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="space-y-3">
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfile;
