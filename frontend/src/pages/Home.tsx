import { useState } from 'react';
import {
  Clock,
  MapPin,
  Search,
  UserRound,
  MessageCircle,
  Award,
  Activity,
  Bell
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useListings } from '../hooks/useListings';
import { useAuth } from '../components/AuthContext';
import { useCategories } from '../hooks/useCategories';
import { useSkills } from '../hooks/useSkills';
import { useQuery } from 'react-query';
import { getPopularData } from '../services/listings';

const Home = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [query, setQuery] = useState('');
  const [filterSkillOffered, setFilterSkillOffered] = useState('');
  const [filterSkillRequested, setFilterSkillRequested] = useState('');
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [quickMessageOpen, setQuickMessageOpen] = useState(false);
  const [quickMessagePost, setQuickMessagePost] = useState(null);
  const [quickMessageText, setQuickMessageText] = useState('');
  const [noResultsShake, setNoResultsShake] = useState(false);

  const { data: categories } = useCategories();

  const locations = ['Online', 'San Francisco', 'Chicago', 'Boston', 'New York', 'Los Angeles'];
  const { data: skills } = useSkills();

  const { data: posts, isLoading } = useListings(query);

  const trendingSkills = [
    { skill: 'Spanish Language', count: 18 },
    { skill: 'Piano Lessons', count: 14 },
    { skill: 'Python Programming', count: 12 },
    { skill: 'Gardening', count: 9 },
    { skill: 'Yoga Instruction', count: 7 }
  ];

  const clearFilters = () => {
    setFilterCategory('');
    setFilterLocation('');
    setFilterSkillOffered('');
    setFilterSkillRequested('');
  };

  const { data: popularData, isLoading: popularDataLoading } = useQuery({
    queryFn: getPopularData,
    queryKey: ['popularData']
  });

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const diffInDays = Math.floor((currentDate - postDate) / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((currentDate - postDate) / (1000 * 60 * 60));

    if (diffInHours < 24) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return postDate.toLocaleDateString();
  };

  // Activity badge logic
  const getActivityBadge = (post) => {
    const postDate = new Date(post.created_at);
    const currentDate = new Date();
    const diffInHours = Math.floor((currentDate - postDate) / (1000 * 60 * 60));
    const diffInDays = Math.floor((currentDate - postDate) / (1000 * 60 * 60 * 24));

    if (diffInHours < 24) {
      return { text: 'NEW', color: 'bg-green-500 text-white' };
    }
    if (diffInDays < 2) {
      return { text: 'ACTIVE TODAY', color: 'bg-orange-500 text-white' };
    }
    // Assume some posts are popular based on a property or randomly for demo
    if (post.id % 3 === 0) {
      return { text: 'HOT', color: 'bg-red-500 text-white' };
    }
    return null;
  };

  const handleContactClick = (post) => {
    setQuickMessagePost(post);
    setQuickMessageOpen(true);
  };

  const handleSendQuickMessage = () => {
    setIsContactLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsContactLoading(false);
      setQuickMessageOpen(false);
      setQuickMessageText('');
      // Show success message or navigate to chat
    }, 1000);
  };

  const handleApplyFilters = () => {
    // If no posts match after filtering, trigger shake animation
    if (posts?.length === 0) {
      setNoResultsShake(true);
      setTimeout(() => setNoResultsShake(false), 500);
    }
  };

  const { currentUser } = useAuth();

  const successStats = {
    swapsThisMonth: 145,
    topSwapper: 'Jane D.',
    successfulLessons: 5
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen">
        {/* Header would go here */}

        {/* Main Content - Three Column Layout */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between ">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Skill Swap Posts</h1>

            <div className="relative mb-6 w-9/12">
              <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden">
                <input
                  type="text"
                  placeholder="Search for skills, categories, or keywords..."
                  className="w-full py-3 px-4 focus:outline-none"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Success Stories Banner */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="font-medium text-gray-800">
                  🎉 {successStats.swapsThisMonth} skills swapped successfully this month!
                </p>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <p className="text-sm text-gray-700">
                🏆 Top Skill Swapper: {successStats.topSwapper} - {successStats.successfulLessons}{' '}
                Successful Lessons
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Category</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">All Categories</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Location</label>
                    <select
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">All Locations</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Skills Offered</label>
                    <select
                      value={filterSkillOffered}
                      onChange={(e) => setFilterSkillOffered(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">All Skills</option>
                      {skills?.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Skills Requested</label>
                    <select
                      value={filterSkillRequested}
                      onChange={(e) => setFilterSkillRequested(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">All Skills</option>
                      {skills?.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md mt-2"
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col gap-5 max-w-xl ${noResultsShake ? 'animate-shake' : ''}`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : posts?.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-white rounded-lg shadow-md">
                  <img
                    src="/api/placeholder/200/200"
                    alt="No results found"
                    className="mx-auto mb-4"
                  />
                  <p className="text-gray-500 text-lg">No posts match your filter criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                posts?.map((post) => {
                  const activityBadge = getActivityBadge(post);
                  return (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <UserRound className="w-10 h-10 rounded-full mr-3" />
                          <div>
                            <h3 className="font-medium text-gray-800">{post.user.fullname}</h3>
                            <p className="text-gray-500 text-sm">
                              {formatRelativeTime(post.created_at)}
                            </p>
                          </div>
                          <div className="ml-auto flex items-center">
                            {activityBadge && (
                              <span
                                className={`${activityBadge.color} px-2 py-1 text-xs rounded-full mr-2 flex items-center`}
                              >
                                {activityBadge.text === 'HOT' && (
                                  <Activity className="w-3 h-3 mr-1" />
                                )}
                                {activityBadge.text === 'NEW' && <Bell className="w-3 h-3 mr-1" />}
                                {activityBadge.text}
                              </span>
                            )}
                            {post.user.id === currentUser?.id && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded">
                                Your Post
                              </span>
                            )}
                          </div>
                        </div>

                        <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                        <p className="text-gray-600 mb-4">{post.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                            Offering: {post.offering_skill.name}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm">
                            Seeking: {post.requested_skill.name}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <div className="mr-4 flex items-center">
                            <MapPin className="mr-1 h-5 w-5" />
                            {post.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-5 w-5" />
                            {post.duration}
                          </div>
                        </div>

                        <div className="flex items-center justify-end pt-3 border-t border-gray-200">
                          <button
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center"
                            onClick={() => handleContactClick(post)}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Send Request
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Sidebar - "People are also looking for" */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">People are also looking for</h2>
                {popularDataLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500"></div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center mb-4">
                      <img
                        src="/api/placeholder/120/120"
                        alt="People exchanging skills"
                        className="rounded-full"
                      />
                    </div>
                    <ul className="space-y-3">
                      {popularData?.popularSkills.map((item, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span className="text-gray-700 hover:text-orange-600 cursor-pointer">
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-6">
                  <h3 className="font-medium text-gray-700 mb-3">Popular Categories</h3>
                  <div className="flex justify-center mb-4">
                    <img src="/api/placeholder/100/100" alt="Categories" className="rounded" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularData?.popularCategories?.map((category, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 px-4 rounded-md mt-6">
                  Create Your Listing
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 mt-12">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 SattaPatta - Skill Swapping Platform</p>
            <div className="mt-2">
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Quick Message Modal */}
      {quickMessageOpen && quickMessagePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Send a Quick Message</h3>
            <p className="text-gray-600 mb-4">
              To: <span className="font-medium">{quickMessagePost.user.fullname}</span> about "
              {quickMessagePost.title}"
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 mb-4 h-32"
              placeholder="Hi! I'm interested in learning about your skill swap offer..."
              value={quickMessageText}
              onChange={(e) => setQuickMessageText(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md"
                onClick={() => setQuickMessageOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center"
                onClick={handleSendQuickMessage}
                disabled={isContactLoading}
              >
                {isContactLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
