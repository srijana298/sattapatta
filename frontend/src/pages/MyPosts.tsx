import { useQuery } from 'react-query';
import { getMyListings } from '../services/listings';
import { Clock, MapPin, UserRound } from 'lucide-react';
import Navbar from '../components/Navbar';

const MyPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryFn: getMyListings,
    queryKey: ['listings', 'me']
  });
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

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-5 mt-5">
            {posts?.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <UserRound className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-800">{post.user.fullname}</h3>
                      <p className="text-gray-500 text-sm">{formatRelativeTime(post.created_at)}</p>
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

                  <div className="flex items-center justify-end  pt-3 border-t border-gray-200">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyPosts;
