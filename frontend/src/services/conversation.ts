import api from '../api';
import { ConversationMessageResponse } from '../lib/messages';

export const createConversation = async ({ receiver_id }: { receiver_id: number }) => {
  const response = await api.post('/conversations', {
    receiver_id
  });
  return response.data;
};

export const getAllConversations = async () => {
  const response = await api.get('/conversations');
  return response.data;
};

export const getConversation = async (
  id: number | string
): Promise<ConversationMessageResponse> => {
  const response = await api.get('/conversations/' + id);
  return response.data;
};

export const sendMessage = async (
  conversationId: string,
  message: {
    participant: number;
    content: string;
  }
): Promise<void> => {
  await api.post(`/conversations/${conversationId}/messages`, {
    participant: message.participant,
    content: message.content
  });
};
