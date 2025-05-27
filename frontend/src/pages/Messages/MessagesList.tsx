import { Search, UserRoundIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useConversations } from '../../lib/hooks';

const MessagesList = () => {
  const { data: conversations, isLoading } = useConversations()

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex h-[600px]">
          <div className="w-full border-r border-gray-200">
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(600px-65px)]">
              {conversations && conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet. Start swapping skills to begin messaging!
                </div>
              ) : (
                conversations?.map((conversation) => (
                    <Link
                    key={conversation.id}
                    to={`${location.pathname}/${conversation.id}`}
                    className="block w-full text-left border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                    <div className="p-4 flex items-start">
                      <div className="relative">
                        <UserRoundIcon />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium">
                            {conversation.otherParticipants[0].user.fullname}
                          </h3>
                          {/* <span className="text-xs text-gray-500">
                            {formatTime(conversation.last_message_time)}
                          </span> */}
                        </div>
                        <p className={`text-sm text-gray-600 truncate`}>
                          {conversation.lastMessage.content}
                        </p>
                        {/* <p className="text-xs text-gray-500 mt-1 truncate">
                          Re: {conversation.about_skill_swap}
                        </p> */}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesList;
