import React from 'react';
import { Menu, Calendar, MessageSquare, Star, User, LogOut, Settings } from 'lucide-react';
import { mentorData } from '../../data/mentorData';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Menu className="h-5 w-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'reviews', label: 'Reviews', icon: <Star className="h-5 w-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 overflow-y-auto">
      {/* Logo and title */}
      <div className="flex items-center px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-center bg-orange-500 rounded-md h-10 w-10 flex-shrink-0">
          <User className="h-6 w-6 text-white" />
        </div>
        <span className="ml-3 text-lg font-bold text-gray-800">MentorConnect</span>
      </div>

      {/* Mentor profile summary */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-orange-100"
            src={mentorData.avatar}
            alt="Profile"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">{mentorData.name}</p>
            <p className="text-xs text-gray-500">{mentorData.expertise}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${mentorData.profileCompletion}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs text-gray-500">{mentorData.profileCompletion}%</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Profile completion</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${
              activeTab === item.id
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full transition-colors duration-150 ease-in-out`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className={`mr-3 flex-shrink-0 ${
              activeTab === item.id ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500'
            }`}>
              {item.icon}
            </div>
            {item.label}
            
            {/* Notification badges */}
            {item.id === 'messages' && (
              <span className="ml-auto bg-orange-100 text-orange-600 py-0.5 px-2 rounded-full text-xs">
                3
              </span>
            )}
            {item.id === 'bookings' && (
              <span className="ml-auto bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">
                2
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom section with settings and logout */}
      <div className="px-2 py-4 border-t border-gray-200">
        <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full">
          <Settings className="mr-3 h-5 w-5 text-gray-400" />
          Settings
        </button>
        <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full">
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;