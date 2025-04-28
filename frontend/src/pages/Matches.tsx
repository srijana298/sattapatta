import { useQuery } from 'react-query';
import { getMatches } from '../services/listings';
import { Clock, MapPin, UserRound } from 'lucide-react';
import Navbar from '../components/Navbar';

const Matches = () => {
  const {
    data: listings,
    isLoading,
    isError
  } = useQuery({
    queryFn: getMatches,
    queryKey: ['matches']
  });

  // Format relative time for display
  const formatRelativeTime = (dateString: string) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const diffInDays = Math.floor((currentDate - postDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return postDate.toLocaleDateString();
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-medium">Loading matches...</div>
      </div>
    );

  if (isError)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg font-medium">Error loading matches</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Your Skill Exchange Matches</h1>

        {listings && listings.length > 0 ? (
          <div className="space-y-8">
            {listings.map(({ listingA, listingB }, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Match Connection Indicator */}
                <div className="hidden md:flex flex-col items-center justify-center">
                  <div className="w-1 h-full bg-orange-500 rounded-full"></div>
                </div>

                {/* Listing A */}
                <div className="flex-1">
                  <div className="h-full bg-orange-50 rounded-lg overflow-hidden border border-orange-100">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                          <UserRound className="w-8 h-8 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{listingA.user.fullname}</h3>
                          <p className="text-gray-500 text-sm">
                            {formatRelativeTime(listingA.created_at)}
                          </p>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold mb-3 text-orange-700">{listingA.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{listingA.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Offering: {listingA.offering_skill.name}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          Seeking: {listingA.requested_skill.name}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4">
                        <div className="mr-4 flex items-center mb-2 md:mb-0">
                          <MapPin className="mr-1 h-4 w-4" />
                          {listingA.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {listingA.duration}
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-3 border-t border-gray-200">
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match indicator for mobile */}
                <div className="md:hidden flex justify-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    ↔
                  </div>
                </div>

                {/* Listing B */}
                <div className="flex-1">
                  <div className="h-full bg-purple-50 rounded-lg overflow-hidden border border-purple-100">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <UserRound className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{listingB.user.fullname}</h3>
                          <p className="text-gray-500 text-sm">
                            {formatRelativeTime(listingB.created_at)}
                          </p>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold mb-3 text-purple-700">{listingB.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{listingB.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Offering: {listingB.offering_skill.name}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          Seeking: {listingB.requested_skill.name}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4">
                        <div className="mr-4 flex items-center mb-2 md:mb-0">
                          <MapPin className="mr-1 h-4 w-4" />
                          {listingB.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {listingB.duration}
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-3 border-t border-gray-200">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-gray-500">
              We couldn't find any skill exchange matches for you yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
