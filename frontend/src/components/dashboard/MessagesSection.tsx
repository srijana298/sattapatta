import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, CheckCheck, Clock } from 'lucide-react';
import { messages } from '../../data/messagesData';

// Group messages by sender for conversation threads
const getConversations = () => {
  const conversationsMap = messages.reduce((acc, message) => {
    const key = message.senderId;
    if (!acc[key]) {
      acc[key] = {
        id: message.senderId,
        name: message.senderName,
        avatar: message.senderAvatar,
        lastMessage: message,
        messages: [message],
        unreadCount: message.read ? 0 : 1
      };
    } else {
      acc[key].messages.push(message);
      acc[key].lastMessage = message.timestamp > acc[key].lastMessage.timestamp ? message : acc[key].lastMessage;
      if (!message.read) {
        acc[key].unreadCount += 1;
      }
    }
    return acc;
  }, {} as Record<string, any>);
  
  return Object.values(conversationsMap).sort((a, b) => 
    new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
  );
};

const MessagesSection: React.FC = () => {
  const conversations = getConversations();
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter conversations based on search query
  const filteredConversations = searchQuery 
    ? conversations.filter(conversation => 
        conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;
  
  // Format time for display in conversation list
  const formatConversationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If same day, return time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }
    
    // If within the last week, return day name
    const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return date.toLocaleDateString(undefined, { weekday: 'short' });
    }
    
    // Otherwise, return date
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };
  
  // Format message timestamp
  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Here would be API call to send message
    // For demo purposes, just clear the input
    setNewMessage('');
  };
  
  // Get messages grouped by date for the active conversation
  const getMessagesByDate = () => {
    const messagesByDate: Record<string, any[]> = {};
    
    activeConversation.messages.forEach(message => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!messagesByDate[date]) {
        messagesByDate[date] = [];
      }
      messagesByDate[date].push(message);
    });
    
    return Object.entries(messagesByDate).map(([date, messages]) => ({
      date,
      messages: messages.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    }));
  };

  return (
    <div className="h-full max-h-[calc(100vh-9rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      </div>
      
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
        {/* Conversations sidebar */}
        <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 
                         focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredConversations.map((conversation) => (
                  <li key={conversation.id}>
                    <button
                      className={`w-full text-left px-4 py-3 flex items-start space-x-3 hover:bg-gray-50 
                               transition-colors duration-150 ease-in-out ${
                                 activeConversation.id === conversation.id ? 'bg-orange-50' : ''
                               }`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs 
                                         rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <p className={`text-sm font-medium ${
                            conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {conversation.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatConversationTime(conversation.lastMessage.timestamp)}
                          </p>
                        </div>
                        <p className={`text-sm truncate ${
                          conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                        }`}>
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-500 text-sm">No conversations found</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Conversation detail */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Conversation header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
              <div className="flex items-center space-x-3">
                <img
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-sm font-medium text-gray-900">{activeConversation.name}</h2>
                  <p className="text-xs text-gray-500">Last active: Today, 2:30 PM</p>
                </div>
              </div>
              <div>
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {getMessagesByDate().map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6">
                  <div className="flex justify-center mb-4">
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                      {new Date(group.date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {group.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isSentByMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex max-w-xs md:max-w-md lg:max-w-lg">
                          {!message.isSentByMe && (
                            <img
                              src={message.senderAvatar}
                              alt={message.senderName}
                              className="h-8 w-8 rounded-full object-cover mr-2 mt-1"
                            />
                          )}
                          <div>
                            <div 
                              className={`px-4 py-2 rounded-lg ${
                                message.isSentByMe 
                                  ? 'bg-orange-500 text-white rounded-br-none' 
                                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <div 
                              className={`mt-1 flex items-center text-xs text-gray-500 ${
                                message.isSentByMe ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              {formatMessageTime(message.timestamp)}
                              {message.isSentByMe && (
                                <span className="ml-1">
                                  {message.read ? (
                                    <CheckCheck className="h-3.5 w-3.5 text-blue-500" />
                                  ) : (
                                    <Clock className="h-3.5 w-3.5" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm 
                           placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 
                           focus:border-transparent transition duration-150 ease-in-out"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  className={`p-2 rounded-full ${
                    newMessage.trim() 
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : 'bg-gray-100 text-gray-400'
                  } transition-colors duration-150 ease-in-out`}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;