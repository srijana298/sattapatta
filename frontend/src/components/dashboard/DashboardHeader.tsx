import React, { useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getImageUrl } from '../../pages/admin/lib/utils';

const DashboardHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { currentUser } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const handleLogout = (): void => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-orange-500 focus:outline-none"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="ml-2 text-lg font-bold text-gray-800">Mentor Dashboard</h1>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md"></div>

          <div className="flex items-center space-x-4">
            <div className="relative"></div>

            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User menu"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                  src={getImageUrl(currentUser?.mentor_profile.profilePhotoUrl)}
                  alt="Profile"
                />
                <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                  {currentUser?.fullname}
                </span>
              </button>

              {isProfileMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white
                               ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div className="py-1">
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
