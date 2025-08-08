import React, { useState, useEffect, useRef } from 'react';
import { Video, Send, ArrowLeft } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { getConversation, sendMessage } from '../../services/conversation';
import { useAuth } from '../../components/AuthContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { socket } from '../../lib/socket';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { Message } from '../../lib/messages';

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const TypingIndicator = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="flex justify-start mb-4"
      >
        <div className="max-w-[70%]">
          <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      backgroundColor: ['#9ca3af', '#6b7280', '#9ca3af']
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">typing...</span>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MessageBubble = ({
  message,
  isCurrentUser,
  showTime,
  index
}: {
  message: Message;
  isCurrentUser: boolean;
  showTime: boolean;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="max-w-[70%]"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`px-4 py-3 rounded-lg shadow-sm ${
            isCurrentUser ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200'
          }`}
          whileHover={{
            boxShadow: isCurrentUser
              ? '0 8px 25px -8px rgba(251, 146, 60, 0.4)'
              : '0 8px 25px -8px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.p
            className="text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {message.content}
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {(showTime || isHovered) && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : ''}`}
            >
              {formatTime(message.created_at)}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const DateDivider = ({ date }: { date: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex justify-center my-4"
  >
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full shadow-sm"
    >
      {date}
    </motion.span>
  </motion.div>
);

const Message = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const messageContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data, isLoading } = useQuery({
    queryFn: () => getConversation(id || 0),
    queryKey: 'get_conversation',
    onSuccess: (response) => {
      setMessages(response.messages);
    }
  });

  const otherParticipant = data?.participants.find((d) => d.user.id !== currentUser?.id);
  const sender = data?.participants.find((d) => d.user.id === currentUser?.id);

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      if (id && sender?.id) {
        setIsSending(true);
        const response = await sendMessage(id!, {
          participant: sender.id,
          content: messageText
        });
        setIsSending(false);
        return response;
      }
    }
  });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [messageText]);

  useEffect(() => {
    if (messageText.length > 0 && !isTyping) {
      setIsTyping(true);
      socket.emit('typing-start', { roomId: id, userId: currentUser?.id });
    } else if (messageText.length === 0 && isTyping) {
      setIsTyping(false);
      socket.emit('typing-stop', { roomId: id, userId: currentUser?.id });
    }
  }, [messageText, isTyping, id, currentUser?.id]);

  useEffect(() => {
    if (!id) return;

    socket.emit('join-room', id);

    socket.on('message', (_message: string) => {
      const message: Message = JSON.parse(_message);
      setMessages((prev) => {
        // Check if this is a real message that replaces a temporary one
        const tempMessage = prev.find(
          (msg) =>
            msg.id.toString().startsWith('temp-') &&
            msg.content === message.content &&
            msg.participant.user.id === message.participant.user.id
        );

        if (tempMessage) {
          // Replace the temporary message with the real one
          return prev.map((msg) => (msg.id === tempMessage.id ? message : msg));
        }

        // Check if the message already exists in the state to prevent duplicates
        if (prev.some((existingMsg) => existingMsg.id === message.id)) {
          return prev;
        }

        // Otherwise, add the new message
        return [...prev, message];
      });
    });

    socket.on('user-typing', (data) => {
      if (data.userId !== currentUser?.id) {
        setShowTypingIndicator(true);
      }
    });

    socket.on('user-stopped-typing', (data) => {
      if (data.userId !== currentUser?.id) {
        setShowTypingIndicator(false);
      }
    });

    return () => {
      socket.emit('leave-room', id);
      socket.off('message');
      socket.off('user-typing');
      socket.off('user-stopped-typing');
    };
  }, [id, currentUser?.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messageContainerRef.current) {
      const scrollContainer = messageContainerRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, showTypingIndicator]);

  const generateJitsiRoomName = () => {
    const timestamp = Date.now();
    const roomName = `${id}-${timestamp}`;
    return roomName;
  };

  const handleVideoCall = () => {
    const roomName = generateJitsiRoomName();
    const jitsiUrl = `https://meet.jit.si/${roomName}`;

    window.open(jitsiUrl, '_blank', 'noopener,noreferrer');

    if (id && sender?.id) {
      const meetingMessage = `📹 Video call started: ${jitsiUrl}`;
      sendMessage(id, {
        participant: sender.id,
        content: meetingMessage
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const hasDateChanged = (currentMsgDate: string, prevMsgDate?: string) => {
    if (!prevMsgDate) return true;
    const current = new Date(currentMsgDate);
    const prev = new Date(prevMsgDate);
    return current.toDateString() !== prev.toDateString();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || isSending || !sender || !currentUser) return;

    const tempMessage = messageText;
    setMessageText('');
    setIsTyping(false);

    // Create a temporary ID for the optimistic message
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      content: tempMessage,
      created_at: new Date().toISOString(),
      participant: {
        id: sender.id,
        user: {
          id: currentUser.id
        }
      }
    };

    // Add optimistic message to UI
    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      // Send the actual message to the server
      const response = await mutateAsync();

      // If we get a response with an ID, we can replace our optimistic message
      // Note: The socket will likely have already handled this, but this is a fallback
      if (response && response.id) {
        setMessages((prev) => {
          // If the real message is already in the array (from socket), remove the temp one
          if (prev.some((msg) => msg.id === response.id)) {
            return prev.filter((msg) => msg.id !== tempId);
          }
          // Otherwise replace the temp message with the real one
          return prev.map((msg) => (msg.id === tempId ? response : msg));
        });
      }
    } catch (error) {
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      setMessageText(tempMessage); // Restore message text
    }
  };

  if (isLoading || !data || !currentUser) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <LoadingSpinner />
      </motion.div>
    );
  }

  const userId = currentUser.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header with back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="text-orange-500 hover:text-orange-600 mr-4 cursor-pointer flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          <span>Back to Messages</span>
        </motion.button>
      </motion.div>

      {/* Chat container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="flex flex-col h-[600px]">
          {/* Conversation header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-4 border-b flex items-center justify-between bg-white"
          >
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold mr-3"
              >
                {otherParticipant?.user.fullname?.charAt(0).toUpperCase()}
              </motion.div>
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="font-medium text-gray-800"
                >
                  {otherParticipant?.user.fullname}
                </motion.h3>
                <AnimatePresence>
                  {showTypingIndicator && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-green-500"
                    >
                      typing...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-orange-600 p-2 rounded-lg hover:bg-orange-50 transition-colors"
              title="Start video call"
              onClick={handleVideoCall}
            >
              <Video size={18} />
            </motion.button>
          </motion.div>

          {/* Messages area */}
          <div
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-gray-50 scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => {
                const isCurrentUser = message.participant.user.id === userId;
                const prevMessage = index > 0 ? messages[index - 1] : null;
                const showTimeDivider =
                  !prevMessage || hasDateChanged(message.created_at, prevMessage?.created_at);

                return (
                  <React.Fragment key={message.id || index}>
                    {showTimeDivider && <DateDivider date={formatDate(message.created_at)} />}
                    <MessageBubble
                      message={message}
                      isCurrentUser={isCurrentUser}
                      showTime={false}
                      index={index}
                    />
                  </React.Fragment>
                );
              })}
            </AnimatePresence>

            <TypingIndicator isVisible={showTypingIndicator} />
          </div>

          {/* Message input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-4 border-t bg-white"
          >
            <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
              <div className="flex-1">
                <motion.textarea
                  ref={textareaRef}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
                  placeholder="Type your message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  whileFocus={{
                    boxShadow: '0 0 0 3px rgba(251, 146, 60, 0.1)',
                    borderColor: '#f97316'
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={!messageText.trim() || isSending}
                whileHover={{ scale: messageText.trim() ? 1.05 : 1 }}
                whileTap={{ scale: messageText.trim() ? 0.95 : 1 }}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  messageText.trim()
                    ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isSending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, rotate: 0 }}
                      animate={{ opacity: 1, rotate: 360 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Send size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Message;
