import api from '../api';
import { ConversationDetails, ConversationMessageResponse } from '../lib/messages';

export const createConversation = async ({ receiver_id }: { receiver_id: number }) => {
  const response = await api.post('/conversations', {
    receiver_id
  });
  return response.data;
};

export const getAllConversations = async (): Promise<ConversationDetails[]> => {
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
) => {
  const response = await api.post(`/conversations/${conversationId}/messages`, {
    participant: message.participant,
    content: message.content
  });
  return response.data;
};
