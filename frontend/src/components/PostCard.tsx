import { UserRound, MapPin, Clock, MessageCircle, Activity, Bell } from 'lucide-react';

const PostCard = ({ post, currentUser, onContactClick }) => {
  // Format date to relative time
  const formatRelativeTime = (dateString) => {
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
    // Assume some posts are popular
    if (post.id % 3 === 0) {
      return { text: 'HOT', color: 'bg-red-500 text-white' };
    }
    return null;
  };

  const activityBadge = getActivityBadge(post);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 rounded-full p-2 mr-3">
            <UserRound className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{post.user.fullname}</h3>
            <p className="text-gray-500 text-sm">{formatRelativeTime(post.created_at)}</p>
          </div>
          <div className="ml-auto flex items-center">
            {activityBadge && (
              <span
                className={`${activityBadge.color} px-2 py-1 text-xs rounded-full mr-2 flex items-center font-medium`}
              >
                {activityBadge.text === 'HOT' && <Activity className="w-3 h-3 mr-1" />}
                {activityBadge.text === 'NEW' && <Bell className="w-3 h-3 mr-1" />}
                {activityBadge.text}
              </span>
            )}
            {post.user.id === currentUser?.id && (
              <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded font-medium">
                Your Post
              </span>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{post.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Offering: {post.offering_skill.name}
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Seeking: {post.requested_skill.name}
          </span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <div className="mr-4 flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {post.location}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {post.duration}
          </div>
        </div>

        <div className="flex items-center justify-end pt-3 border-t border-gray-200">
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300"
            onClick={() => onContactClick(post)}
            aria-label={`Send request to ${post.user.fullname}`}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  onContactClick: PropTypes.func.isRequired
};

export default PostCard;
