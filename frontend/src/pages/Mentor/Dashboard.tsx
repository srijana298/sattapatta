import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import DashboardOverview from '../../components/dashboard/DashboardOverview';
import BookingsSection from '../../components/dashboard/BookingsSection';
import MessagesSection from '../../components/dashboard/MessagesSection';
import ReviewsSection from '../../components/dashboard/ReviewsSection';
import ProfileSection from '../../components/dashboard/ProfileSection';

type TabType = 'overview' | 'bookings' | 'messages' | 'reviews' | 'profile';

const MentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'bookings':
        return <BookingsSection />;
      case 'messages':
        return <MessagesSection />;
      case 'reviews':
        return <ReviewsSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout>
      {renderTabContent()}
    </DashboardLayout>
  );
};

export default MentorDashboard;
