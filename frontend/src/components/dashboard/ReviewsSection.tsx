import React, { useState } from 'react';
import { Star, Search, Filter, MessageSquare, ThumbsUp } from 'lucide-react';
import { reviews } from '../../data/reviewsData';

type ReviewFilter = 'all' | '5' | '4' | '3' | '2' | '1';
type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => {
      // Rating filter
      if (filter !== 'all' && review.rating !== parseInt(filter)) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          review.studentName.toLowerCase().includes(query) ||
          review.comment.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Reviews & Testimonials</h1>
      </div>
      
      {/* Rating summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average rating */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Average Rating</p>
            <div className="flex items-center">
              <span className="text-4xl font-bold text-gray-900 mr-2">
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
            <p className="text-sm text-gray-500 mt-2">{reviews.length} reviews total</p>
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
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {item.count}
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
                <img
                  src={review.studentAvatar}
                  alt={review.studentName}
                  className="h-10 w-10 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{review.studentName}</h3>
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
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                        {review.sessionType}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{review.comment}</p>
                  
                  {review.reply && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      <div className="flex items-start">
                        <div className="mr-2 text-orange-500">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Your Reply</p>
                          <p className="mt-1 text-sm text-gray-700">{review.reply}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {formatDate(review.replyDate || '')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!review.reply && (
                    <div className="mt-4 flex items-center space-x-2">
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-200 
                                       text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        Reply
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-200 
                                       text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                        Thank
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Star className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No reviews match your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;