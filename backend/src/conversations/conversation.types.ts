export interface ConversationMentorProfile {
  id: number;
}

export interface ConversationUser {
  id: number;
  fullname: string;
  role: string;
  email: string;
  mentor_profile: ConversationMentorProfile | null;
}

export interface ConversationParticipantResponse {
  user: ConversationUser;
}

export interface ConversationLastMessage {
  id: number | null;
  participant: string | null;
  content: string | null;
  created_at: Date | null;
}

export interface Message {
  id: number | null;
  content: string | null;
  roomId: string;
  created_at: Date;
  participant: {
    id: number;
    user: {
      id: number;
    };
  };
}

export interface ConversationListItem {
  id: number;
  created_at: Date;
  updated_at: Date;
  participants: ConversationParticipantResponse[];
  currentUser: ConversationParticipantResponse | undefined;
  otherParticipants: ConversationParticipantResponse[];
  lastMessage: ConversationLastMessage;
}

export interface ConversationRawQuery {
  conversation_id: number;
  conversation_created_at: Date;
  conversation_updated_at: Date;
  participants_data: string | null;
  last_message_id: number | null;
  last_message_content: string | null;
  last_message_created_at: Date | null;
}
