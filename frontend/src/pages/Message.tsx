import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Video,
  User,
  MoreVertical,
  Paperclip,
  Image,
  Send,
  MessageSquare
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Messages = () => {
  const conversations = [
    {
      id: 1,
      other_user_id: 2,
      username: 'JaneDoe',
      profile_pic: 'https://randomuser.me/api/portraits/women/42.jpg',
      last_message: "I'm looking forward to our guitar lessons exchange!",
      last_message_time: '2025-04-18 13:20:00',
      unread: 1,
      about_skill_swap: 'Guitar Lessons for Cooking Skills',
      messages: [
        {
          sender_id: 1,
          message: "Hi Jane, I saw your post about guitar lessons. I'd love to learn!",
          time: '2025-04-16 14:30:00'
        },
        {
          sender_id: 2,
          message:
            'Hi there! Great to hear from you. What kind of cooking skills can you offer in exchange?',
          time: '2025-04-16 15:45:00'
        },
        {
          sender_id: 1,
          message:
            'I specialize in Italian cuisine - pasta from scratch, authentic sauces, and some desserts. Would that work?',
          time: '2025-04-17 10:20:00'
        },
        {
          sender_id: 2,
          message:
            "That sounds perfect! I've been wanting to learn how to make pasta from scratch. When are you available for our first session?",
          time: '2025-04-17 11:15:00'
        },
        {
          sender_id: 1,
          message: "I'm free most weekends. How about this Saturday at 2pm?",
          time: '2025-04-17 13:00:00'
        },
        {
          sender_id: 2,
          message: "I'm looking forward to our guitar lessons exchange!",
          time: '2025-04-18 13:20:00'
        }
      ]
    },
    {
      id: 2,
      other_user_id: 3,
      username: 'MikeTech',
      profile_pic: 'https://randomuser.me/api/portraits/men/32.jpg',
      last_message: 'I can help you with responsive design. Should we schedule our first session?',
      last_message_time: '2025-04-19 09:45:00',
      unread: 2,
      about_skill_swap: 'Web Development for Fitness Training',
      messages: [
        {
          sender_id: 1,
          message: "Hi Mike, I noticed you're offering web dev lessons. I'd like to learn more!",
          time: '2025-04-18 16:20:00'
        },
        {
          sender_id: 3,
          message:
            'Hey there! Absolutely. What aspects of web development are you most interested in?',
          time: '2025-04-18 17:30:00'
        },
        {
          sender_id: 1,
          message:
            "I'd really like to learn about responsive design and maybe some JavaScript basics.",
          time: '2025-04-19 08:15:00'
        },
        {
          sender_id: 3,
          message: 'I can help you with responsive design. Should we schedule our first session?',
          time: '2025-04-19 09:45:00'
        }
      ]
    },
    {
      id: 3,
      other_user_id: 6,
      username: 'PhotoMaster',
      profile_pic: 'https://randomuser.me/api/portraits/men/54.jpg',
      last_message: "Parfait! I'll prepare some beginner phrases for our first lesson.",
      last_message_time: '2025-04-19 14:30:00',
      unread: 0,
      about_skill_swap: 'French Language for Photography Tips',
      messages: [
        {
          sender_id: 6,
          message:
            "Bonjour! I saw your post about French lessons. I'd love to exchange for photography tips!",
          time: '2025-04-19 12:10:00'
        },
        {
          sender_id: 1,
          message:
            'Bonjour! Je suis très heureuse de faire votre connaissance. What kind of photography are you interested in?',
          time: '2025-04-19 12:25:00'
        },
        {
          sender_id: 6,
          message:
            "I'm most experienced with portrait and landscape photography. I'd love to improve my French for an upcoming trip to Paris!",
          time: '2025-04-19 13:00:00'
        },
        {
          sender_id: 1,
          message:
            "That's perfect! I can help with conversational French and travel phrases. When would you like to start?",
          time: '2025-04-19 13:45:00'
        },
        {
          sender_id: 6,
          message: "Parfait! I'll prepare some beginner phrases for our first lesson.",
          time: '2025-04-19 14:30:00'
        }
      ]
    }
  ];

  // Current user ID (would normally come from auth context)
  const userId = 1;

  // State
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [messageText, setMessageText] = useState('');
  const messageContainerRef = useRef(null);

  // Find active conversation
  const activeConversation = conversations.find((conv) => conv.id === activeConversationId);

  // Scroll to bottom of messages on conversation change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [activeConversationId]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  // Check if date has changed between messages
  const hasDateChanged = (currentMsgDate, prevMsgDate) => {
    if (!prevMsgDate) return true;

    const current = new Date(currentMsgDate);
    const prev = new Date(prevMsgDate);

    return current.toDateString() !== prev.toDateString();
  };

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setMessageText('');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex h-[600px]">
              {/* Conversations sidebar */}
              <div className="w-1/3 border-r border-gray-200">
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
                  {conversations.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No conversations yet. Start swapping skills to begin messaging!
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setActiveConversationId(conversation.id)}
                        className={`block w-full text-left border-b border-gray-100 hover:bg-gray-50 transition ${
                          activeConversationId === conversation.id ? 'bg-orange-50' : ''
                        }`}
                      >
                        <div className="p-4 flex items-start">
                          <div className="relative">
                            <img
                              src={conversation.profile_pic}
                              className="w-12 h-12 rounded-full object-cover"
                              alt={conversation.username}
                            />
                            {conversation.unread > 0 && (
                              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-baseline">
                              <h3 className="font-medium">{conversation.username}</h3>
                              <span className="text-xs text-gray-500">
                                {formatTime(conversation.last_message_time)}
                              </span>
                            </div>
                            <p
                              className={`text-sm text-gray-600 truncate ${
                                conversation.unread > 0 ? 'font-semibold text-gray-900' : ''
                              }`}
                            >
                              {conversation.last_message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              Re: {conversation.about_skill_swap}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Active conversation */}
              <div className="w-2/3 flex flex-col">
                {activeConversation ? (
                  <>
                    {/* Conversation header */}
                    <div className="p-4 border-b flex items-center justify-between bg-white">
                      <div className="flex items-center">
                        <img
                          src={activeConversation.profile_pic}
                          className="w-10 h-10 rounded-full object-cover"
                          alt={activeConversation.username}
                        />
                        <div className="ml-3">
                          <h3 className="font-medium">{activeConversation.username}</h3>
                          <p className="text-xs text-gray-500">
                            Re: {activeConversation.about_skill_swap}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          className="text-gray-500 hover:text-gray-700 p-2"
                          title="Video call"
                        >
                          <Video size={18} />
                        </button>
                        <button
                          className="text-gray-500 hover:text-gray-700 p-2"
                          title="View profile"
                        >
                          <User size={18} />
                        </button>
                        <button
                          className="text-gray-500 hover:text-gray-700 p-2"
                          title="More options"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Messages area */}
                    <div
                      ref={messageContainerRef}
                      className="flex-1 overflow-y-auto p-4 bg-gray-50"
                    >
                      {activeConversation.messages.map((message, index) => {
                        const isCurrentUser = message.sender_id === userId;
                        const prevMessage =
                          index > 0 ? activeConversation.messages[index - 1] : null;
                        const showTimeDivider =
                          !prevMessage || hasDateChanged(message.time, prevMessage.time);

                        return (
                          <React.Fragment key={index}>
                            {showTimeDivider && (
                              <div className="flex justify-center my-4">
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                  {formatDate(message.time)}
                                </span>
                              </div>
                            )}

                            <div
                              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
                            >
                              {!isCurrentUser && (
                                <img
                                  src={activeConversation.profile_pic}
                                  className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                                  alt={activeConversation.username}
                                />
                              )}

                              <div className="max-w-[70%]">
                                <div
                                  className={`px-4 py-3 rounded-lg ${
                                    isCurrentUser
                                      ? 'bg-orange-500 text-white'
                                      : 'bg-white border border-gray-200'
                                  }`}
                                >
                                  <p className="text-sm">{message.message}</p>
                                </div>
                                <p
                                  className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : ''}`}
                                >
                                  {formatTime(message.time)}
                                </p>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Message input */}
                    <div className="p-4 border-t bg-white">
                      <form onSubmit={handleSendMessage} className="flex items-end">
                        <div className="flex-1 mr-2">
                          <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            placeholder="Type your message..."
                          ></textarea>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-orange-500"
                            title="Attach file"
                          >
                            <Paperclip size={18} />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-orange-500"
                            title="Send photo"
                          >
                            <Image size={18} />
                          </button>
                          <button
                            type="submit"
                            className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                          >
                            <Send size={18} />
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  // No conversation selected
                  <div className="flex items-center justify-center h-full bg-gray-50">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <MessageSquare size={24} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No conversation selected
                      </h3>
                      <p className="text-gray-500">
                        Choose a conversation from the sidebar or start a new one from the skill
                        swap requests.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
