import React, { useEffect, useState } from 'react';
import { Star, Search, Filter } from 'lucide-react';
import api from '../api';

interface Reviewer {
  id: number;
  fullname: string;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reviewer: Reviewer;
}

// Rating description mapping
const ratingDescriptions: Record<number, { label: string; color: string }> = {
  5: { label: 'Excellent', color: 'text-green-600 bg-green-50' },
  4: { label: 'Very Good', color: 'text-blue-600 bg-blue-50' },
  3: { label: 'Good', color: 'text-yellow-600 bg-yellow-50' },
  2: { label: 'Fair', color: 'text-orange-600 bg-orange-50' },
  1: { label: 'Poor', color: 'text-red-600 bg-red-50' }
};

interface MentorReviewsProps {
  mentorId?: number;
}

type ReviewFilter = 'all' | '5' | '4' | '3' | '2' | '1';
type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const MentorReviews: React.FC<MentorReviewsProps> = ({ mentorId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // If mentorId is provided, fetch reviews for that mentor
        // Otherwise, fetch all reviews
        const url = mentorId ? `/mentor/${mentorId}` : '/mentor';

        const response = await api.get(url);

        // Extract reviews from response
        let fetchedReviews: Review[] = [];
        if (mentorId) {
          // Single mentor response structure
          fetchedReviews = response.data.reviews || [];
        } else {
          // Multiple mentors response structure - flatten all reviews
          const mentors = response.data || [];
          fetchedReviews = mentors.flatMap((mentor) => mentor.reviews || []);
        }

        setReviews(fetchedReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [mentorId]);

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => {
      // Rating filter
      if (filter !== 'all' && review.rating !== parseInt(filter)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          review.reviewer.fullname.toLowerCase().includes(query) ||
          review.comment.toLowerCase().includes(query)
        );
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Student Reviews</h2>
      </div>

      {/* Rating summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average rating */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Average Rating</p>
            <div className="flex items-center">
              <span
                className={`text-4xl font-bold mr-2 ${
                  averageRating >= 4.5
                    ? 'text-green-600'
                    : averageRating >= 4
                      ? 'text-green-500'
                      : averageRating >= 3.5
                        ? 'text-blue-600'
                        : averageRating >= 3
                          ? 'text-yellow-600'
                          : averageRating >= 2
                            ? 'text-orange-600'
                            : 'text-red-600'
                }`}
              >
                {averageRating.toFixed(1)}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} total
            </p>
          </div>

          {/* Rating distribution */}
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-600 mb-3">Rating Distribution</p>
            <div className="space-y-2">
              {ratingCounts.map((item) => (
                <div key={item.rating} className="flex items-center">
                  <div className="flex items-center w-16">
                    <span className="text-sm text-gray-700">{item.rating}</span>
                    <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 h-4 mx-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.rating === 5
                          ? 'bg-green-500'
                          : item.rating === 4
                            ? 'bg-blue-500'
                            : item.rating === 3
                              ? 'bg-yellow-500'
                              : item.rating === 2
                                ? 'bg-orange-500'
                                : 'bg-red-500'
                      } rounded-full`}
                      style={{ width: `${item.percentage || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                  <span className="ml-2 text-xs font-medium w-20 text-right">
                    {item.percentage.toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          {/* Rating filter */}
          <div className="flex space-x-2 items-center">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                filter === 'all'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {(['5', '4', '3', '2', '1'] as ReviewFilter[]).map((rating) => (
              <button
                key={rating}
                onClick={() => setFilter(rating)}
                className={`px-3 py-1 text-xs font-medium rounded-md flex items-center ${
                  filter === rating
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {rating}
                <Star className="h-3 w-3 ml-0.5" />
              </button>
            ))}
          </div>

          {/* Sort options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm border-gray-200 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500
                         focus:border-transparent"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-transform
                      duration-200 hover:shadow-md"
            >
              <div className="flex items-start">
                <div
                  className={`h-10 w-10 rounded-full ${review.rating >= 4 ? 'bg-green-100 text-green-600' : review.rating >= 3 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'} flex items-center justify-center font-bold mr-4`}
                >
                  {review.reviewer.fullname.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.reviewer.fullname}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                        <span
                          className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${ratingDescriptions[review.rating].color}`}
                        >
                          {ratingDescriptions[review.rating].label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{review.comment}</p>
                  <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${review.rating >= 4 ? 'bg-green-500' : review.rating >= 3 ? 'bg-yellow-500' : 'bg-red-500'} mr-2`}
                    ></span>
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
              <Star className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews found</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              {searchQuery
                ? 'No reviews match your search criteria. Try adjusting your filters or search terms.'
                : filter !== 'all'
                  ? `No ${filter}-star reviews available at the moment.`
                  : 'There are no reviews available yet. Check back later for updates.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorReviews;
