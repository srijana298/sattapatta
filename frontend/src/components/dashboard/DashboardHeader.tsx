import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Calendar,
  MessageSquare,
  Star,
  User,
  Menu as MenuIcon
} from 'lucide-react';
import { mentorData } from '../../../../project/src/data/mentorData';

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, type: 'message', content: 'New message from Sarah Johnson', time: '5 min ago' },
    { id: 2, type: 'booking', content: 'New session booked for tomorrow', time: '1 hour ago' },
    { id: 3, type: 'review', content: 'You received a new 5-star review', time: '3 hours ago' }
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  // Mobile navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Menu className="h-5 w-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'reviews', label: 'Reviews', icon: <Star className="h-5 w-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> }
  ];

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and title - visible on mobile only */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-orange-500 focus:outline-none"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="ml-2 text-lg font-bold text-gray-800">Mentor Dashboard</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50
                           text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500
                           focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Search bookings, messages..."
              />
            </div>
          </div>

          {/* Right section: notifications, profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2
                         focus:ring-orange-500 transition duration-150 ease-in-out"
                aria-label="Notifications"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
              </button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white
                               ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map((notification) => (
                        <a
                          key={notification.id}
                          href="#"
                          className="block px-4 py-3 hover:bg-gray-50 transition duration-150 ease-in-out"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              {notification.type === 'message' && (
                                <MessageSquare className="h-5 w-5 text-blue-500" />
                              )}
                              {notification.type === 'booking' && (
                                <Calendar className="h-5 w-5 text-green-500" />
                              )}
                              {notification.type === 'review' && (
                                <Star className="h-5 w-5 text-yellow-500" />
                              )}
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm text-gray-800">{notification.content}</p>
                              <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 text-center">
                      <a
                        href="#"
                        className="text-xs font-medium text-orange-600 hover:text-orange-700"
                      >
                        View all notifications
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User menu"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                  src={mentorData.avatar}
                  alt="Profile"
                />
                <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                  {mentorData.name}
                </span>
              </button>

              {/* Profile menu dropdown */}
              {isProfileMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white
                               ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveTab('profile')}
                    >
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`${
                  activeTab === item.id
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-3 py-2 text-base font-medium rounded-md w-full`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                <div className="mr-4 flex-shrink-0">{item.icon}</div>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
