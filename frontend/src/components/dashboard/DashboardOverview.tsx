import React, { useEffect, useState } from 'react';
import { Calendar, Star, Users } from 'lucide-react';
import { useAuth } from '../AuthContext';
import api from '../../api';

const DashboardOverview: React.FC = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    upcomingSessions: 0,
    uniqueStudentsCount: 0,
    averageRating: 0,
    totalReviews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get('/mentor/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [currentUser]);

  const statsCards = [
    {
      title: 'Upcoming Sessions',
      value: stats.upcomingSessions,
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Students',
      value: stats.uniqueStudentsCount,
      icon: <Users className="h-6 w-6 text-purple-500" />,
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Rating',
      value: stats.averageRating?.toFixed(1) || '0.0',
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      extra: (
        <div className="flex mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.round(stats.averageRating || 0)
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">({stats.totalReviews})</span>
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
