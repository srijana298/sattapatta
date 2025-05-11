import { Search } from 'lucide-react';
import { Select } from '../components/ui/select/select';
import { CustomDropdown } from '../components/ui/dropdown/CustomDropdown';
import FirstHeroImage from '../assets/home-screen-1.jpg';
import SecondHeroImage from '../assets/home-screen-bg.jpg';
import Navbar from '../components/Navbar';
import TutorCard from '../components/TutorCard';
import { useAuth } from '../components/AuthContext';
import { useQuery } from 'react-query';
import { getAllMentors } from '../services/users';
import { LoadingSpinner } from '../components/LoadingSpinner';

const LandingPage = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-orange-700 mb-4">
                Share Skills, Build Community
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                SattaPatta connects you with a diverse community where everyone's skills are valued.
                Trade knowledge, grow together, and create meaningful connections.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="btn-primary px-6 py-3 rounded-lg text-lg font-medium focus-outline">
                  Join Our Community
                </button>
                <button className="btn-secondary px-6 py-3 rounded-lg text-lg font-medium focus-outline">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={SecondHeroImage}
                alt="People from diverse backgrounds sharing skills"
                className="rounded-xl shadow-lg h-fit"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-orange-700 mb-12">
            How SattaPatta Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-orange-50 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-orange-700 mb-3">Share Your Skills</h3>
              <p className="text-gray-600">
                List what you can teach others, from cooking to coding, gardening to graphic design.
                Every skill has value in our community.
              </p>
            </div>

            <div className="card bg-orange-50 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-orange-700 mb-3">Connect With Others</h3>
              <p className="text-gray-600">
                Browse skills you'd like to learn and connect with members in your area or online.
                Our matching system considers accessibility needs and preferences.
              </p>
            </div>

            <div className="card bg-orange-50 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-orange-700 mb-3">Exchange & Grow</h3>
              <p className="text-gray-600">
                Arrange skill exchanges on your terms. Meet in person or virtually, one-on-one or in
                groups. Build relationships while learning and teaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="py-16 bg-orange-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src={FirstHeroImage}
                alt="Diverse community members sharing skills"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-orange-700 mb-6">A Community For Everyone</h2>
              <p className="text-lg text-gray-600 mb-4">
                At SattaPatta, we believe everyone has valuable skills to share, regardless of
                background, ability, or experience. Our platform celebrates diversity and creates
                space for authentic connections.
              </p>
              <ul className="mb-8">
                <li className="flex items-start mb-3">
                  <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-orange-600">✓</span>
                  </div>
                  <span className="text-gray-600">
                    Inclusive community guidelines that promote respect and understanding
                  </span>
                </li>
                <li className="flex items-start mb-3">
                  <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-orange-600">✓</span>
                  </div>
                  <span className="text-gray-600">
                    Special interest groups for connecting with like-minded members
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-orange-600">✓</span>
                  </div>
                  <span className="text-gray-600">
                    Community events that celebrate diverse skills and backgrounds
                  </span>
                </li>
              </ul>
              <button className="btn-primary px-6 py-3 rounded-lg text-lg font-medium focus-outline">
                Join Our Community
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="accessibility" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-orange-700 mb-8">
            Designed For Everyone
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We're committed to creating a platform that works for all users, including those with
            disabilities and neurodivergent individuals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-blue-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl text-blue-600">🌈</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Sensory-Friendly Design</h3>
              <p className="text-gray-600">
                Calm color schemes, reduced animations, and customizable interface options for
                sensory comfort.
              </p>
            </div>

            <div className="card bg-green-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl text-green-600">🔊</span>
              </div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">Screen Reader Friendly</h3>
              <p className="text-gray-600">
                Full compatibility with screen readers and other assistive technologies for visually
                impaired users.
              </p>
            </div>

            <div className="card bg-yellow-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl text-yellow-600">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-yellow-700 mb-2">Clear Communication</h3>
              <p className="text-gray-600">
                Simple language, straightforward instructions, and visual aids to support
                understanding.
              </p>
            </div>

            <div className="card bg-red-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl text-red-600">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">Accommodation Options</h3>
              <p className="text-gray-600">
                Set your preferences for skill exchanges, including communication style and
                environment needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-600">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Share Your Skills?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join SattaPatta today and become part of a supportive community where everyone's skills
            and experiences matter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg text-lg font-medium focus-outline">
              Sign Up Free
            </button>
            <button className="bg-orange-500 text-white hover:bg-orange-400 px-8 py-3 rounded-lg text-lg font-medium focus-outline">
              Browse Skills
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-300">SattaPatta</h3>
              <p className="text-gray-400">Building community through inclusive skill sharing.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-300">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    Community Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-300">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    Accessibility Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    Safety Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-300">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    hello@sattapatta.com
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white focus-outline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 SattaPatta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

const AuthenticatedPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllMentors
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="font-sans max-w-6xl mx-auto p-4 bg-white mt-2">
      <div className="my-8 w-full flex justify-center gap-5">
        <Select
          options={[
            {
              label: 'Japanese',
              value: 'japanese'
            }
          ]}
          label="I want to learn"
          defaultValue=""
        />
        <Select
          options={[
            {
              label: '500-1000 NRS',
              value: '0'
            },
            {
              label: '1500-2000 NRS',
              value: '1'
            }
          ]}
          label="Price per lesson"
          defaultValue=""
        />

        <Select
          options={[
            {
              label: 'Nepal',
              value: 'nep'
            },
            {
              label: 'India',
              value: 'ind'
            }
          ]}
          label="Location"
          defaultValue=""
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-8 justify-end">
        <CustomDropdown
          options={[
            { id: 'top-picks', label: 'Our top picks' },
            { id: 'popularity', label: 'Popularity' },
            { id: 'price-high', label: 'Price: highest first' },
            { id: 'price-low', label: 'Price: lowest first' },
            { id: 'reviews', label: 'Number of reviews' },
            { id: 'rating', label: 'Best rating' }
          ]}
          defaultValue="popularity"
          onChange={(value) => console.log('Selected:', value)}
        />

        <div className="border rounded-lg py-2 px-4 flex items-center hover:border-black">
          <Search size={16} className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or keyword"
            className="outline-none text-gray-700 w-full"
          />
        </div>
      </div>

      {/* Teacher Count */}
      {/* <h2 className="text-3xl font-bold mb-4 text-gray-900">3,102 Mentors available</h2> */}

      <div className="flex gap-10 flex-col">
        {data?.map((d) => <TutorCard profile={d} key={d.id} />)}
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
