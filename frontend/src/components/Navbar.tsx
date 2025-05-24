import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { User } from 'lucide-react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target;
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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  const { currentUser } = useAuth();

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">SP</span>
          </div>
          <Link to={'/'} className="text-2xl font-bold text-orange-600">
            SattaPatta
          </Link>
        </div>
        {!currentUser ? (
          <>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-orange-600 focus-outline">
                How It Works
              </a>
              <a href="#community" className="text-gray-600 hover:text-orange-600 focus-outline">
                Community
              </a>
              <a
                href="#accessibility"
                className="text-gray-600 hover:text-orange-600 focus-outline"
              >
                Accessibility
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-orange-600 focus-outline">
                Stories
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Link className="px-4 py-2 rounded-lg focus-outline underline" to={'/login'}>
                Log In
              </Link>
              <Link className="px-4 py-2 rounded-lg focus-outline underline" to={'/signup'}>
                Register
              </Link>
            </div>
          </>
        ) : (
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/messages" className="text-gray-600 hover:text-orange-600 focus-outline">
              Messages
            </Link>
            <Link to="/my-posts" className="text-gray-600 hover:text-orange-600 focus-outline">
              My Bookings
            </Link>

            {/* Profile Picture Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 border-2 border-orange-300 hover:border-orange-500 transition-colors duration-200 focus-outline cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="h-6 w-6 text-orange-600" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {currentUser.role}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{currentUser.email || ''}</p>
                  </div>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Account
                  </Link>
                  <Link
                    to="/profile-settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
