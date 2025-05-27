import { CheckCircle, Clock, Mail, Search } from 'lucide-react';
import { CustomDropdown } from '../components/ui/dropdown/CustomDropdown';
import FirstHeroImage from '../assets/home-screen-1.jpg';
import SecondHeroImage from '../assets/home-screen-bg.jpg';
import Navbar from '../components/Navbar';
import TutorCard from '../components/TutorCard';
import { useAuth } from '../components/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useMentors } from '../lib/hooks';

const LandingPage = () => {
  return (
    <>
      {/* Main Hero Section */}
      <section className="bg-linear-to-br from-orange-100 via-orange-50 to-white min-h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold text-orange-800 mb-6 leading-tight">
                Learn Skills
                <br />
                <span className="text-orange-600">Share Knowledge</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                Connect with skilled mentors in your community. Learn new skills, teach what you
                know, and grow together.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex">
                <button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                  Start Learning Now
                </button>
                <button className="w-full md:w-auto border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200">
                  Become a Mentor
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-orange-200 rounded-3xl p-4 transform rotate-3">
                <img
                  src={SecondHeroImage}
                  alt="People learning and sharing skills"
                  className="rounded-2xl shadow-2xl w-full h-auto transform -rotate-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">Simple as 1-2-3</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is easy. Find your mentor or start teaching in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Choose Your Skill</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Browse through hundreds of skills from cooking to coding, music to business.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Find Your Mentor</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Connect with experienced mentors in your area or learn online from anywhere.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Start Learning</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Book sessions, chat with mentors, and begin your learning journey today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section - More Visual */}
      <section className="py-20 bg-linear-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-3xl p-4 shadow-xl">
                <img
                  src={FirstHeroImage}
                  alt="Community members learning together"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-6">
                Join Our Growing Community
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      10,000+ Active Members
                    </h3>
                    <p className="text-gray-600">
                      Connect with learners and mentors from all over Nepal
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      500+ Skills Available
                    </h3>
                    <p className="text-gray-600">From traditional crafts to modern technology</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xl">⭐</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">4.8 Star Rating</h3>
                    <p className="text-gray-600">Trusted by thousands of satisfied learners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold and Clear */}
      <section className="py-20 bg-linear-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Nepalis who are already learning and teaching on SattaPatta. Your next
            skill is just a click away.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex justify-center">
            <button className="w-full md:w-auto bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-full text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200">
              Join Free Today
            </button>
            <button className="w-full md:w-auto border-2 border-white text-white hover:bg-white hover:text-orange-600 px-10 py-4 rounded-full text-xl font-bold transition-all duration-200">
              Browse Skills
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Clean and Simple */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">SattaPatta</h3>
              <p className="text-gray-300 text-lg mb-6 max-w-md">
                Connecting Nepali learners and mentors to build a stronger, more skilled community.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors">
                  <span className="text-white">f</span>
                </button>
                <button className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors">
                  <span className="text-white">t</span>
                </button>
                <button className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors">
                  <span className="text-white">i</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 text-orange-400">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white text-lg transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white text-lg transition-colors">
                    Find Mentors
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white text-lg transition-colors">
                    Become a Mentor
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white text-lg transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 text-orange-400">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white text-lg transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white text-lg transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white text-lg transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white text-lg transition-colors">
                    Terms & Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-lg">&copy; 2025 SattaPatta. Made with ❤️ in Nepal</p>
          </div>
        </div>
      </footer>
    </>
  );
};

const MentorPendingStatus = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 bg-amber-100 rounded-full">
          <Clock className="h-8 w-8 text-amber-600" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-3">
        Application Under Review
      </h2>
      
      <p className="text-gray-600 text-center mb-6 leading-relaxed">
        Your mentor application is currently being reviewed by our admin team. 
        You'll receive a notification within <span className="font-semibold text-amber-700">24 hours</span> 
        of your submission.
      </p>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Application submitted</p>
            <p className="text-xs text-gray-500">We've received your mentor application</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-5 w-5 bg-amber-500 rounded-full flex items-center justify-center">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Under review</p>
            <p className="text-xs text-gray-500">Admin team is reviewing your profile</p>
          </div>
        </div>
        
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-amber-100">
        <p className="text-sm text-gray-600 text-center">
          <span className="font-medium">What happens next?</span><br />
          Our team will review your qualifications and experience. 
          Wait to receive our call for updates on your application status.
        </p>
      </div>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Questions? Contact our support team for assistance.
      </p>
    </div>
  );
};

const AuthenticatedPage = () => {
  const { data, isLoading } = useMentors()
  const { currentUser } = useAuth();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log(currentUser)
  if (currentUser?.role === 'mentor' && currentUser.mentor_profile.status === 'pending') {
    return <MentorPendingStatus />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-white shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-orange-800 mb-2">Find Your Perfect Mentor</h1>
            <p className="text-xl text-gray-600">
              Choose from {data?.length || 0} skilled mentors ready to help you learn
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto justify-center">
            <div className="flex-1 relative justify-self-center ">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search for skills, mentors, or topics..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 text-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div className="w-auto">
              <CustomDropdown
                className="py-4"
                options={[
                  { id: 'popularity', label: 'Most Popular' },
                  { id: 'rating', label: 'Highest Rated' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'reviews', label: 'Most Reviews' },
                  { id: 'newest', label: 'Newest First' }
                ]}
                defaultValue="popularity"
                onChange={(value) => console.log('Selected:', value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          {data?.map((mentor) => <TutorCard profile={mentor} key={mentor.id} />)}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      {currentUser ? <AuthenticatedPage /> : <LandingPage />}
    </>
  );
}
