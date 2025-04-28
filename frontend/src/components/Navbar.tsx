import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;

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

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const { currentUser } = useAuth();

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">SP</span>
          </div>
          <Link to={currentUser ? '/home' : '/'} className="text-2xl font-bold text-orange-600">
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
            <Link
              to="/submit-request"
              className="text-gray-600 hover:text-orange-600 focus-outline"
            >
              Submit Request
            </Link>
            <Link to="/matches" className="text-gray-600 hover:text-orange-600 focus-outline">
              Matches
            </Link>

            <Link to="/my-posts" className="text-gray-600 hover:text-orange-600 focus-outline">
              My Posts
            </Link>
            <a href="#testimonials" className="text-gray-600 hover:text-orange-600 focus-outline">
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
