import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, CheckCircle, User, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useMutation } from 'react-query';
import { createBooking } from '../services/bookings';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMentors } from '../lib/hooks';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getImageUrl } from './admin/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export default function MentorBookingUI() {
  const [searchParams] = useSearchParams();
  const mentorId = searchParams.get('mentorId');
  const navigate = useNavigate();

  const { data: mentors, isLoading: isMentorsLoading } = useMentors();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const mentor = mentors?.find((m) => m.user.id === Number(mentorId));

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createBooking,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });

  useEffect(() => {
    if (!mentorId) {
      navigate('/');
      return;
    }
  }, [mentorId, navigate]);

  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00', available: true },
    { id: '2', time: '10:00', available: true },
    { id: '3', time: '11:00', available: true },
    { id: '4', time: '14:00', available: true },
    { id: '5', time: '15:00', available: true },
    { id: '6', time: '16:00', available: true },
    { id: '7', time: '17:00', available: true }
  ];

  // Get days in month
  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: number): void => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isDateAvailable = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);
    return date >= today;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBooking = async (): Promise<void> => {
    if (!selectedDate || !selectedTime) return;

    await mutateAsync({
      mentorId: Number(mentorId),
      start_date: selectedDate.toISOString().split('T')[0],
      end_time: selectedTime
    });

    setIsBooked(true);
    setStep(3);
  };

  const resetBooking = (): void => {
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(1);
    setIsBooked(false);
  };

  if (isMentorsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-white mt-10">
        {/* Mentor Info Section */}
        {mentor && (
          <div className="bg-linear-to-r from-orange-50 to-orange-100 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center">
                  {mentor.profilePhotoUrl ? (
                    <img
                      src={getImageUrl(mentor.profilePhotoUrl)}
                      alt={mentor.user.fullname}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-orange-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{mentor.user.fullname}</h2>
                  <p className="text-orange-600 font-medium">{mentor.headline}</p>
                </div>
              </div>

              {/* Stats and Rating */}
              {/* <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="font-bold text-lg">{mentor.rating || '4.9'}</span>
                  </div>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award size={16} className="text-blue-500" />
                    <span className="font-bold text-lg">{mentor.experience_years || '5+'}</span>
                  </div>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <User size={16} className="text-green-500" />
                    <span className="font-bold text-lg">{mentor.sessions_completed || '200+'}</span>
                  </div>
                  <p className="text-sm text-gray-600">Sessions</p>
                </div>
              </div> */}
            </div>

            {/* Bio/Description */}
            {mentor.introduction && (
              <div className="mt-4 p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{mentor.introduction}</p>
              </div>
            )}

            {/* Skills/Expertise */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-200 text-orange-800 text-sm rounded-full">
                  {mentor.skills.name}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Mentorship Session</h1>
          <p className="text-gray-600">
            Select your preferred date and time for your mentoring session with {mentor?.user.name}
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            {[
              { num: 1, label: 'Choose Date' },
              { num: 2, label: 'Select Time' },
              { num: 3, label: 'Confirmation' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s.num ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s.num ? <CheckCircle size={16} /> : s.num}
                </div>
                <span
                  className={`ml-2 text-sm ${step >= s.num ? 'text-orange-600' : 'text-gray-500'}`}
                >
                  {s.label}
                </span>
                {idx < 2 && <div className="w-8 h-px bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        {!isBooked ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={20} />
                  Select Date
                </h2>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      type="button"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-lg font-semibold">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      type="button"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((date, index) => (
                      <button
                        key={index}
                        disabled={!isDateAvailable(date)}
                        type="button"
                        className={`p-2 text-sm rounded-lg transition-all ${
                          date && isDateAvailable(date)
                            ? selectedDate?.toDateString() === date.toDateString()
                              ? 'bg-orange-600 text-white'
                              : 'hover:bg-orange-100 text-gray-900'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (isDateAvailable(date)) {
                            setSelectedDate(date);
                            if (step === 1) setStep(2);
                          }
                        }}
                      >
                        {date ? date.getDate() : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {step >= 2 && selectedDate && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock size={20} />
                    Choose Time
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots
                      .filter((slot) => slot.available)
                      .map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          className={`p-3 rounded-lg border transition-all ${
                            selectedTime === slot.time
                              ? 'bg-orange-600 text-white border-orange-600'
                              : 'bg-white border-gray-200 hover:border-orange-300'
                          }`}
                          onClick={() => setSelectedTime(slot.time)}
                        >
                          {slot.time}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {mentor && (
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Your Mentor</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                      {mentor.profilePhotoUrl ? (
                        <img
                          src={
                            mentor.profilePhotoUrl.startsWith('http')
                              ? mentor.profilePhotoUrl
                              : 'http://localhost:3000/' + mentor.profilePhotoUrl
                          }
                          alt={mentor.user.fullname}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-orange-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{mentor.user.fullname}</p>
                      <p className="text-sm text-orange-600">{mentor.headline}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{mentor.rating || '4.9'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white border rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Session Summary</h2>

                <div className="space-y-4">
                  {selectedDate && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} />
                        <span className="font-medium">{formatDate(selectedDate)}</span>
                      </div>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} />
                        <span className="font-medium">{selectedTime} (60 minutes)</span>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Booking Fee</span>
                      <span className="text-xl font-bold text-green-600">रु 75</span>
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
                    <button
                      onClick={handleBooking}
                      disabled={isLoading}
                      type="button"
                      className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      {isLoading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                  )}

                  {!selectedDate && (
                    <p className="text-sm text-gray-500 text-center">
                      Please select a date to continue
                    </p>
                  )}

                  {selectedDate && !selectedTime && (
                    <p className="text-sm text-gray-500 text-center">Please select a time slot</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-4">Booking Confirmed!</h2>
              <div className="space-y-3 mb-6">
                <p className="text-green-700">
                  Your mentorship session with {mentor?.user.fullname} has been successfully booked.
                </p>
                {selectedDate && (
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <Calendar size={16} />
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <Clock size={16} />
                    <span className="font-medium">{selectedTime} (60 minutes)</span>
                  </div>
                )}
              </div>
              <p className="text-green-600 mb-6">
                You'll receive a confirmation email with the session details and meeting link
                shortly.
              </p>
              <button
                onClick={resetBooking}
                type="button"
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
              >
                Book Another Session
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
