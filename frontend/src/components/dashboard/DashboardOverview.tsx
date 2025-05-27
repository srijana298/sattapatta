import React from 'react';
import { Calendar, MessageSquare, Star, Users, DollarSign, Clock } from 'lucide-react';
import { bookings } from '../../data/bookingsData';
import { messages } from '../../data/messagesData';
import { reviews } from '../../data/reviewsData';
import { useAuth } from '../AuthContext';
import { useMentor } from '../../lib/hooks';

const DashboardOverview: React.FC = () => {
  const { currentUser } = useAuth();

  const { data: mentor} = useMentor(currentUser?.mentor_profile?.id);
  const now = new Date();
  const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const upcomingAppointments = bookings.filter(
    (booking) => new Date(booking.startTime) >= now && new Date(booking.startTime) <= in48Hours
  );

  // Get unread messages
  const unreadMessages = messages.filter((message) => !message.read);

  // Calculate earnings
  const totalEarnings = bookings
    .filter((booking) => booking.status === 'completed')
    .reduce((sum, booking) => sum + booking.price, 0);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const statsCards = [
    {
      title: 'Upcoming Sessions',
      value: upcomingAppointments.length,
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Unread Messages',
      value: unreadMessages.length,
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Students',
      value: bookings.reduce((acc, booking) => {
        if (!acc.includes(booking.studentId)) {
          acc.push(booking.studentId);
        }
        return acc;
      }, []).length,
      icon: <Users className="h-6 w-6 text-purple-500" />,
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Earnings',
      value: `$${totalEarnings}`,
      icon: <DollarSign className="h-6 w-6 text-emerald-500" />,
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Hours Mentored',
      value: '32',
      icon: <Clock className="h-6 w-6 text-indigo-500" />,
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Rating',
      value: averageRating.toFixed(1),
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      extra: (
        <div className="flex mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.round(averageRating)
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">({reviews.length})</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} p-6 rounded-lg shadow-sm border border-gray-100 transition-transform
                      duration-200 ease-in-out hover:transform hover:scale-105`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-800">{stat.value}</p>
                {stat.extra}
              </div>
              <div className="p-3 rounded-full bg-white shadow-sm">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800">Upcoming Appointments</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => {
              const startTime = new Date(appointment.startTime);
              const endTime = new Date(appointment.endTime);

              return (
                <div key={appointment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={appointment.studentAvatar}
                        alt={appointment.studentName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">
                          {appointment.studentName}
                        </h3>
                        <p className="text-sm text-gray-600">{appointment.topic}</p>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {startTime.toLocaleDateString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}{' '}
                          <span className="mx-1">•</span>
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {startTime.toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}{' '}
                          -
                          {endTime.toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-orange-100 text-orange-600 hover:bg-orange-200 px-3 py-1.5
                                       rounded-md text-xs font-medium transition-colors duration-150 ease-in-out"
                      >
                        Join Call
                      </button>
                      <button
                        className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5
                                       rounded-md text-xs font-medium transition-colors duration-150 ease-in-out"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <Calendar className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any appointments scheduled in the next 48 hours.
              </p>
            </div>
          )}
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <a
            href="#"
            className="text-sm font-medium text-orange-600 hover:text-orange-500"
            onClick={() => document.querySelector('button[data-tab="bookings"]')?.click()}
          >
            View all appointments →
          </a>
        </div>
      </div>

      {/* Recent messages preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800">Recent Messages</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {messages.slice(0, 3).map((message) => (
            <div
              key={message.id}
              className={`p-4 hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={message.senderAvatar}
                  alt={message.senderName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900">{message.senderName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.content}</p>
                </div>
                {!message.read && (
                  <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <a
            href="#"
            className="text-sm font-medium text-orange-600 hover:text-orange-500"
            onClick={() => document.querySelector('button[data-tab="messages"]')?.click()}
          >
            View all messages →
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
