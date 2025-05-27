import React, { useState, useEffect, useRef } from 'react';
import { Video,  Send } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { getConversation, sendMessage } from '../../services/conversation';
import { useAuth } from '../../components/AuthContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { socket } from '../../lib/socket';
import type { Message } from '../../lib/messages';

const DashboardMessage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);

  const { data, isLoading } = useQuery({
    queryFn: () => getConversation(id || 0),
    queryKey: 'get_conversation',
    onSuccess: (response) => {
      setMessages(response.messages);
    }
  });

  const navigate = useNavigate();
  const otherParticipant = data?.participants.find((d) => d.user.id !== currentUser?.id);
  const sender = data?.participants.find((d) => d.user.id === currentUser?.id);

  const [messageText, setMessageText] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      if (id && sender?.id) {
        await sendMessage(id!, {
          participant: sender.id,
          content: messageText
        });
      }
    }
  });

  // Function to generate Jitsi Meet room name
  const generateJitsiRoomName = () => {
    // Create a unique room name using conversation ID and timestamp
    const timestamp = Date.now();
    const roomName = `${id}-${timestamp}`;
    return roomName;
  };

  const handleVideoCall = () => {
    const roomName = generateJitsiRoomName();
    const jitsiUrl = `https://meet.jit.si/${roomName}`;

    // Open Jitsi Meet in a new tab/window
    window.open(jitsiUrl, '_blank', 'noopener,noreferrer');

    // Optionally, you can also send a message to the chat with the meeting link
    if (id && sender?.id) {
      const meetingMessage = `📹 Video call started: ${jitsiUrl}`;
      // You might want to send this as a system message or special message type
      sendMessage(id, {
        participant: sender.id,
        content: meetingMessage
      });
    }
  };

  useEffect(() => {
    if (!id) return;

    socket.emit('join-room', id);

    socket.on('message', (_message: string) => {
      const message: Message = JSON.parse(_message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.emit('leave-room', id); // optional cleanup
      socket.off('message');
    };
  }, [id]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, messages.length]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const hasDateChanged = (currentMsgDate: string, prevMsgDate?: string) => {
    if (!prevMsgDate) return true;

    const current = new Date(currentMsgDate);
    const prev = new Date(prevMsgDate);

    return current.toDateString() !== prev.toDateString();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setMessageText('');
  };

  if (isLoading || !data || !currentUser) {
    return <LoadingSpinner />;
  }

  const userId = currentUser.id;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <button className="text-orange-500 hover:text-orange-600 mr-4 cursor-pointer" onClick={() => navigate(-1)}>
          ← Back to Messages
        </button>
        <Link to="/messages"></Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col h-[600px]">
          {/* Conversation header */}
          <div className="p-4 border-b flex items-center justify-between bg-white">
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="font-medium">{otherParticipant?.user.fullname}</h3>
              </div>
            </div>
            <div>
              <button
                className="text-gray-500 hover:text-gray-700 p-2"
                title="Start video call"
                onClick={handleVideoCall}
              >
                <Video size={18} />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => {
              const isCurrentUser = message.participant.user.id === userId;
              const prevMessage = index > 0 ? data.messages[index - 1] : null;
              const showTimeDivider =
                !prevMessage || hasDateChanged(message.created_at, prevMessage?.created_at);

              return (
                <React.Fragment key={index}>
                  {showTimeDivider && (
                    <div className="flex justify-center my-4">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                  )}

                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
                    <div className="max-w-[70%]">
                      <div
                        className={`px-4 py-3 rounded-lg ${
                          isCurrentUser
                            ? 'bg-orange-500 text-white'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p
                        className={`text-xs text-gray-500 mt-1 ${
                          isCurrentUser ? 'text-right' : ''
                        }`}
                      >
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

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
                  type="submit"
                  className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  onClick={() => mutateAsync()}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMessage;
