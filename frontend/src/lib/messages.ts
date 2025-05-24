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
  id: number;
  user: ConversationUser;
}

export interface Message {
  id: number | null;
  content: string | null;
  created_at: string;
  participant: {
    id: number;
    user: {
      id: number;
    };
  };
}

export interface ConversationDetails {
  id: number;
  created_at: Date;
  updated_at: Date;
  participants: ConversationParticipantResponse[];
  currentUser: ConversationParticipantResponse | undefined;
  otherParticipants: ConversationParticipantResponse[];
  lastMessage: Message;
}

export interface ConversationMessageResponse {
  id: number;
  participants: ConversationParticipantResponse[];
  messages: Message[];
}
