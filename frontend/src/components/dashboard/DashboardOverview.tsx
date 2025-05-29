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

  const unreadMessages = messages.filter((message) => !message.read);

  const totalEarnings = bookings
    .filter((booking) => booking.status === 'completed')
    .reduce((sum, booking) => sum + booking.price, 0);

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
    </div>
  );
};

export default DashboardOverview;
