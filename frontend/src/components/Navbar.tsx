import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { User, MessageCircle, Calendar, Menu, X, Bell, Search, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Check for reduced motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              window.scrollTo(0, targetElement.getBoundingClientRect().top + window.scrollY - 100);
            } else {
              window.scrollTo({
                top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
                behavior: 'smooth'
              });
            }
          }
        }
      }
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <span className="text-white font-bold text-lg">SP</span>
                </div>
                <span className="text-2xl font-bold bg-linear-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  SattaPatta
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {!currentUser ? (
              <>
                {/* Public Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  <a
                    href="#how-it-works"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
                  >
                    How It Works
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                  <a
                    href="#community"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
                  >
                    Community
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                  <Link
                    to="/browse-mentors"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
                  >
                    Find Mentors
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Join Free
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-6">

                  <Link
                    to="/messages"
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className='pr-3'>Messages</span>
                  </Link>

                  <Link
                    to="/my-bookings"
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>My Sessions</span>
                  </Link>


                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {currentUser?.fullname || 'User'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-20 border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900 capitalize">
                            {currentUser?.role || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {currentUser?.email || ''}
                          </p>
                        </div>


                        <Link
                          to="/account-settings"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Settings
                        </Link>

                        {currentUser?.role === 'mentor' && (
                          <Link
                            to="/mentor-dashboard"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <svg
                              className="w-4 h-4 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                            Dashboard
                          </Link>
                        )}

                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                            onClick={handleLogout}
                          >
                            <svg
                              className="w-4 h-4 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {!currentUser ? (
                <>
                  <a
                    href="#how-it-works"
                    className="block py-2 text-gray-700 hover:text-orange-600 font-medium"
                  >
                    How It Works
                  </a>
                  <a
                    href="#community"
                    className="block py-2 text-gray-700 hover:text-orange-600 font-medium"
                  >
                    Community
                  </a>
                  <Link
                    to="/browse-mentors"
                    className="block py-2 text-gray-700 hover:text-orange-600 font-medium"
                  >
                    Find Mentors
                  </Link>
                  <div className="pt-4 space-y-3">
                    <Link
                      to="/login"
                      className="block w-full text-center py-3 text-gray-700 border border-gray-300 rounded-lg font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full text-center py-3 bg-orange-600 text-white rounded-lg font-semibold"
                    >
                      Join Free
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {currentUser?.fullname || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {currentUser?.role || 'User'}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/messages"
                    className="flex items-center space-x-3 py-3 text-gray-700 hover:text-orange-600"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Messages</span>
                  </Link>

                  <Link
                    to="/my-bookings"
                    className="flex items-center space-x-3 py-3 text-gray-700 hover:text-orange-600"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>My Sessions</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 py-3 text-gray-700 hover:text-orange-600"
                  >
                    <User className="w-5 h-5" />
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 py-3 text-red-600 w-full"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
