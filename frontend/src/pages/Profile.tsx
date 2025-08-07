import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  MapPin,
  BookOpen,
  Award,
  Calendar,
  MessageCircle,
  CheckCircle,
  Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useMentor } from '../lib/hooks';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useMutation } from 'react-query';
import { createConversation } from '../services/conversation';

const MentorProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { data: mentorData, isLoading } = useMentor(id);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const tabContentVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -2,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: ({ receiver_id }: { receiver_id: number }) => createConversation({ receiver_id }),
    onSuccess: (data: string) => {
      navigate('/messages/' + data);
    }
  });

  const renderStars = (rating?: number) => {
    if (rating === undefined || rating === null) {
      return Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <Star className="w-4 h-4 text-gray-300" />
        </motion.div>
      ));
    }
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, duration: 0.3 }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <Star
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? 'text-orange-400 fill-orange-400'
              : i < rating
                ? 'text-orange-400 fill-orange-200'
                : 'text-gray-300'
          }`}
        />
      </motion.div>
    ));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
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
                <motion.div
                  className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>

            <motion.div className="flex-1" variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                <motion.h1
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {mentorData?.user.fullname}
                </motion.h1>
                {mentorData?.isVerified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </motion.div>
                )}
              </div>

              <motion.p
                className="text-xl text-orange-100 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {mentorData?.headline}
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4 text-orange-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{mentorData?.countryOfBirth}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{mentorData?.skill_category.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    {renderStars(mentorData?.ratingStats.bayesianRating)}
                  </div>
                  <span className="ml-1">
                    {mentorData?.ratingStats.bayesianRating} ({mentorData?.ratingStats.totalReviews}{' '}
                    reviews)
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-3" variants={itemVariants}>
              <motion.button
                className="cursor-pointer bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2"
                variants={buttonVariants}
                onClick={() => navigate('/send-booking-request?mentorId=' + mentorData?.id)}
                whileHover="hover"
                whileTap="tap"
              >
                <Calendar className="w-5 h-5" />
                Book Session - रु{mentorData?.hourly_rate}/hr
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <motion.div
              className="flex border-b border-gray-200 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {['about', 'reviews'].map((tab, index) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium capitalize transition-colors relative ${
                    activeTab === tab ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                      layoutId="activeTab"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  className="space-y-8"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Introduction */}
                  <motion.div
                    className="bg-white rounded-lg p-6 shadow-sm"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">About Me</h3>
                    <p className="text-gray-700 leading-relaxed">{mentorData?.introduction}</p>
                  </motion.div>

                  {/* Experience */}
                  <motion.div
                    className="bg-white rounded-lg p-6 shadow-sm"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience</h3>
                    <p className="text-gray-700 leading-relaxed">{mentorData?.experience}</p>
                  </motion.div>

                  {/* Motivation */}
                  <motion.div
                    className="bg-white rounded-lg p-6 shadow-sm"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Why I Mentor</h3>
                    <p className="text-gray-700 leading-relaxed">{mentorData?.motivation}</p>
                  </motion.div>

                  {/* Education */}
                  {mentorData?.educations && mentorData.educations.length > 0 && (
                    <motion.div
                      className="bg-white rounded-lg p-6 shadow-sm"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-orange-600" />
                        Education
                      </h3>
                      <div className="space-y-4">
                        {mentorData?.educations.map((edu, index) => (
                          <motion.div
                            key={index}
                            className="border-l-4 border-orange-200 pl-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          >
                            <h4 className="font-semibold text-gray-900">
                              {edu.degree} in {edu.degree_type}
                            </h4>
                            <p className="text-orange-600 font-medium">{edu.university}</p>
                            <p className="text-gray-600 text-sm">
                              {edu.start_year} - {edu.end_year}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Certificates */}
                  {mentorData?.certificates && mentorData.certificates.length > 0 && (
                    <motion.div
                      className="bg-white rounded-lg p-6 shadow-sm"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-600" />
                        Certifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mentorData.certificates.map((cert, index) => (
                          <motion.div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            whileHover={{
                              scale: 1.05,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              transition: { duration: 0.2 }
                            }}
                          >
                            <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                            <p className="text-orange-600">{cert.issuedBy}</p>
                            <p className="text-gray-600 text-sm">
                              {cert.start_year} - {cert.end_year}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  className="space-y-6"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    className="bg-white rounded-lg p-6 shadow-sm"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Reviews & Ratings</h3>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {renderStars(mentorData?.ratingStats.bayesianRating)}
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            {mentorData?.ratingStats.bayesianRating}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {mentorData?.ratingStats.totalReviews} total reviews
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-4">
                    {mentorData?.reviews &&
                      mentorData.reviews.map((review, index) => (
                        <motion.div
                          key={review.id}
                          className="bg-white rounded-lg p-6 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{
                            y: -2,
                            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                            transition: { duration: 0.2 }
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {review.reviewer.fullname}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex gap-1">{renderStars(review.rating)}</div>
                                <span className="text-gray-600 text-sm">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Pricing */}
            <motion.div
              className="bg-white rounded-lg p-6 shadow-sm"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
              <div className="space-y-4">
                <motion.div
                  className="border border-gray-200 rounded-lg p-4"
                  whileHover={{
                    borderColor: '#fb923c',
                    boxShadow: '0 4px 12px rgba(251, 146, 60, 0.1)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Regular Session</span>
                    <motion.span
                      className="text-2xl font-bold text-gray-900"
                      whileHover={{ scale: 1.1, color: '#fb923c' }}
                      transition={{ duration: 0.2 }}
                    >
                      रु{mentorData?.hourly_rate}/hr
                    </motion.span>
                  </div>
                  <p className="text-gray-600 text-sm">60-minute mentoring session</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-6 shadow-sm"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="space-y-3">
                <motion.button
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  onClick={() => sendMessage({ receiver_id: mentorData!.user.id })}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default MentorProfile;
