import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
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
import { getPopularData } from '../services/listings';

// Component imports
import Hero from '../components/Hero';
import FilterSidebar from '../components/FilterSidebar';
import PostCard from '../components/PostCard';
import TrendingSidebar from '../components/TrendingSidebar';
import QuickMessageModal from '../components/QuickMessageModal';
import Footer from '../components/Footer';
import EmptyState from '../components/EmptyState';

interface FilterSidebarProps {
  filters: {
    category: string;
    location: string;
    skillOffered: string;
    skillRequested: string;
  };
  onFilterChange: (filter: string, value: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  categories: { id: number; name: string }[];
  locations: string[];
  skills: {
    id: number;
    name: string;
  }[];
}

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
  categories,
  locations,
  skills
}: FilterSidebarProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 sticky top-4 transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        <button
          onClick={onClearFilters}
          className="text-orange-600 hover:text-orange-800 text-sm font-medium transition-colors duration-300"
          aria-label="Clear all filters"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-shadow duration-300"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-gray-700 mb-2 font-medium">
            Location
          </label>
          <select
            id="location"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-shadow duration-300"
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
          <label htmlFor="skillOffered" className="block text-gray-700 mb-2 font-medium">
            Skills Offered
          </label>
          <select
            id="skillOffered"
            value={filters.skillOffered}
            onChange={(e) => onFilterChange('skillOffered', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-shadow duration-300"
          >
            <option value="">All Skills</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="skillRequested" className="block text-gray-700 mb-2 font-medium">
            Skills Requested
          </label>
          <select
            id="skillRequested"
            value={filters.skillRequested}
            onChange={(e) => onFilterChange('skillRequested', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-shadow duration-300"
          >
            <option value="">All Skills</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md mt-4 transition-colors duration-300 font-medium"
          onClick={onApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  // Search and filtering state
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    skillOffered: '',
    skillRequested: ''
  });
  const [query, setQuery] = useState('');
  const [noResultsShake, setNoResultsShake] = useState(false);

  // Message modal state
  const [quickMessageState, setQuickMessageState] = useState({
    isOpen: false,
    post: null,
    text: '',
    isLoading: false
  });

  // Fetch data
  const { data: categories } = useCategories();
  const { data: skills } = useSkills();
  const { data: posts, isLoading } = useListings(query);
  const { data: popularData, isLoading: popularDataLoading } = useQuery({
    queryFn: getPopularData,
    queryKey: ['popularData']
  });
  const { currentUser } = useAuth();

  // Locations data
  const locations = ['Online', 'San Francisco', 'Chicago', 'Boston', 'New York', 'Los Angeles'];

  // Filter posts based on selected filters
  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    return posts.filter((post) => {
      if (filters.category && post.category_id !== filters.category) return false;
      if (filters.location && post.location !== filters.location) return false;
      if (filters.skillOffered && post.offering_skill.id !== filters.skillOffered) return false;
      if (filters.skillRequested && post.requested_skill.id !== filters.skillRequested)
        return false;
      return true;
    });
  }, [posts, filters]);

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      skillOffered: '',
      skillRequested: ''
    });
  };

  const handleApplyFilters = () => {
    if (filteredPosts.length === 0) {
      setNoResultsShake(true);
      setTimeout(() => setNoResultsShake(false), 500);
    }
  };

  // Handle quick message modal
  const openQuickMessage = (post) => {
    setQuickMessageState({
      isOpen: true,
      post,
      text: '',
      isLoading: false
    });
  };

  const closeQuickMessage = () => {
    setQuickMessageState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleQuickMessageTextChange = (text) => {
    setQuickMessageState((prev) => ({ ...prev, text }));
  };

  const handleSendQuickMessage = () => {
    setQuickMessageState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    setTimeout(() => {
      setQuickMessageState({
        isOpen: false,
        post: null,
        text: '',
        isLoading: false
      });
      // Show success notification here
    }, 1000);
  };

  // Success stats for banner
  const successStats = {
    swapsThisMonth: 145,
    topSwapper: 'Jane D.',
    successfulLessons: 5
  };

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Search and Title Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Skill Swap Posts</h1>

            <div className="relative w-full md:w-7/12 lg:w-9/12">
              <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden hover:shadow transition-shadow duration-300">
                <input
                  type="text"
                  placeholder="Search for skills, categories, or keywords..."
                  className="w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  aria-label="Search posts"
                />
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 transition-colors duration-300"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {popularData?.popularCategories?.slice(0, 5).map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                  filters.category === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-white hover:bg-orange-100 text-gray-700'
                }`}
                onClick={() =>
                  handleFilterChange(
                    'category',
                    category.id === filters.category ? '' : category.id
                  )
                }
              >
                {category.name}
              </button>
            ))}
            {filters.category ||
            filters.location ||
            filters.skillOffered ||
            filters.skillRequested ? (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center transition-colors duration-300"
              >
                Clear All
              </button>
            ) : null}
          </div>

          {/* Success Stories Banner */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg mb-6 flex items-center justify-between shadow-sm hover:shadow transition-shadow duration-300">
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
            <div className="lg:w-1/5">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                onApplyFilters={handleApplyFilters}
                categories={categories || []}
                locations={locations}
                skills={skills || []}
              />
            </div>

            {/* Main Content - Posts */}
            <div
              className={`lg:w-3/5 flex flex-col gap-5 ${noResultsShake ? 'animate-shake' : ''}`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <EmptyState onClearFilters={clearFilters} />
              ) : (
                <>
                  <p className="text-gray-600 font-medium">{filteredPosts.length} results found</p>
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUser={currentUser}
                      onContactClick={openQuickMessage}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Right Sidebar - Trending */}
            <div className="lg:w-1/5">
              <TrendingSidebar popularData={popularData} isLoading={popularDataLoading} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Quick Message Modal */}
      {quickMessageState.isOpen && (
        <QuickMessageModal
          post={quickMessageState.post}
          messageText={quickMessageState.text}
          isLoading={quickMessageState.isLoading}
          onClose={closeQuickMessage}
          onTextChange={handleQuickMessageTextChange}
          onSend={handleSendQuickMessage}
        />
      )}
    </>
  );
};

export default Home;
